import React from 'react';
import axios from 'axios';
const basicUrl = getBaseUrl();

export function geturl(){
//return "https://test.cloudigy.io/nodesvc.php?service=";
  //return "https://test.cloudigy.io/nodesvc.php?service=";
  //return "http://52.55.213.135/nodesvc.php?service="
  //return "http://54.144.40.63/nodesvc.php?service="
  return "https://demo.cloudigy.io/nodesvc.php?service="
  //return "http://dev.cloudigy.io/nodesvc.php?service="
  //return "http://3.16.144.217/nodesvc.php?service="
  //return "http://18.224.43.178/nodesvc.php?service="
   //return "https://sandbox.cloudigy.io/nodesvc.php?service="
  //return "http://localhost:3001/api/"
 //return "http://localhost/nodesvc.php?service="
//return window.location.origin+"/nodesvc.php?service="
}

export function getBaseUrl(){
    return "cloudigyNewUI"
  //return "CloudCUE"
  //return "WiproEDOC"
}

export function getS3BucketUrl(){
  return "https://s3.us-east-2.amazonaws.com/cgy.documents"
}

export function getrpurl(){
  return window.location.origin+"/nodesvcrp.php?service="
}
export function geturlForDataServices(){
  return window.location.origin+"/cloudigydataservices/service.php"
  //return "http://18.220.69.20/cloudigydataservices/service.php"
}

export function geturlForDataController(){
    return window.location.origin+"/cloudigydataservices/controller.php"
    //return "http://18.220.69.20/cloudigydataservices/controller.php"
}

export function geturlForDataUpload(){
	return window.location.origin+"/cloudigydataservices/uploadFile.php"
 //return"http://18.220.69.20/cloudigydataservices/uploadFile.php"
}

export function geturlForRPUpload(){
  return window.location.origin+"/cloudigydataservices/reportFileUpload.php"
}

export function geturlForGOServices(){
 return window.location.origin+"/gosvc.php?service="
//return "http://192.168.10.52/gosvc.php?service="
//return "https://test.cloudigy.io/gosvc.php?service="
//return "http://localhost:8080/"
}


export function checkDataState(value){

    if(typeof(value) == 'undefined'){
        console.log("Value undfined");
        return false;
    }else if(value  == null){
        console.log("Value null");
        return false;
    }else{
      return true;
    }
}


export function  getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
}
export function showalert (){
  if (getCookie("email") === null || getCookie("email") === undefined || getCookie("email") === ""){
    alert("You were signed out of your account. Please sign in again.");
  }
}


export function clearCookie(name){
        axios({
            method:'post',

            //url:'http://'+window.location.hostname+'/nodesvc.php?service='+'updateuserloginstatus',
            url:window.location.origin+"/nodesvc.php?service="+"updateuserloginstatus",
            headers: {
                    'Content-Type': 'application/json'
                },
            responseType:'json',
            data: JSON.stringify({
                useremail:localStorage.getItem("email"),
                "customercode": localStorage.getItem("customerCode"),
                "email": localStorage.getItem("email"),
                "accesstoken": localStorage.getItem("accessToken")
            })
        })
        .then(function (response) {
            //console.log(response);
              if(response.data.sucess){
                  console.log(response.data.response);
                  localStorage.removeItem('username');
                  localStorage.setItem("authenticate",false);
                  sessionStorage.setItem("wizardData",null);
                  localStorage.clear();
                  sessionStorage.setItem("licensingStatus","");
                  sessionStorage.setItem("contractGeneralchecked",false);
                  sessionStorage.setItem("contractinformationSecuritychecked",false);
                  sessionStorage.setItem("contractSLOchecked",false);
                  sessionStorage.setItem("contract_name","");
              }
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/'+basicUrl+'';
    }




    export function  convertToDollar(n, c, d, t) {
      var c = isNaN(c = Math.abs(c)) ? 0 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;
      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");

    //  return finalVariable;
    }
    export function  convertToDollarRes(n, c, d, t) {
      var c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;
      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");

    //  return finalVariable;
    }


	export function  convertToDollarps(n, c, d, t) {
	    var c = isNaN(c = Math.abs(c)) ? 0 : 0,
	    d = d == undefined ? "." : d,
	    t = t == undefined ? "," : t,
	    s = n < 0 ? "-" : "",
	    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
	    j = (j = i.length) > 3 ? j % 3 : 0;
	    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");

	  //  return finalVariable;
	}
