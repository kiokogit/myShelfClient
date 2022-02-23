import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addBook, delBook, editBook, getBooks, newComment, getComments } from '../actions/booksshelf'
import { Button,Card,Paper,TextField} from '@material-ui/core'
import FileBase from 'react-file-base64'

import moment from 'moment'

export const BookShelf = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getComments())
    }, [dispatch])

    const books = useSelector(state => state.books);
    const comments = useSelector(state => state.comments);
    const readingList = books.filter(book => book.reading_ongoing === true)

    const [draw, setDraw] = useState('home')
    
    //edit reading details, such as like, start reading, etc
    const editReading = (e, id, book, msg) => {
        e.preventDefault();
        if (window.confirm(`Would you like to ${msg} this book?`)) {
            dispatch(editBook(id, book));
            dispatch(getBooks())
        } else alert('Cancelled')
    }

    const handleDelete = (e, id) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(delBook(id))
            dispatch(getBooks())
        }else alert('Not deleted')
    }

    const addComment = (e, id, body) => {
        e.preventDefault();
        dispatch(newComment(id, body));
        document.getElementById('reviewbody').value=''
        dispatch(getComments());
    }

    //render
    return (
        <div>
        <Button component={Link} to='/' >HOME</Button>
            BookShelf
          <hr/>
            <div>
                <h3>Books
                    {draw === 'home' ?
                        <Button onClick={() => setDraw('addnew')}>Add</Button> :
                        <Button onClick={() => setDraw('home')} >Cancel</Button>} </h3>
                <hr/>
                <hr/>
                    {draw === 'addnew' && <AddBook setDraw={setDraw} />}
                {books.length < 1 ? 'No Books Available' : books.map(book =>
                    <div key={book.id}>
                        <h4>{book.title}</h4>
                        <div>
                            {book.author}
                        </div>
                        {!book.reading_ongoing ?
                            <Button onClick={(e) => handleDelete(e, book.id)}>Delete</Button> : null}
                        {!book.reading_ongoing ?
                            <Button onClick={(e) => editReading(e, book.id, { ...book, reading_ongoing: true }, 'Start Reading')}>Add to Reading List</Button>
                            : <p>You are Currently Reading this book</p>}
                        <hr />
                    </div>
                )}
                <div>
                    {draw === 'home' && <ReadingList readingList={readingList} editReading={editReading} addComment={addComment} comments={comments} />}
                </div>
            </div>
        </div>
    )
};

const AddBook = ({setDraw}) => {
    const dispatch = useDispatch();
    const [book, setBook] = useState({});

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(addBook(book))
        dispatch(getBooks())
        setDraw('home')
    }
    return (
        <Paper style={{width:500}}>
            Add Book
            <TextField required fullWidth size='small' label='Title' onChange={(e)=>setBook({...book, title:e.target.value})}/>
            <TextField required fullWidth size='small' label='Author' onChange={(e)=>setBook({...book, author:e.target.value})} />
            <TextField required fullWidth size='small' label='No of Pages' onChange={(e)=>setBook({...book, pages:e.target.value})} />
            <TextField fullWidth size='small' label='Format' onChange={(e) => setBook({ ...book, format: e.target.value })} />
            <div>Upload Book Cover Image</div>
            <FileBase type='file' multiple={false}   onDone={({base64})=> setBook({...book, cover:base64})} />
            <Button onClick={(e) => handleSave(e)} >Save</Button>
            
        </Paper>
    )
}

const ReadingList = ({ readingList, editReading, addComment, comments }) => {

    const [read, setRead] = useState(false);

    return (
        <div>
            <h4>Reading List</h4>
            {readingList?.length < 1 ? <div>Not reading anything?</div> : readingList?.map(book =>
                <Card style={{ width: 300, padding: 25 }} key={book.id}>
                    <div>
                        <h5>{book.title}</h5>
                        <div>{book.author}</div>
                        <div>{Math.floor(book.reading_progress * 100 / book.pages)}% read so far at page {book.reading_progress} of {book.pages}</div>
                        <div>Record a new reading <button onClick={(e) => {
                            e.preventDefault();
                            setRead(true)
                        }}>here</button></div>
                        {!read ? null : <div>
                            Enter the last Page Read
                            <TextField required id='lastreadpage' label='Page...' type='number' max={book.pages} min={book.reading_progress} />
                            <Button onClick={(e) => {
                                editReading(e, book.id, { ...book, reading_progress: document.getElementById('lastreadpage').value }, 'Record a new Read for');
                                setRead(false);
                            }}>Save</Button>
                            <Button onClick={(e) => setRead(false)}>Cancel</Button>
                        </div>}
                        <Button onClick={(e) => editReading(e, book.id, { ...book, liked: true, disliked: false }, 'Like')} >{book.liked ? 'Liked' : 'Like'}</Button>
                        <Button onClick={(e) => editReading(e, book.id, { ...book, liked: false, disliked: true }, 'Dislike')} >{book.disliked ? 'Disliked' : 'Dislike'}</Button>
                        <Button onClick={(e) => editReading(e, book.id, { ...book, reading_ongoing: false, reading_progress:0 }, 'Stop Reading')}>Close</Button>
                    </div>
                    <div>
                        <h4>Reviews</h4>
                        <p>Leave a Comment/Review</p>
                        <TextField required fullWidth multiline={true} id='reviewbody' label='Comment' />
                        <Button onClick={(e) => addComment(e, book.id, { 'body': document.getElementById('reviewbody').value })}>Save</Button>
                        <div>Previous Comments {comments.filter(comment => comment.book.id === book.id)?.length}</div>
                        {comments.filter(comment => comment.book.id === book.id)?.map(comment => <div key={comment.id}>
                            <div>{moment(comment.date).fromNow()}</div>
                            <div>{comment.body}</div>
                        </div>)}
                    </div>
                </Card>
            )}
        </div>
    );
};
