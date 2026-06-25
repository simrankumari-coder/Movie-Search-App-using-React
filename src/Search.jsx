import React from 'react'
import { MovieContext } from './context/MovieContext'
import { useContext } from 'react'
const Search = () => {
    const { state, handleInput, inputRef, handleData, } = useContext(MovieContext)
    return (
        <div>

            <div className="flex flex-col max-w-xl w-full  md:w-96 p-2 gap-4 justify-center items-center">
                <label className="flex flex-col items-center w-full text-white ">Movie Name
                    <input ref={inputRef} value={state.input} onChange={handleInput} className="flex justify-center items-center w-full p-2  font-sans  border-2 border-white-500  rounded-3xl h-10" type='text' placeholder='search here' /></label>
                <button className="bg-gray-800 w-full text-white flex justify-center items-center font-sans text-lg md:text-2xl rounded-3xl p-1 h-10" onClick={handleData}>
                    Search
                </button>

                {state.enter && <div className="flex justify-center items-center text-white">Please enter the movie name</div>}
                {state.error && <div className="flex justify-center items-center text-white">Movie is not found</div>}
                {state.process && <div className="flex justify-center items-center text-white">Searching...</div>}
            </div>

        </div>
    )
}

export default Search
