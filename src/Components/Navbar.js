import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.logout = this.logout.bind(this);
    }
    logout(event){
      event.preventDefault();
      sessionStorage.setItem("userName","");
      toast.info("User logged out successfully", {
     position: toast.POSITION.BOTTOM_CENTER
   });
      this.props.history.push('/Login');
    }
    render() {
        return (
          <nav className="navbar navbar-expand-sm bg-dark justify-content-end">
            <ul className="navbar-nav">
            <li className="nav-item">

              <a className="nav-link" href="#">Welcome {sessionStorage.getItem("userName")}</a>
            </li>
              <li className="nav-item">

                <a className="nav-link" href="#" onClick={this.logout}>Logout</a>
              </li>
            </ul>
          </nav>
        )
    }
}



export default withRouter(Navbar);
