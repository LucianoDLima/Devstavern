function Hero() {
  return (
    <section className='flex flex-col gap-4 me-auto ms-auto text-center text-primaryLight grid-cols-2'>
      <h1 className='font-thin text-4xl lg:text-6xl '>
        <span className='font-medium'>Discover</span> and share <span className='font-medium'>personal</span> coding <span className='font-medium'>projects</span>
      </h1>
      <p className='text-md lg:text-xl'>Share your coding projects with fellow learners, exchange ideas, collaborate and grow together.</p>
    </section>
  );
}

export default Hero;
