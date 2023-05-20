export type Tv = {
  id: number
  name: string
  poster_path: string
}

export type TvApiResponse = {
  results: Tv[]
}
