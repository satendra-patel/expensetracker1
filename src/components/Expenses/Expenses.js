import React from 'react'
import { Link } from 'react-router-dom'


export default function Expenses() {
  const logOutHandler=()=>{
    localStorage.clear('idToken');
    localStorage.clear('email');
  }
  return (
    <div>
      <nav>
        <Link to='/login'><button onClick={logOutHandler}>Logout</button></Link>
        <span className='px-4'>Welcome To Expense Tracker</span>
      <span className='float-end px-4'> Your Profile is incomplete . <Link to='/profile'>Complete Now!</Link></span>
      <br />
     
      </nav>
      <hr />

    </div>
  )
}
