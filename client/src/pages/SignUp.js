import React, { Component } from 'react';
import SignUpForm from "../components/SignUpForm/SignUpForm";
import Footer from "../components/Footer/Footer";
import "../styles/setup.css";
import API from "../utils/API";
import MyNavbar from "../components/Navbar/Navbar";

// Uses state to make the forms work right
class SignUp extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        userData: {}
    };

    // This deals with each change from a value on the form
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // This looks for an event "submit button click". 
    // It checks if the inputs have value and does nothing if one is empty.
    // If there are values it puts them into an object and that is passed into an API call.
    // If that is successful, a new user is put in the database 
    // then the page redirects for them to sign in
    onSubmit = event => {
        event.preventDefault();
        if (this.state.name === "" || this.state.email === "" || this.state.password === "") {
            return;
        }
        this.userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        // console.log(this.userData);
        // return this.userData;
        API.newUser(this.userData)
            .then(function () {
                window.location.replace("/")
            })
            .catch((err) => console.log(err))

    };

    // State and functions are passed to/from the sign up form component
    render() {
        return (
            <div>
                <MyNavbar />
                <div className="home">
                    <h1>Welcome to Chicken Tinder</h1>
                    <h2>Please Create Your Profile</h2>
                    <SignUpForm
                        name={this.state.name}
                        email={this.state.email}
                        password={this.state.password}
                        handleInputChange={this.handleInputChange}
                        onSubmit={this.onSubmit}
                    />
                    <a href="/"><button>Home</button></a>
                </div>
                <Footer />
            </div>
        )

    }
}

export default SignUp;
