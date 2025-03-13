import { FC } from "react";
import Link from "next/link";

interface Movie {
  title: string;
  vote_average?: number;
  poster_path?: string;
  release_date?: string;
  original_language?: string;
  thumbnail?: string;
  creator?: string;
  year?: string;
  videoUrl?: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const { title, poster_path, thumbnail, videoUrl } = movie;

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : thumbnail || "/no-movie.png";

  return (
    <div className="movie-card">
      <Link href={`/movies/${title}`}>
        <img src={imageUrl} alt={title} />
        <div className="mt-4">
          <h3 className="text-title">{title}</h3>
          {videoUrl && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="watch-btn"
            >
              🎬 Watch Now
            </a>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
