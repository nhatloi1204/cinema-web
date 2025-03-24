interface MovieCardProps {
  image: string
  movieName: string
  type: string
  duration: string
  openingDay: Date
}

function MovieCard({
  image,
  movieName,
  type,
  duration,
  openingDay,
}: MovieCardProps) {
  return (
    <div className='w-64 p-4 border rounded shadow-lg'>
      <img
        src={image}
        alt={movieName}
        className='w-full h-40 object-cover rounded'
      />
      <h2 className='text-lg font-bold mt-2'>{movieName}</h2>
      <p className='text-gray-600'>Type: {type}</p>
      <p className='text-gray-600'>Duration: {duration}</p>
      <p className='text-gray-600'>
        Opening Day: {openingDay.toLocaleDateString()}
      </p>
    </div>
  )
}

export default MovieCard
