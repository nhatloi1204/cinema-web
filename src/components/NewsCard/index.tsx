interface newsProps {
  image: string
  title: string
}

function NewsCard({ image, title }: newsProps) {
  return (
    <>
      <div className=''>
        <img
          src={image}
          alt='image'
          className='rounded object-cover h-80 w-60'
        />
        <div className='font-bold text-normalBlue w-60 pt-4'>{title}</div>
      </div>
    </>
  )
}

export default NewsCard
