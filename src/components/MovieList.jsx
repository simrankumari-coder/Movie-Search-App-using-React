import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ movies }) => {
    return (
        <div>
            <div className=" md:w-6xl  w-full grid grid-cols-1 md:grid-cols-3 gap-12">
                {movies.map((movie) =>
                    <MovieCard
                        key={movie.imdbID}
                        Poster={movie.Poster}
                        Title={movie.Title}
                        Year={movie.Year}

                    />
                )}
            </div>
        </div>
    )
}

export default MovieList
