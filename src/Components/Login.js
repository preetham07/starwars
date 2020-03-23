import React, { Component } from 'react';
import PropTypes from 'prop-types';
import helpers from "../helpers";
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './LoadingSpinner';
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: "none"
        };
    this.getUsersData = this.getUsersData.bind(this);
        this.checkUserInfo = this.checkUserInfo.bind(this);
        this.updateInputInfo = this.updateInputInfo.bind(this);
    }
    updateInputInfo(event){
      console.log(event.target.value);
      console.log(event.target.id);
      this.setState({
        [event.target.id]:event.target.value
      })
    }
    checkUserInfo(){
      var exec = true;
      if(this.state.email == ""){
        exec = false;
        toast.error("please enter user name !", {
       position: toast.POSITION.BOTTOM_CENTER
     });
      }
      if(this.state.password == ""){
        exec = false;
        toast.error("please enter password !", {
       position: toast.POSITION.BOTTOM_CENTER
     });
      }

      if(exec){
        this.getUsersData();
      }
    }
    componentDidMount() {
        //this.getUsersData();
    }

    getUsersData() {
      this.setState({
          loading: "show"
      })
        axios({
            method: "GET",
            url: "https://swapi.co/api/people/?search="+this.state.email,
            headers: { "Content-Type": "application/json; charset=utf-8" },
            responseType: "json"
        }).then(res => {
          console.log("Response ",res.data.results);
          this.setState({
              loading: "none"
          })
          if(res.data.results.length > 0){
          var userExists = res.data.results.filter(keyword => keyword.name === this.state.email && keyword.birth_year === this.state.password);
          console.log("userExists",userExists);
          if(userExists.length > 0){
            toast.success("LOGIN SUCCESSFULL", {
           position: toast.POSITION.BOTTOM_CENTER
         });
         sessionStorage.setItem("userName",userExists[0]["name"]);
         this.props.history.push('/WarList');
       }else{
         toast.error("INVALID USER INFO", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      this.setState({
        email : "",
        password:""
      });
       }
     }else{
       toast.error("INVALID USER INFO", {
      position: toast.POSITION.BOTTOM_CENTER
    });
    this.setState({
      email : "",
      password:""
    });
     }
          this.setState({
            usersInfo : res.data.results
          })

        }).catch(function (error) {
            console.log(error);
        });
    }


render() {
return (
<div>
<LoadingSpinner showSpinner={this.state.loading} />
<ToastContainer />
<div className="container pt-3">
<div className="row justify-content-sm-center">
  <div className="col-sm-6 col-md-4">
    <div className="card border-info text-center " style={{background:"#000000"}}>
      <div className="card-body">
        <img src="https://static-mh.content.disney.io/starwars/assets/navigation/sw_logo_stacked-336c62367939.png"/>
          <br/><br/>
            <input type="text" id  = "email" className="form-control mb-2" value ={this.state.email} placeholder="Email" required autofocus onChange={this.updateInputInfo} />
              <input type="password" id = "password" className="form-control mb-2" value ={this.state.password} placeholder="Password" required onChange={this.updateInputInfo}/>
                <button className="btn btn-lg btn-primary btn-block mb-1" type="submit"  onClick = {() => this.checkUserInfo()}>Sign in</button>
                  <label className="checkbox float-left">
                  </label>
            </div>
        </div>
      </div>
    </div>
  </div>
  <hr/>
</div >
        )
    }
}


export default withRouter(Login);
