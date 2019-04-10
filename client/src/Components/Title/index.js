import React from "react";
import "./style.css";
// import Vault from "../Vault/Vault";



function Title(props) {
  // const { Vault } = this.props.Vault;
  // console.log("Title Props = ", Vault)
  return <h1 className="title owlGreenText">{props.children}</h1>
}

export default Title;