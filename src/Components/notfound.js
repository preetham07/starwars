import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../sass/style.css';

class Notfound extends React.Component {
  constructor(){
    super();
    //this.goBack = this.goBack.bind(this);
  }
  // goBack(){
  //   window.location(window.history.back());
  // }
  componentDidMount(){
    console.log("page not found");
    if(localStorage.getItem("accessToken") == null){
      this.props.history.push('Login');
    }else{
      window.location(window.history.back());
    }

  }
    render() {


        return(
          <div>
                {/*<p>Page Not Found</p>
                <p>You have entered wrong URL</p>
                  <p><aside className="viewlink" onClick={this.goBack}>Go Back to Previous Page</aside></p>*/}
                  </div>
            )
    }

}

Notfound.contextTypes = {
    router: PropTypes.object
}

export default Notfound;
