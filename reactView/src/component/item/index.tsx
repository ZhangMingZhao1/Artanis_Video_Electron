import React from "react";
import { ipcRenderer } from "electron";
import { Button, Input } from "rsuite";
import "./index.less";
interface Props {
  onClick: any;
  platformName: string;
}

function Item(props: Props) {
  function handleClick() {
    ipcRenderer.send(`asynchronous-message`, huyaUrl);
  }
  return (
    <div className="item">
      <div>请输入虎牙房间号：</div>{" "}
      <Input onChange={() => {}} style={{ width: 300 }} size="md" />
      <Button onClick={}>开始下载保存视频</Button>
    </div>
  );
}

export default Item;
