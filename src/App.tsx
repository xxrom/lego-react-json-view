import React from "react";
import { hot } from "react-hot-loader/root";

// import { json } from "./testData/bigTestJson";
import { json } from "./testData/smallTestJson";
import { LegoViewer } from "./components";

const App = () => (
  <LegoViewer
    json={json}
    settings={{
      theme: "auto",
      fontSize: "0.81",
      searchLimit: "111",
      isExpanded: false
    }}
  />
);

export default hot(App);
