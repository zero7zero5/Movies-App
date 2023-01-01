import React, { Component } from "react";
import { getGenres } from "./../../services/fakeGenreService";
import Joi from "joi-browser/dist/joi-browser";
import { getMovie, saveMovie } from "../../services/fakeMovieService";

class MovieForm extends Component {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  handleChange = (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    saveMovie(this.state.data);

    this.props.history.push("/movies");
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1>Movie Form</h1>
          <form onSubmit={this.handleSubmit}>
            <div class="form-group">
              <label htmlFor="exampleInputEmail1">Movie Name</label>
              <input
                name="title"
                onChange={this.handleChange}
                value={this.state.data.title}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              {this.state.errors.title && (
                <div className="alert alert-danger">
                  {this.state.errors.title}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Genre</label>
              <select
                onChange={this.handleChange}
                name="genreId"
                id="genreId"
                className="form-control"
              >
                <option value="" />
                {this.state.genres.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {this.state.errors.genreId && (
                <div className="alert alert-danger">
                  {this.state.errors.genreId}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlfor="exampleInputPassword1">Number In Stocks</label>
              <input
                value={this.state.data.numberInStock}
                onChange={this.handleChange}
                type="number"
                name="numberInStock"
                className="form-control"
                id="exampleInputPassword1"
              />
              {this.state.errors.numberInStock && (
                <div className="alert alert-danger">
                  {this.state.errors.numberInStock}
                </div>
              )}
            </div>
            <div class="form-group">
              <label htmlfor="exampleInputPassword1">Rating</label>
              <input
                onChange={this.handleChange}
                value={this.state.data.dailyRentalRate}
                type="number"
                className="form-control"
                id="exampleInputPassword1"
                name="dailyRentalRate"
              />
              {this.state.errors.dailyRentalRate && (
                <div className="alert alert-danger">
                  {this.state.errors.dailyRentalRate}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieForm;
