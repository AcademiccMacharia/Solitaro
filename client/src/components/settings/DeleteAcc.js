import React from 'react'
import { Link } from 'react-router-dom';

const DeleteAcc = () => {
  return (
    <div className='delete-acc'>
        <h1>Delete Account</h1>
        <p>Are you sure you want to delete your account?</p>
        <div className='delete-acc-fields'>
        <button>Delete Account</button>
        or
        <button><Link className='link' to='/home' > Go Back Home</Link></button>
        </div>
    </div>
  )
}

export default DeleteAcc;