import React from "react";
import Item from '../../component/huyaItem';
import './index.less';

function App() {
  return <div className="content">
      <Item data={{platformName:"虎牙",platformKey:"huya"}}/>
  </div>;
}
export default App;
