const {ipcMain} = require('electron');
import getHuya from './getHuyaStreamUrl';
const exec = require('child_process').exec;
const rootPath = process.cwd();
export default ()=> {
  // 虎牙消息监听
  ipcMain.on('asynchuya-message', (event, huyaRoomId) => {
    console.log('huyaRoomId: ',huyaRoomId) // prints "ping"
    
    // getHuya(huyaRoomId).then((streamUrl=>{
   
    //   const cmd = `ffmpeg -i "${streamUrl}" -f mp4 res.MP4`;

    //   // const cmd = `ffmpeg -i  ${streamUrl}  -c copy -f mp4 -bsf:a aac_adtstoasc -movflags +faststart output.mp4.part`;
    //   exec(cmd,(err:any, stdout:any, stderr:any)=>{
    //     if(err) {
    //       console.log(err);
    //     }
    //     console.log('stderr',stderr);
    //   })
    
     
    // }))
  })
}



