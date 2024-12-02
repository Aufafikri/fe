import Link from 'next/link'
import React from 'react'

const ButtonLoginUser = () => {
  return (
    <div className='py-2 px-3 bg-slate-50 rounded-xl'>
      <Link href={'/login'} className='text-sky-500 font-bold'>Sign In</Link>
    </div>
  )
}

export default ButtonLoginUser