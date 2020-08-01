import React, { Component } from 'react';
import Footer from "../components/Footer/Footer";
import MyNavbar from "../components/Navbar/Navbar";
import LogInForm from "../components/LogInForm/LogInForm";
import "../styles/home.css";
import API from "../utils/API";

// Uses state to make the forms work right
class Home extends Component {
    state = {
        email: "",
        password: "",
        userInfo: {}
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
    // If that is successful, the returned info "json web token" is put into local storage
    onSubmit = event => {
        event.preventDefault();
        if (this.state.email === "" || this.state.password === "") {
            return;
        }
        this.userInfo = {
            email: this.state.email,
            password: this.state.password
        }
        // console.log(this.userInfo);
        // return this.userInfo;
        API.logIn(this.userInfo)
            .then(function (jwt) {
                // console.log(response.data.token)
                localStorage.setItem('jwt', jwt.data.token)
                window.location.replace("/user")
            })
            .catch((err) => console.log(err))

    };

    // The page renders everything below. 
    // It passes the state of email and password and the functions to/from the Login Form Component
    render() {
        return (
            <div>
                <MyNavbar />
                <div className="home">
                    <h1>Welcome to Chicken Tinder</h1>
                    <h3>Please log in or <a href="/signup">sign up</a></h3>
                    <LogInForm
                        email={this.state.email}
                        password={this.state.password}
                        handleInputChange={this.handleInputChange}
                        onSubmit={this.onSubmit}
                    />
                </div>
                <Footer />
            </div>
        )
    }

}

export default Home;
