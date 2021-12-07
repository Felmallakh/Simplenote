import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotes } from '../../store/notes'
// import './HomePage.css'

function HomePage() {
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes)
    const [showModal, setShowModal] = useState(false);
    const userNotes = Object.values(notes);
    // console.log(sessionUser);
    const dispatch = useDispatch();
    useEffect(() => {
        if(sessionUser) dispatch(getNotes(sessionUser));
        else return;
    }, [dispatch, sessionUser]);

    if (sessionUser) {
        return (
        <div id="container">
            <h1>Welcome, {sessionUser.firstName} {sessionUser.lastName}</h1>
            <h2>My Notes</h2>
            <div id="notes-container">
                {userNotes.map(note => {
                    return (
                        <div class="note">
                            <h3>
                                {note.name}
                            </h3>
                            <p>
                                {note.content}
                                {note.updatedAt}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
        );
    }
}


export default HomePage;
