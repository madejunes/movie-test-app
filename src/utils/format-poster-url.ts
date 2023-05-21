const formatPosterUrl = (path: string, width?: string) => {
  const _width = width || 'w342'
  return `https://image.tmdb.org/t/p/${_width}${path}`
}
export default formatPosterUrl
