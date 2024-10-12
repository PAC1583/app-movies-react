import { useState } from 'react'
import './MovieApp.css'

export const MovieApp = () => {

    const [search, setSearch] = useState('')
    const [moviesList, setMoviesList] = useState(null)

    const urlBase = "https://api.themoviedb.org/3/search/movie"
    const API_KEY = "eacb10a62cafa28fde0e05f4d789cd0e"

    const handleInputChange = ({ target }) => {
        setSearch(target.value)


    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchMovies()
        // console.log(target.value)

    }

    const fetchMovies = async () => {
        try {
            const res = await fetch(`${urlBase}?query=${search}&api_key=${API_KEY}&language=es-ES`)
            const data = await res.json()
            setMoviesList(data.results)
            console.log(data.results)

        } catch (error) {
            console.error('Ha ocurrido un error: ', error)
        }
    }

    return (
        <div className='container'>

            <h1 >Buscador de Películas</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Ingrese una Película'
                    value={search}
                    onChange={handleInputChange}
                />
                <button>Buscar</button>
            </form>

            {moviesList &&
                <div className='movie-list'>
                    {moviesList.map(movie => (
                        <div key={movie.id} className='movie-card'>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                        </div>
                    ))}
                </div>
            }

        </div>
    )
}
