import React, { Component } from "react";
import "./style.css";


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: ""
        };

        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleSubmit = this.handleChangeLastName.bind(this);
    }

    handleChangeFirstName(event) {
        this.setState({ firstName: event.target.value });
    }

    handleChangeLastName(event) {
        this.setState({ lastName: event.target.value });
    }

    handleSubmit(event) {
        alert('Signup Complete. ' + this.state.firstName + ' ' + this.state.lastName);
        event.preventDefault();
    }

    // clearInputs = () => {
    //     var placeholders = document.getElementsByClassName('form-control');
    //     placeholders[0].addEventListener("focus", function(){
    //         this.placeholders.value = "";
    //     })
    // }


    render() {
        return (
            <div id="container" className="container">
                <div className="modal-content">
                <div className="formLogo">
                    <img id="formLogoID" src="https://ps.w.org/simple-owl-carousel/assets/icon-256x256.png?rev=1839276" />
                </div>
                    <form id="signupForm" className="form" onSubmit={this.handleSubmit} method="POST">
                        <div className="header">
                            <h2>Step 2 of 2</h2>
                        </div>
                        <div className="form-group">
                            <label>
                                First name:
                            </label>
                            <input className="form-control" type="text" value={this.state.firstName} onChange={this.handleChangeFirstName} />
                        </div>
                        <div className="form-group">
                            <label>
                                Last name:
                            </label>
                            <input className="form-control" type="text" value={this.state.lastName} onChange={this.handleChangeLastName} />
                        </div>
                        <button id="signupButton" className="btn btn-secondary" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;