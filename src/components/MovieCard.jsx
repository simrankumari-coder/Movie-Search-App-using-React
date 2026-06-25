import React from 'react'
import { useContext } from 'react'
import { useMemo } from 'react'
import { MovieContext } from '../context/MovieContext'
const MovieCard = ({ movie }) => {
    const { addToFav } = useContext(MovieContext)
    return (
        <div>

            <div className="cursor-pointer transition-all hover:shadow-2xl  hover:brightness-110 hover:scale-105 bg-gray-900 rounded-md">
                {movie.Poster === "N/A" ? <div className="text-white flex justify-center items-center">No Poster Available</div> : <img className="rounded-2xl w-full h-48 md:h-64 object-cover" src={movie.Poster} alt={movie.Title} />}
                <div className="flex gap-2 items-center justify-center">
                    <h2 className=" text-white flex flex-row gap-1">{movie.Title}</h2>
                    <h2 className=" text-white flex flex-row gap-1">{movie.Year}</h2>
                </div>
                <button className="w-full bg-gray-800 text-red-600 hover:bg-red-500 hover:text-white py-2 rounded-md transition-all"
                    onClick={() => addToFav(movie.imdbID)}>❤Add</button>
            </div>

        </div>
    )
}

export default React.memo(MovieCard)
