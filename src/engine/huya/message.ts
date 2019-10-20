const {ipcMain} = require('electron');
import getHuya from './getHuyaStreamUrl';
const { spawn } = require('child_process');
// const rootPath = process.cwd();
export default ()=> {
  // 虎牙消息监听
  const pool:any = [];
  ipcMain.on('asynchuya-message', (event, huyaRoomId) => {
    console.log('huyaRoomId: ',huyaRoomId) // prints "ping"
    if(huyaRoomId !== 'stop') {
      getHuya(huyaRoomId).then((streamUrl=>{
        // const cmd = `ffmpeg -i "${streamUrl}" -f mp4 res.MP4`;
        const cmd = `ffmpeg`;
        const huyaApp = spawn(cmd,['-i',streamUrl,'-f','mp4','res.MP4']);
        pool.push(huyaApp);
        huyaApp.stdout.on('data', (data:any) => {
          console.log(`stdout: ${data}`);
        });
        huyaApp.stderr.on('data', (data:any) => {
          console.error(`stderr: ${data}`);
        });
        huyaApp.on('close', (code:any) => {
          console.log(`子进程退出，退出码 ${code}`);
        });
  
      }))
    }else {
      if(pool.length) {
        pool[0].kill()
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



