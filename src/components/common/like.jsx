import React, { Component } from "react";
class Like extends Component {
  state = {};
  render() {
    let icon = "fa fa-heart";
    if (!this.props.liked) icon = icon + "-o";
    return (
      <i
        onClick={this.props.onClick}
        style={{ cursor: "pointer" }}
        className={icon}
      ></i>
    );
  }
}

export default Like;
