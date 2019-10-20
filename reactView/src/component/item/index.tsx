import React , {useState} from "react";
// import { ipcRenderer } from "electron";
const ipcRenderer = window.electron.ipcRenderer;

import { Button, Input } from "rsuite";
import "./index.less";
interface Props {
  data:{
    // onClick: any;
    platformName: string;
    platformKey: string
  }
}

function Item(props: Props) {
  const [huyaUrl,setHuyaUrl] = useState("")
  function handleClick() {
    ipcRenderer.send(`async${props.data.platformKey}-message`, huyaUrl);
    console.log('cc')
  }
  function handleChange(value: string) {
    console.log(value);
    setHuyaUrl(value);
  }
  function stopDown() {
    ipcRenderer.send(`async${props.data.platformKey}-message`, 'stop');
    // console.log('cc')
  }
  return (
    <div className="item">
      <div style={{marginLeft:30,marginRight:30, fontSize:18, fontWeight:400, color:"#1cbbb4"}}>请输入{props.data.platformName}房间号：</div>
      <Input onChange={handleChange} style={{ width: 300,marginRight:30 }} size="md" />
      <Button style={{marginRight:20}} appearance="primary" onClick={handleClick}>开始下载保存视频</Button>
      <Button style={{color:"red"}} appearance="default" onClick={stopDown}>停止下载</Button>
    </div>
  );
}

export default Item;
