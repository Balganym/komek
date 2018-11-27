import React, { Component } from 'react';
import './style.css';

class CreatedCase extends Component{
  render(){
    return(
      <div className="added-case">
        <div className="dark">{this.props.num}.</div>
        <div className="light">{this.props.data.full_name}</div>
      </div>
    )
  }
}

export default CreatedCase;