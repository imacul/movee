"use client";

import { useEffect, useState } from "react";
import Search from "@/components/Search";
import Spinner from "@/components/Spinner";
import MovieCard from "@/components/MovieCard";
import { useDebounce } from "react-use";

interface Movie {
  id: string;
  title: string;
  description?: string;
  creator?: string;
  year?: string;
  thumbnail: string;
  source: "YouTube" | "Internet Archive";
  channel?: string;
}


const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState<string>("");
  const [useYouTube, setUseYouTube] = useState(true);

  const fetchMovies = async (query: string = "") => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      let endpoint: string;
  
      // Temporarily disable YouTube API for testing
      
      if ( useYouTube) {
        endpoint = query
          ? `${YOUTUBE_API_BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoDuration=long&videoEmbeddable=true&maxResults=50&key=${YOUTUBE_API_KEY}`
          : `${YOUTUBE_API_BASE_URL}/search?part=snippet&q=full%20movie%20free&type=video&videoDuration=long&videoEmbeddable=true&maxResults=50&key=${YOUTUBE_API_KEY}`;
      } else {
        return null;
      }
  
      console.log("Fetching from endpoint:", endpoint);
  
      const response = await fetch(endpoint);
      if (!response.ok) {
        console.error(`HTTP Error: ${response.status}`);
        console.error(`Response Text: ${await response.text()}`);
        throw new Error(`Failed to fetch movies: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("API response data:", data); // Log the raw response
  
    
        setMovieList(
          data.items)
    
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  useDebounce(() => setDebounceSearchTerm(searchTerm), 2000, [searchTerm]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        await fetchMovies(searchTerm);
      } catch (error) {
        console.log(`YouTube API failed, switching to Internet Archive... ${error}`);
        setUseYouTube(false);
        await fetchMovies(searchTerm);
      }
    };
    getMovies();
  }, [debounceSearchTerm, useYouTube]);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Banner image" />
            <h1>
              Find <span className="text-gradient"> Movies </span> you will Love!
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className="all-movies">
            <h1>All Movies</h1>
            {isLoading ? (
              <div className="text-center justify-center items-center">
                <Spinner />
              </div>
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie, index) => (
                  <MovieCard key={index} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Home;


