import React from 'react'

function Container({children}) {
  return (
    <main className="bg-gradient-to-b from-[#000000] via-[#14213d] to-[#1d2a50] w-full h-full flex flex-col items-center p-10 flex-grow">
        {children}
    </main>
  )
}

export default Container