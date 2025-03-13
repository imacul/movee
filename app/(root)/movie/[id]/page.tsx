import { notFound } from "next/navigation";

interface MoviePageProps {
  params: { id: string };
}

const MoviePage = async ({ params }: MoviePageProps) => {
  const { id } = await params;

  // Fetch movie details from YouTube API
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3/videos";

  const response = await fetch(
    `${YOUTUBE_API_BASE_URL}?part=snippet,contentDetails,statistics&id=${id}&key=${YOUTUBE_API_KEY}`
  );

  if (!response.ok) return notFound();

  const data = await response.json();
  const movie = data.items?.[0]?.snippet;

  if (!movie) return notFound();

  return (
    <div className="pattern">
      <div className="container mx-auto p-4">
    <div className="aspect-w-16 aspect-h-9 flex justify-center">
      <iframe
        width="95%"
        height="500"
        src={`https://www.youtube.com/embed/${id}`}
        title={movie.title}
        allowFullScreen
        className="rounded-lg mt-4"
      />
    </div>
      <h1 className="text-2xl font-bold text-gradient mt-10">{movie.title}</h1>
      <p className="mt-4 text-white">{movie.description}</p>
      </div>
    </div>
  );
};

export default MoviePage;
