import React, { Component } from "react";
import APIHandler from "./APIHandler";

export default class Register extends Component {
    state = {
        name: "",
        email: "",
        password: ""
    }

    handleFieldChange = (e) => {
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    }

    handleRegister = e => {
        e.preventDefault();

        let registerData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        APIHandler.addData("users", registerData)
            .then(() => {
                this.props.history.push("/loginForm");
            })
    }

    render() {
        return (
            <form onSubmit={this.handleRegister}>
                <h1>Please Register Your Info!</h1>

                {/* Field to register username */}
                <label htmlFor="registerUsername">Username:</label>
                <input
                    id="name"
                    name="registerUsername"
                    type="text"
                    onChange={this.handleFieldChange}
                />

                {/* Field to register email */}
                <label htmlFor="registerEmail">Email:</label>
                <input
                    id="email"
                    name="registerEmail"
                    type="email"
                    onChange={this.handleFieldChange}
                />

                {/* Field to register password */}
                <label htmlFor="registerPassword">Password:</label>
                <input
                    id="password"
                    name="registerPassword"
                    type="password"
                    onChange={this.handleFieldChange}
                />

                <input type="submit" />

            </form>
        )
    }
}