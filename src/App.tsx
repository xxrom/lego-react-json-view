import React from "react";
import { hot } from "react-hot-loader/root";

// import { json } from "./testData/bigTestJson";
import { json } from "./testData/smallTestJson";
import { Viewer } from "./components";

const App = () => <Viewer json={json} />;

export default hot(App);
