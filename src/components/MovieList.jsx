import React from 'react'
import MovieCard from './MovieCard'
import { MovieContext } from '../context/MovieContext'
import { useContext } from 'react'
const MovieList = () => {
    const { state } = useContext(MovieContext)
    return (
        <div>

            <div className="w-full  mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                {state.movies.map((movie) =>
                    <MovieCard
                        key={movie.imdbID}
                        movie={movie}

                    />
                )}
            </div>
        </div >

    )
}

export default MovieList
