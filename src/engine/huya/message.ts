const {ipcMain} = require('electron');
import getHuya from './getHuyaStreamUrl';
const { spawn } = require('child_process');
const log4js = require('log4js');
const rootPath = process.cwd();

log4js.configure({
  appenders: {
    cheese:{
      type: 'file',
      filename: rootPath+ '/logs/artanis.log',
      maxLogSize : 20971520,
      backups : 10,
      encoding : 'utf-8',
    },
  },
  categories: { default: { appenders: ['cheese'], level: 'info' } }
})

const logger = log4js.getLogger('message');

export default ()=> {
  // 虎牙消息监听
  const pool:any = [];
  ipcMain.on('asynchuya-message', (event, huyaRoomId) => {
    console.log('huyaRoomId: ',huyaRoomId) // prints "ping"
    if(huyaRoomId !== 'stop') {
      getHuya(huyaRoomId).then((streamUrl=>{
        // const cmd = `ffmpeg -i "${streamUrl}" -f mp4 res.MP4`;
        const cmd = `ffmpeg`;
        const huyaApp = spawn(cmd,['-i',streamUrl,'-f','mp4',huyaRoomId+'res.MP4']);
        pool.push(huyaApp);
        huyaApp.stdout.on('data', (data:any) => {
          // console.log(`stdout: ${data}`);
          logger.info(data.toString("utf8"));
        });
        huyaApp.stderr.on('data', (data:any) => {
          // console.error(`stderr: ${data}`);
          logger.info(data.toString("utf8"));
        });
        huyaApp.on('close', (code:any) => {
          // console.log(`子进程退出，退出码 ${code}`);
          logger.info(`子进程退出，退出码 ${code}`);

        });
  
      }))
    }else {
      if(pool.length) {
        pool[0].kill()
        logger.error(`手动关闭了下载`);
      }
    }

  })

  // ipcMain.on('asynchuya-stop-message', (event,message)=> {
  //   console.log(message);
  //   const cmd = 'kill SIGTERM'
  //   // if(message==='stop') {
  //   //   exec(cmd, (err:any, stdout:any, stderr:any)=>{
  //   //     if(err) {
  //   //       console.log(err);
  //   //     }
  //   //     console.log('stdout', stdout)
  //   //     console.log('stderr', stderr);
  //   //   })
  //   // }
  // })
}



