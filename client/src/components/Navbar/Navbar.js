import React from "react";
import * as ReactBootStrap from "react-bootstrap";

function MyNavbar() {
    return (
        <div className="App">
            <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <ReactBootStrap.Navbar.Brand href="/">Chicken Tinder</ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                    <ReactBootStrap.Nav className="mr-auto">
                        <ReactBootStrap.Nav.Link href="/">Home</ReactBootStrap.Nav.Link>
                        <ReactBootStrap.Nav.Link href="/signup">Sign Up</ReactBootStrap.Nav.Link>
                        <ReactBootStrap.Nav.Link href="/user">Your Page</ReactBootStrap.Nav.Link>
                        <ReactBootStrap.NavDropdown title="About Us" id="collasible-nav-dropdown">
                            <ReactBootStrap.NavDropdown.Item href="https://linkedin.com/in/stephen-settle" target="_blank">Stephen Settle</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Divider />
                            <ReactBootStrap.NavDropdown.Item href="https://reactportfolio14.herokuapp.com/" target="_blank">Bethany Webb</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Divider />
                            <ReactBootStrap.NavDropdown.Item href="https://www.linkedin.com/in/brandon-chontos-18a1501b0/" target="_blank">Brandon Chontos</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Divider />
                            <ReactBootStrap.NavDropdown.Item href="https://joshua-brooks-portfolio.herokuapp.com/" target="_blank">Joshua Brooks</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Divider />
                            <ReactBootStrap.NavDropdown.Item href="https://github.com/BethanyWebb/Final" target="_blank">Our App's Repository</ReactBootStrap.NavDropdown.Item>
                        </ReactBootStrap.NavDropdown>
                    </ReactBootStrap.Nav>
                    {/* <ReactBootStrap.Nav>
                        <ReactBootStrap.Nav.Link href="#deets">More deets</ReactBootStrap.Nav.Link>
                        <ReactBootStrap.Nav.Link eventKey={2} href="#memes">
                            Dank memes
      </ReactBootStrap.Nav.Link>
                    </ReactBootStrap.Nav> */}
                </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>
        </div>
    );
}


export default MyNavbar;