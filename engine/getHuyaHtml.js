const axios = require("axios");
const fs = require("fs-extra");

function getHuyaHtml(roomId) {
    return new Promise( (resolve,reject)=>{
        axios.get(`https://www.huya.com/${roomId}`).then(data => {
            if (data.data) {
                console.log("huyaHTML获取成功");
                const huyaHTML = data.data;
                if (typeof huyaHTML === "string") {
                    const regRes = /"stream": ({.+?})\s*}/.exec(huyaHTML);
                    //  console.log('{'+regRes[0]);
                    const infoObj = JSON.parse("{" + regRes[0])["stream"];
                    //  console.log(infoObj);
                    if (infoObj["status"] == 200) {
                        logger.info("当前连接在线");
                        const room_info = infoObj["data"][0]["gameLiveInfo"];
                        const streamerName = room_info["nick"];
                        const len = infoObj["data"][0]["gameStreamInfoList"].length;
                        let cur = null;
                        for (let i = 0; i < len; i++) {
                            const stream_info = infoObj["data"][0]["gameStreamInfoList"][i];
                            // console.log(stream_info);
                            const sHlsUrl = stream_info["sHlsUrl"];
                            const sStreamName = stream_info["sStreamName"];
                            const sHlsUrlSuffix = stream_info["sHlsUrlSuffix"];
                            const sHlsAntiCode = stream_info["sHlsAntiCode"];
                            const resStream = `${sHlsUrl}/${sStreamName}.${sHlsUrlSuffix}?${sHlsAntiCode}`;
                            if (i == 0) {
                                cur = resStream;
                            }
                            // console.log(resStream);
                        }
                        resolve(cur);
                        // console.log(cur);
                    }else {
                        reject("不在线")
                    }
                }
            }
        });
    })
}

module.exports = getHuyaHtml