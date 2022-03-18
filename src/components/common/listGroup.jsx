import React, { Component } from "react";
class ListGroup extends Component {
  state = {};
  render() {
    return (
      <ul className="list-group">
        {this.props.genere.map((m) => (
          <li
            key={m._id}
            onClick={() => this.props.onGenreSelect(m)}
            className={
              m === this.props.selectedGenre
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {m.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
