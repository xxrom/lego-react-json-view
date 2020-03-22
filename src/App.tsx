import React from "react";
import { hot } from "react-hot-loader/root";

import { json } from "./testData/bigTestJson";
// import { json } from "./testData/smallTestJson";
import { LegoViewer } from "./components";

export const App = () => {
  const propsSettings = {
    // theme: "auto",
    // fontSize: "0.81",
    // searchLimit: "111",
    // isExpanded: false
  };

  return <LegoViewer json={json} settings={propsSettings} />;
};

export default hot(App);
