import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-center bg-slate-800 text-white py-4 items-center '>
            <div className='items-center'>
                <span className='font-bold text-4xl mx-8'>iTask</span>
            </div>
            {/* <ul className='flex gap-3 mx-5'>
                <li className='cursor-pointer hover:font-bold transition-all'></li>
                <li className='cursor-pointer hover:font-bold transition-all'> </li>
            </ul> */}
        
    </nav>
  )
}

export default Navbar