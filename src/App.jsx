
import { useState, useEffect, useRef, useReducer } from "react"
import MovieList from "./components/MovieList"
function App() {
  const inputRef = useRef(null)

  const initialValue = {
    input: "",
    movies: [],
    process: false,
    error: false,
    enter: false
  }
  function countReducer(state, action) {
    switch (action.type) {
      case "input": return { ...state, input: action.payload }
      case "movies": return { ...state, movies: action.payload }
      case "process": return { ...state, process: action.payload }
      case "error": return { ...state, error: action.payload }
      case "enter": return { ...state, enter: action.payload }
    }
  }
  const [state, dispatch] = useReducer(countReducer, initialValue)
  const handleInput = (e) => {
    dispatch({
      type: "input",
      payload: e.target.value
    })
  }





  useEffect(() => {
    let saved = loadStorage()
    dispatch({ type: "movies", payload: saved })
  }, [])


  useEffect(() => {
    inputRef.current.focus()    //we can access inputRef using .current
  }, [])



  async function handleData() {
    if (state.input === "") {
      dispatch({ type: "enter", payload: true })
      return
    }
    dispatch({ type: "process", payload: true })

    let response = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${state.input}`)
    let data = await response.json()
    console.log(data)
    if (data.Response === "False") {
      dispatch({ type: "error", payload: true })

      dispatch({ type: "movies", payload: [] })
      dispatch({ type: "enter", payload: false })
    } else {

      dispatch({ type: "movies", payload: data.Search })
      savedData(data.Search)

      dispatch({ type: "error", payload: false })
    }
    dispatch({ type: "enter", payload: false })
    dispatch({ type: "process", payload: false })
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
      <div className="flex mt-16 flex-col items-center gap-12 justify-center px-4 ">
        <h1 className=" flex justify-center items-center font-extrabold text-8xl text-white">Movie Search App</h1>

        <div className="flex flex-col w-full max-w-xl  gap-12 justify-center items-center">
          <div className="flex flex-col w-full max-w-xl  gap-4 justify-center items-center">
            <label className="flex flex-col items-center w-full text-white ">Movie Name
              <input ref={inputRef} value={state.input} onChange={handleInput} className="flex justify-center items-center w-full p-2  font-sans  border-2 border-white-500  rounded-3xl h-10" type='text' placeholder='search here' /></label>
            <button className="bg-gray-800 w-full  text-white flex justify-center items-center font-sans text-2xl  rounded-3xl  p-1  h-10" onClick={handleData}>Search</button>

            {state.enter && <div className="flex justify-center items-center text-white">Please enter the movie name</div>}
            {state.process && <div className="flex justify-center items-center text-white">Searching...</div>}
            {state.error && <div className="flex justify-center items-center text-white">Movie is not found</div>}</div>
          <MovieList
            movies={state.movies}
          />
        </div>
      </div >



    </>
  )
}

export default App
