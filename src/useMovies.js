/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import {useState, useEffect} from 'react'


const KEY = "8fbe247a";

export function useMovies (query){
   
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const controller = new AbortController();
    
        // Fetch Movies on component mount and unmount
        async function fetchMovies() {
          try {
            setIsLoading(true);
            setError("");
            const res = await fetch(
              `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal}
            );
    
            if (!res.ok) throw new Error("Could not fetch movies");
            const data = await res.json();
            if (data.Response === "False") {
              throw new Error("No movie found");
            }
            setMovies(data.Search);
            setError("");
            setIsLoading(false);
          } catch (err) {
            console.log(err);
            if(err.name !== 'AbortError'){
    
              setError(err.message);
            }
          } finally {
            setIsLoading(false);
          }
        }
    
        if (query.length < 3) {
          setMovies([]);
          setError("");
          return;
        }
    
        fetchMovies();
        return function(){
          controller.abort()
        }
      }, [query]);

      return{
        movies, isLoading, error
      }

}