import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import { paginate } from "../services/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/Pagination";
import _ from "lodash";
import Caret from "./common/Caret";

class Movies extends Component {
  state = {
    genre: [],
    movies: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: {
      title: "title",
      order: "asc",
    },
  };

  componentDidMount() {
    let genre = [{ name: "All Genre" }, ...getGenres()];
    this.setState({ genre, movies: getMovies() });
  }

  handleGenreSelect = (m) => {
    this.setState({ selectedGenre: m, currentPage: 1 });
  };
  handlePageChange = (item) => {
    this.setState({ currentPage: item });
  };
  handleSort = (path) => {
    if (this.state.sortColumn.title === path) {
      let sortColumn = {
        title: path,
        order: this.state.sortColumn.order === "asc" ? "desc" : "asc",
      };
      this.setState({ sortColumn });
    } else {
      let sortColumn = {
        title: path,
        order: "asc",
      };
      this.setState({ sortColumn });
    }
  };

  handleLike = (m) => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(m);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  onDelete = (m) => {
    let movies = this.state.movies.filter((c) => c._id !== m._id);
    this.setState({ movies });
  };
  render() {
    if (this.state.movies.length === 0) {
      return (
        <h1 style={{ textAlign: "center" }}>No movies in your database</h1>
      );
    }
    let filtered =
      this.state.selectedGenre && this.state.selectedGenre._id
        ? this.state.movies.filter(
            (m) => m.genre._id === this.state.selectedGenre._id
          )
        : this.state.movies;
    let sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.title],
      this.state.sortColumn.order
    );
    const m = paginate(sorted, this.state.currentPage, this.state.pageSize);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3 mt-5 ">
            <ListGroup
              selectedGenre={this.state.selectedGenre}
              onGenreSelect={this.handleGenreSelect}
              genere={this.state.genre}
            />
          </div>
          <div className="col">
            <h1 style={{ textAlign: "center" }}>Yours Movie</h1>
            <p style={{ textAlign: "center" }}>
              {filtered.length} Movies in your database
            </p>
            <Link
              to="/movieform/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
            <table className="table">
              <thead>
                <tr>
                  <th
                    style={{ cursor: "pointer" }}
                    onClick={() => this.handleSort("title")}
                  >
                    Movie
                    {this.state.sortColumn.title === "title" && (
                      <Caret order={this.state.sortColumn.order} />
                    )}
                  </th>
                  <th
                    style={{ cursor: "pointer" }}
                    onClick={() => this.handleSort("genre.name")}
                  >
                    Genre
                    {this.state.sortColumn.title === "genre.name" && (
                      <Caret order={this.state.sortColumn.order} />
                    )}
                  </th>
                  <th
                    style={{ cursor: "pointer" }}
                    onClick={() => this.handleSort("numberInStock")}
                  >
                    Stock
                    {this.state.sortColumn.title === "numberInStock" && (
                      <Caret order={this.state.sortColumn.order} />
                    )}
                  </th>
                  <th
                    style={{ cursor: "pointer" }}
                    onClick={() => this.handleSort("dailyRentalRate")}
                  >
                    Rate
                    {this.state.sortColumn.title === "dailyRentalRate" && (
                      <Caret order={this.state.sortColumn.order} />
                    )}
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {m.map((m) => (
                  <tr key={m._id}>
                    <td>
                      <Link to={`/movieform/${m._id}`}>{m.title}</Link>
                    </td>
                    <td>{m.genre.name}</td>
                    <td>{m.numberInStock}</td>
                    <td>{m.dailyRentalRate}</td>
                    <td>
                      <Like
                        onClick={() => this.handleLike(m)}
                        liked={m.liked}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => this.onDelete(m)}
                        className="btn btn-danger sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <Pagination
            length={filtered.length}
            currentPage={this.state.currentPage}
            pageSize={this.state.pageSize}
            doPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
