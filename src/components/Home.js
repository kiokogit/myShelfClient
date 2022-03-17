import React from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import { Link } from 'react-router-dom'


export const Home = () => {

  return (
    <div>
      <div>
        Welcome Home
        <hr />
      </div>
      <ButtonGroup variant='contained'>
        <Button component={Link} to='/journal/' >Journal</Button>
        <Button component={Link} to='/bookshelf/' >Book Shelf</Button>
        <Button component={Link} to='/videoshelf/' >Videos Drawer</Button>
      </ButtonGroup>
    </div>
  )
};
