import React from "react";
import Item from '../../component/item';
import './index.less';

function App() {
  return <div className="content">
      <Item data={{platformName:"虎牙",platformKey:"huya"}}/>
  </div>;
}
export default App;
