const {ipcMain} = require('electron');
import getHuya from './getHuyaStreamUrl';

export default ()=> {
  ipcMain.on('asynchronous-message', (event, huyaRoomId) => {
    console.log(huyaRoomId) // prints "ping"
    getHuya(huyaRoomId).then((res=>{
      console.log('streamUrl:', res)
    }))
  })
}



