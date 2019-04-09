import React from "react";
import "./style.css";
import "../../Auth/Auth";


function Title(props) {
  console.log("TITLE PROPS = ", props.children);
  return <h1 className="title owlGreenText">{props.children}</h1>;
}


export default Title;
