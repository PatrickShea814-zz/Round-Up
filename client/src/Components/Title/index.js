import React from "react";
import "./style.css";
// import Vault from "../Vault/Vault";



function Title(props) {
  // const { Vault } = this.props.Vault;
  // console.log("Title Props = ", Vault)
  return <div className="container"><h1 className="title owlGrayText">{props.currentUser}'s Vault</h1></div>
}

export default Title;