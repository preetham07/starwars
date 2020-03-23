import React, { Component } from 'react';
import PropTypes from 'prop-types';
import helpers from "../helpers";
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import PlanetDetails from "./PlanetDetails";
import axios from "axios";
const restURL = helpers.restURL;
var url = window.location.origin;
class WarList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm:"",
            warInfo:[],
            modal:false,
            currentItem:[],
            loading:"none"
        };
        this.getPlanetsData = this.getPlanetsData.bind(this);
        this.updateInputInfo = this.updateInputInfo.bind(this);
        this.sortByProperty = this.sortByProperty.bind(this);
        this.toggle = this.toggle.bind(this);
        this.showPopup = this.showPopup.bind(this);
    }
    showPopup(item){
      this.setState({
        modal:true,
        currentItem:item
      })
    }
    toggle(){
      this.setState({
        modal:false
      })
    }
    updateInputInfo(event){
      console.log(event.target.value);
      console.log(event.target.id);
      this.setState({
        [event.target.id]:event.target.value
      },function(){
        this.getPlanetsData();
      })
    }

  sortByProperty(property){

    console.log("property",property);
   return function(a,b){
      if(Number(a[property]) > Number(b[property]))
         return 1;
      else if(a[property] < b[property])
         return -1;

      return 0;
   }
}

    componentDidMount() {
      if(sessionStorage.getItem("userName") == ""){
        toast.info("Please login before continuing", {
       position: toast.POSITION.BOTTOM_CENTER
     });
        this.props.history.push('/Login');
      }
        //this.getPlanetsData();
    }

    getPlanetsData() {
      this.setState({
        loading:"show"
      })
        axios({
            method: "GET",

            url: "https://swapi.co/api/planets/?search="+this.state.searchTerm,
            headers: { "Content-Type": "application/json; charset=utf-8" },
            responseType: "json"
        }).then(res => {
          console.log("Response ",res.data.results);
          this.setState({
            loading:"none"
          })
          var itemsFinal = res.data.results;
          for(var i=0;i<itemsFinal.length;i++){
            if(itemsFinal[i]["population"] == "unknown"){
              itemsFinal[i]["population"] = 0;
            }else{
              itemsFinal[i]["population"] = Number(itemsFinal[i]["population"]);
            }
          }
          var itemsFinal = res.data.results.sort(this.sortByProperty("population"));
          for(var i=0;i<itemsFinal.length;i++){
            itemsFinal[i]["fontsize"] = (16+i+1) + "px";
          }
          itemsFinal = itemsFinal.reverse();
          console.log(itemsFinal);
          this.setState({
            warInfo : itemsFinal
          })

        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
            <LoadingSpinner showSpinner={this.state.loading} />
            <Navbar />
            <ToastContainer />
            <br/>
            <div class="container">
            <div className="row justify-content-around">
            <div className="col-md-6 col-md-offset-1 ">
            <input type="text" id  = "searchTerm" className="form-control mb-2 text-center" value ={this.state.searchValue} placeholder="Search Planets" onChange={this.updateInputInfo} />
            </div>
            </div>
            </div>
            <div class="container">
            <div className="row justify-content-around">
            <div className="col-md-10 col-md-offset-1 ">
            <table className="table">
            <tr><th>Planet</th><th>Population</th><th>Action</th></tr>
            {this.state.warInfo.map((item,index) => (
              <tr><td style={{"font-size":item.fontsize}}>{item.name}</td><td>{item.population}</td><td><button type="button" class="btn btn-primary" onClick = {() => this.showPopup(item)}>View Details</button></td></tr>
            ))}
            </table>
            </div>
            </div>
            </div>

            <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} >
        <ModalHeader toggle={this.toggle}>{this.state.currentItem.name} Info</ModalHeader>
        <ModalBody>
        <div class="container">
        <div className="row justify-content-around">
          {(Object.entries(this.state.currentItem).length > 0 ) ?
            <div className="col-md-12">
            <table className="table">
            <tr><th>Details</th><th>Value</th></tr>
          {Object.entries(this.state.currentItem).map(([key, value]) => (
            <tr><td >{key}</td><td>{value}</td></tr>
          ))}
          </table>
          </div>:<div>no data</div>
        }
        </div>
        </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
            </div >
        )
    }
}

export default withRouter(WarList);
