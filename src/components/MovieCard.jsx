import React from 'react'

const MovieCard = ({ Poster, Title, Year }) => {
    return (
        <div>

            <div className="cursor-pointer transition-all hover:shadow-2xl  hover:brightness-110 hover:scale-105 bg-gray-900 rounded-md">
                {Poster === "N/A" ? <div className="text-white flex justify-center items-center">No Poster Available</div> : <img className=" text -white rounded-2xl  w-full h-64 object-cover" src={Poster} alt={Title} />}
                <div className="flex gap-2 items-center justify-center">
                    <h2 className=" text-white flex flex-row gap-1">{Title}</h2>
                    <h2 className=" text-white flex flex-row gap-1">{Year}</h2>
                </div>
            </div>

        </div>
    )
}

export default MovieCard
