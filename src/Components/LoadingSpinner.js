import React from 'react';
import axios from 'axios';


class LoadingSpinnner extends React.Component {

/*<div className="loadingText">{this.props.loadingText}</div>*/
    render(){
        return(<div className={"pageLoader "+this.props.showSpinner}>
               	<div className="loader"></div>

               </div>
        )
    }
}

export default LoadingSpinnner;
