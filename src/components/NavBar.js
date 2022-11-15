import React,{useRef} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {Link} from 'react-router-dom';
import './Nav.css'

const NavBar = () => {
  const NavRef = useRef()

  const shownavlink =()=>{
    NavRef.current.classList.toggle('responsive-nav')
  }

  return (
   <>
 <header className= 'header'>
      <h1>MICKY</h1>
   
      <nav ref={NavRef}>
      <Link to='trending'>Trending</Link>
      <Link to='/movies'>Movies</Link>
      <Link to='/tv'>TV</Link>
      <Link to='/search'>Search</Link>
    <button
    className='nav-btn nav-close'
     onClick={shownavlink}>
        <CloseIcon/>
    </button>
      </nav>
      <button
      className='nav-btn'
       onClick={shownavlink}>
      <MenuOpenIcon/>
      </button>
    </header>
    <div className= 'about-app'>
    <h1>
      welcome to our Movie App

      </h1>
      <Link to='trending' className='link'>Getstarted</Link>
    </div>
   </>
   

  )
}

export default NavBar
