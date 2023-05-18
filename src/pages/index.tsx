// import Image from 'next/image' // will use later
import Head from 'next/head'

type Props = {
  nowPlayingMovies: any,
  airingTodayTv: any
}

export default function Home({nowPlayingMovies, airingTodayTv}: Props) {
  return (
    <>
    <Head><title>Movie Test App</title></Head>
    <main>
      {/* <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      /> */}
      <h2>Now Playing Movies</h2>
      <div>
        <pre>
          {JSON.stringify(nowPlayingMovies?.results?.slice(0, 3), null, 2)}
        </pre>
      </div>
      <h2>Airing Today TV Series</h2>
      <div>
        <pre>
          {JSON.stringify(airingTodayTv?.results?.slice(0, 3), null, 2)}
        </pre>
      </div>
    </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const nowPlayingMovieResponse = fetch(
     `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json());
  
  const airingTodayTvResponse = fetch(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json());
  
  

  const [nowPlayingMovies, airingTodayTv] = await Promise.all([
    nowPlayingMovieResponse,
    airingTodayTvResponse
  ]);

  return {
     props: {
      nowPlayingMovies,
      airingTodayTv
     },
  };
};