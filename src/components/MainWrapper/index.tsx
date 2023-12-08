import React from 'react'

interface MainWrapperProps {
  children: React.ReactNode;
}

function MainWrapper({children}: MainWrapperProps) {
  return (
    <main className='grid lg:grid-cols-2 max-w-md me-auto ms-auto py-10 lg:py-0 px-5 gap-6 lg:max-w-5xl lg:h-screen lg:items-center'>
      {children}
    </main>
  )
}

export default MainWrapper