import './Notes.css';
import React, { createRef, useEffect, useRef, useState } from 'react'

function Notes() {
    const inputRef = useRef();
    const notesRef = useRef([]);
    const [counter, setCounter] = useState(1);
    const [notes, setNotes] = useState(localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []);

    function getPosition() {
        const maxX = window.innerWidth - 250;
        const maxY = window.innerHeight - 250;

        return {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY)
        }
    }

    function handleOnClick() {
        if (!inputRef.current.value) return;

        let obj = {}
        obj.id = counter;
        obj.text = inputRef.current.value;
        obj.position = getPosition();
        setNotes((prev) => ([...prev, obj]));
        setCounter((prev) => prev + 1);
        inputRef.current.value = null;
    }

    useEffect(() => {
        if (notes.length) {
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }, [notes])

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleOnClick();
        }
    }

    function handleDragStart(e, note) {
        const noteRef = notesRef.current[note.id].current;
        const rect = noteRef.getBoundingClientRect();
        // console.log(e.clientX)
        // console.log(e.clientY)
        // console.log(rect);

        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        // It will determine the position of the not when we are dragging that
        const handleMouseMove = (event) => {
            const newX = event.clientX - offsetX;
            const newY = event.clientY - offsetY;

            noteRef.style.left = `${newX}px`;
            noteRef.style.top = `${newY}px`;
        }

        //It will check, when we leave note after the draging it has to stay in particular position
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            const finalRect = noteRef.getBoundingClientRect();
            const newPosition = { x: finalRect.left, y: finalRect.top };

            // Check for overlap
            if(false) {

            } else {
                const updatedNote = notes.map((mapNote) => mapNote.id===note.id ? {...mapNote, position: newPosition} : mapNote);
                setNotes(updatedNote);
                localStorage.setItem('notes', JSON.stringify(updatedNote));
            }
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    // TODO: below function
    function checkOverlap() {

    }

    return (
        <div className='container'>
            <div className='input-box'>
                <input ref={inputRef} onKeyDown={handleKeyDown} />
                <button onClick={handleOnClick} >Add Note</button>
                <button
                    onClick={() => {
                        localStorage.removeItem('notes');
                        setNotes([]);
                        setCounter(1)
                    }}>
                    Clear All Data
                </button>
            </div>
            <div className='notes'>
                {notes && notes?.map((note) => {
                    return (<div
                        style={{
                            backgroundColor: '#F5B027',
                            color: 'black',
                            border: '2px solid black',
                            position: 'absolute',
                            left: `${note.position.x}px`,
                            top: `${note.position.y}px`,
                            userSelect: 'none',
                            padding: '10px',
                            width: '200px',
                            cursor: 'move'
                        }}
                        ref={
                            notesRef.current[note.id]
                                ? notesRef.current[note.id]
                                : (notesRef.current[note.id] = createRef())}
                        onMouseDown={(e) => handleDragStart(e, note)}
                        key={note.id}
                        className={`note-${note.id}`}>
                        📌 {note.text}
                    </div>)
                })}
            </div>
        </div>
    )
}

export default Notes