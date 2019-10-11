const {ipcMain} = require('electron');
// const getHuya = require('./getHuyaHtml');
export default ()=> {
  ipcMain.on('asynchronous-message', (event, huyaRoomId) => {
    console.log(huyaRoomId) // prints "ping"
    // getHuya(huyaRoomId)
  })
}



