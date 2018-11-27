import React, {Component} from 'react';
import './style.css';
import { Link } from 'react-router-dom'

export default class CaseList extends Component {

  handleClick = () => {
    this.props.onClick(this.props.data);
  }

  render() {
    const newTo = { 
      pathname: "/CreateCase", 
      data: this.props.data 
    };
    return (
      <Link to={newTo}><div className="caseList">{this.props.data.full_name}</div></Link>
    )
  }
}
