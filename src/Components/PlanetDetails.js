import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
class PlanetDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
        <div class="container">
        <div className="row justify-content-around">
          {(Object.entries(this.props.currentItem).length > 0 ) ?
            <div className="col-md-12">
            <table className="table">
            <tr><th>Details</th><th>Value</th></tr>
          {Object.entries(this.props.currentItem).map(([key, value]) => (
            <tr><td >{key}</td><td>{value}</td></tr>
          ))}
          </table>
          </div>:<div>no data</div>
        }
        </div>
        </div>
        )
    }
}



export default withRouter(PlanetDetails);
