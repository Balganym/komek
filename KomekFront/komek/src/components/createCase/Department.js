import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

export default class Department extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 1
    }
  }

  handleChange = (tagret, index, priority) => {
    this.props.onClick(priority, this.props.data);
    this.setState({selected: priority});
  }

  render() {

    const colors = {
      1: 'yellow',
      2: 'orange',
      3: 'red'
    }

    return (
      <div className="prior-wrapper">
        <div className="department">{this.props.data.name}</div>
        <DropDownMenu
          onChange={this.handleChange} 
          style={{minWidth: "20px", 
                  maxWidth: "20px",
                  backgroundColor: colors[this.state.selected],
                  borderRadius: "20px"}}>
            {this.props.priorities.map((pr, ix) => {
              return <MenuItem key={ix} value={pr.id} style={{backgroundColor: colors[pr.id]}}/>
            })}
        </DropDownMenu>
      </div>
    )
  }
}