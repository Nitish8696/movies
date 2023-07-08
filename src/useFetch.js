import React, { useState, useEffect } from 'react'
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`


const useFetch = (urlParams)=> {
   const [isLoading,setIsLoading] = useState(true)
   const [error,setError] = useState({show:false,msg:''})
   const [data,setData] = useState(null)

   const fetchMovies = async(url) =>{
    setIsLoading(true)
     const resp = await fetch(url)
     const data = await resp.json()

     if (data.Response === 'True') {
        setData(data.Search || data)
        setIsLoading(false)
     }
     else {
        setError({show:true,msg:data.Error})
     }
     setIsLoading(false)
   }

   useEffect(()=>{
    fetchMovies(`${API_ENDPOINT}${urlParams}`)
   },[urlParams])

  return {isLoading,error,data}
}
export default useFetch
