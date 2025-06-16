import React from 'react'

type Props = {
    children:React.ReactNode
}

const Container = ({children}: Props) => {
  return (
    <div className='p-4 w-full'>
        {children}
    </div>
  )
}

export default Container