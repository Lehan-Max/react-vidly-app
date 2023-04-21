import React, {Component} from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
import _ from 'lodash';
import { Link } from "react-router-dom";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: null,
        searchQuery: "",
        sortColumn: {path: 'title', order: 'asc'}
    }

    componentDidMount() {
        const genres = [{_id: '', name: 'All Genres'}, ...getGenres()];
        this.setState({movies: getMovies(), genres})
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies : movies})
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movie};
        movies[index].liked = !movies[index].liked;
        this.setState({ movies })
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page})
    }

    handleGenreSelect = (genre) => {
        this.setState({selectedGenre: genre, searchQuery: "", currentPage: 1})
    }

    handleSort = sortColumn => {
        this.setState({sortColumn})
    }

    getPageData = () => {
        const {
            pageSize, 
            currentPage, 
            movies: allMovies, 
            selectedGenre,
            searchQuery,
            sortColumn
        } = this.state;

        let filtered = allMovies;
        if(searchQuery)
            filtered = allMovies.filter(m => 
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedGenre && selectedGenre._id)
                filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);
        return {totalCount: filtered.length, data: movies, currentPage}
    }

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1})
    }

    render() {

        const {length: count} = this.state.movies;
        const {
            pageSize, 
            currentPage, 
            sortColumn,
            genres,
            selectedGenre,
            searchQuery
        } = this.state;

        if (count === 0 ) return <p>There are no Movies left in the List!!</p>

        const {totalCount, data: movies} = this.getPageData();
        
        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup 
                        items={genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={selectedGenre}
                    />
                </div>
                <div className="col">
                    <Link to="/movies/new">
                        <button className="btn btn-primary">
                            New Movie
                        </button>
                    </Link>
                    <h1>There are total of {totalCount}  Movies </h1>
                    <SearchBox 
                        value={searchQuery} 
                        onChange={this.handleSearch} 
                    />
                    <MoviesTable 
                        movieList={movies} 
                        onLike={this.handleLike} 
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}
                    />
                    <Pagination 
                        itemsCount={totalCount} 
                        pageSize={pageSize} 
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;