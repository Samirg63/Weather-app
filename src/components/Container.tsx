import React from 'react'

type Props = {
    children:React.ReactNode,
    customClass?:string
}

const Container = ({children, customClass}: Props) => {
  return (
    <div className={` h-full ${customClass}`}>
        {children}
    </div>
  )
}

export default Container