import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound404 = () => {
  return (
      <div>NotFound404
          <Link to={'/journal'} >Go To Home</Link>
    </div>
  )
}
