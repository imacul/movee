import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface Movie {
  id: string;
  title: string;
  vote_average?: number;
  poster_path?: string;
  release_date?: string;
  original_language?: string;
  thumbnail?: string;
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
      <Link href={`/movie/${movie.id}`}>
        <Image src={imageUrl} alt={title} height={500} width={300} />
        <div className="mt-4">
          <h3 className="text-title">{title}</h3>
          {videoUrl && (
            <Link
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="watch-btn"
            >
              🎬 Watch Now
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
