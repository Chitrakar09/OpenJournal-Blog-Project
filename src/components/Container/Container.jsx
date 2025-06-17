import React from 'react'

function Container({children,className=""}) {
  return (
    <main className={`bg-gradient-to-b from-[#000000] via-[#14213d] to-[#1d2a50] w-full h-full flex flex-col items-center p-10 flex-grow ${className}`}>
        {children}
    </main>
  )
}

export default Container