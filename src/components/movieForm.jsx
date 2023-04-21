import Joi from 'joi-browser';
import React from 'react';
import { getGenres } from '../services/fakeGenreService';
import { getMovie } from '../services/fakeMovieService';
import Form from './common/form';
import { saveMovie } from './../services/fakeMovieService';

class MovieForm extends Form {

    state = {
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        errors: {},
        genres: []
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string()
            .required()
            .label('Title'),
        genreId: Joi.string()
            .required()
            .label('Genre'),
        numberInStock: Joi.number()
            .min(0)
            .max(100)
            .required()
            .label('Number In Stock'),
        dailyRentalRate: Joi.number()
            .min(0)
            .max(10)
            .required()
            .label('Number In Stock')
    }

    componentDidMount() {
        const genres = getGenres();
        this.setState({ genres })

        const movieId = this.props.match.params.id;
        if (movieId == "new") return;

        const movie = getMovie(movieId)

        if (!movie) return this.props.history.replace("/not-found")

        this.setState({ data: this.mapToViewModel(movie) })
        
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    doSubmit = () => {
        console.log('submitted!!!')
        saveMovie(this.state.data);
        this.props.history.push("/movies")
    }

    render() { 
        const {match} = this.props;
        return (
            <>
                <h1>Movie Id: {match.params.id}</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genreId', 'Genre', this.state.genres)}
                    {this.renderInput('numberInStock', 'Number In Stock')}
                    {this.renderInput('dailyRentalRate', 'Daily Rental Rate')}
                    {this.renderButton("Save")}
                </form>
            </>
        );
    }
}
 
export default MovieForm;