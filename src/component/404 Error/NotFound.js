import React, { Component } from 'react';

import logo from '../../asset/logo.PNG'
import './NotFound.css';

class NotFound extends Component {
    
    render() { 
        return ( 
            <div>
                <div className="main-div">
                    <img style={{width:"250px", height:"250px", borderRadius:"10px", padding:"0px", margin:"10px" }} alt="card" src= {logo} />
                </div>
                <div className="main-div">
                    <p className="txt">Ooops</p>
                </div>
                <div className="main-div">
                    <p className="txt">Page Not Found</p>
                </div>
            </div>
         );
    }
}
 
export default NotFound;