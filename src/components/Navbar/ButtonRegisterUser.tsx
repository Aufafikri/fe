import Link from 'next/link'
import React from 'react'

const ButtonRegisterUser = () => {
  return (
    <div className='border-2 py-2 px-3 rounded-xl '>
      <Link href={'/register'} className='font-bold'>Sign Up</Link>
    </div>
  )
}

export default ButtonRegisterUser