
import { useState, useEffect, useRef, useReducer, useCallback } from "react"
import MovieList from "./components/MovieList"
import Search from "./Search"
import { MovieContext } from "./context/MovieContext"
function App() {



  const initialValue = {
    input: "",
    movies: [],
    process: false,
    error: false,
    enter: false,
    fav: []
  }
  function countReducer(state, action) {
    switch (action.type) {
      case "input": return { ...state, input: action.payload }
      case "movies": return { ...state, movies: action.payload }
      case "process": return { ...state, process: action.payload }
      case "error": return { ...state, error: action.payload }
      case "enter": return { ...state, enter: action.payload }
      case "fav": return { ...state, fav: action.payload }
      case "add_fav": {
        const newFav = [...state.fav, action.payload]
        savedFav(newFav)
        return { ...state, fav: newFav }
      }

    }
  }
  const inputRef = useRef(null)
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
    let saveFav = loadFav()
    dispatch({ type: "fav", payload: saveFav })


  }, [])


  useEffect(() => {
    inputRef.current.focus()    //we can access inputRef using .current
  }, [])

  const addToFav = useCallback(
    (movieId) => {

      dispatch({ type: "add_fav", payload: movieId })
    },
    [dispatch],
  )

  async function handleData() {
    if (state.input === "") {
      dispatch({ type: "enter", payload: true })
      return
    }
    dispatch({ type: "process", payload: true })
    console.log(import.meta.env.VITE_OMDB_API_KEY)
    let response = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${state.input}`)
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
  function savedFav(fav) {
    localStorage.setItem("favourite", JSON.stringify(fav))
  }
  function loadFav() {
    let storeFav = localStorage.getItem("favourite")
    return storeFav ? JSON.parse(storeFav) : []
  }

  return (
    <>
      <MovieContext.Provider value={{ addToFav, state, dispatch, handleData, handleInput, inputRef, }}>
        <div className="w-screen  flex mt-16 flex-col  items-center gap-6 md:gap-12 justify-center px-4">

          <h1 className="flex justify-center items-center font-extrabold text-4xl md:text-8xl text-white">Movie Search App</h1>
          <Search />
          {/* <div className="bg-gray-800 max-w-96 text-white flex justify-center items-center font-sans text-lg md:text-2xl rounded-3xl p-1 h-10">
            <span className="text-2xl">❤</span>
            <span className="text-lg font-semibold">Favorites: {state.fav.length}</span>
          </div> */}
          <div className="text-red-600 text-xl font-bold bg-gray-800 p-2 rounded-2xl">
            ❤ Favorites: {state.fav.length}
          </div>
          <MovieList />


        </div>




      </MovieContext.Provider >
    </>
  )
}

export default App
