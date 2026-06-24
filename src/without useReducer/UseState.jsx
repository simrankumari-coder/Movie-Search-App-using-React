
import { useState, useEffect, useRef, useReducer } from "react"
function App() {
    const [input, setInput] = useState("")
    const [movies, setMovies] = useState([])
    const [process, setProcess] = useState(false)
    const [error, setError] = useState(false)
    const [enter, setEnter] = useState(false)

    const inputRef = useRef(null)
    useEffect(() => {
        let saved = loadStorage()
        setMovies(saved)
    }, [])
    useEffect(() => {
        inputRef.current.focus()    //we can access inputRef using .current
    }, [])

    const handleInput = (e) => {
        setInput(e.target.value)
    }
    async function handleData() {
        if (input === "") {
            setEnter(true)
            return

        }
        setProcess(true)

        let response = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${input}`)
        let data = await response.json()
        console.log(data)
        if (data.Response === "False") {
            setError(true)
            setMovies([])
            setEnter(false)
        } else {

            setMovies(data.Search)
            savedData(data.Search)
            setError(false)
        }
        setEnter(false)
        setProcess(false)
    }
    function savedData(data) {
        localStorage.setItem("card", JSON.stringify(data))
    }
    function loadStorage() {
        let storeData = localStorage.getItem("card")
        return storeData ? JSON.parse(storeData) : []
    }

    return (
        <>
            <div className="flex mt-16 flex-col items-center gap-12 justify-center">
                <h1 className="font-extrabold text-8xl text-white">Movie Search App</h1>

                <div className="flex flex-col w-full max-w-xl  gap-2 justify-center items-center">
                    <label className="w-full text-white ">Movie Name
                        <input ref={inputRef} value={input} onChange={handleInput} className="flex justify-center items-center w-full p-2  font-sans  border-2 border-white-500  rounded-3xl h-10" type='text' placeholder='search here' /></label>
                    <button className="bg-gray-800 w-full  text-white flex justify-center items-center font-sans text-2xl  rounded-3xl  p-1  h-10" onClick={handleData}>Search</button>
                    {enter && <div className="text-white">Please enter the movie name</div>}
                    {process && <div className="text-white">Searching...</div>}
                    {error && <div className="text-white">Movie is not found</div>}
                    <div className="w-6xl grid grid-cols-1 md:grid-cols-4 gap-12">
                        {movies.map((movie) => {
                            console.log("Poster value:", movie.Poster)
                            return <div className="bg-gray-900 rounded-md" key={movie.imdbID}>
                                {movie.Poster === "N/A" ? <div className="text-white flex justify-center items-center">No Poster Available</div> : <img className=" text -white rounded-2xl  w-full h-64 object-cover" src={movie.Poster} alt={movie.Title} />}
                                <div className="flex gap-2 items-center justify-center">
                                    <h2 className=" text-white flex flex-row gap-1">{movie.Title}</h2>
                                    <h2 className=" text-white flex flex-row gap-1">{movie.Year}</h2>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div >



        </>
    )
}

export default App
