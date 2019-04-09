import React from "react";
import "./style.css";
import "../../Auth/Auth";

function Wrapper(props) {
  console.log("Wrapper props.children = ", props.children);
  return <div className="wrapper">{props.children}</div>;
}

export default Wrapper;
