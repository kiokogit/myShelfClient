import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

export const VideoShelf = () => {
  return (
      <div>
        <Button component={Link} to='/' >HOME</Button>
          VideoShelf
          <hr/>
          <div>
              <h3>Films</h3>
              <h3>Movies</h3>
              <h3>Documentaries</h3>
              <h3>Videos (longer than 25mins)</h3>
              <h3>Podcasts</h3>
        </div>
    </div>
  )
}
