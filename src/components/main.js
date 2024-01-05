import React, { useState, useEffect, useRef } from 'react';

export default function Main() {

    const initalState = JSON.parse(localStorage.getItem('todoState')) || {

        inputTask: '',
        category: '',
        isEditing: false,
        todos: [],
        circleColors: {}, // Maintain a map of circle colors for each index
    }
    const [state, setState] = useState(initalState);

    //save the local storage whever it changes 
    useEffect(() => {
        localStorage.setItem('todoState', JSON.stringify(state));
    }, [state])

    function change(event, index) {

        const { name, value, type, checked } = event.target;
        setState((state) => {
            const updatedTodos = state.todos.map((todo, i) => ({
                ...todo,
                isEditing: i === index ? true : todo.isEditing,
                text: i === index && type !== 'checkbox' ? value : todo.text,
            }));

            return {
                ...state,
                [name]: type === 'checkbox' ? checked : value,
                todos: updatedTodos,
            };
        });
    }

    function submit(event) {
        event.preventDefault();
        const newTodo = {
            text: state.inputTask,
            category: state.category,
            isEditing: false,
        };

        const newCircleColor = state.category === 'business' ? 'blue' : 'orange';

        setState((state) => ({
            ...state,
            inputTask: '',
            category: '',
            circleColors: {
                ...state.circleColors,
                [state.todos.length]: newCircleColor,
            },
            todos: [...state.todos, newTodo],
        }));
    }


    function deleteTodo(index) {
        setState((state) => {
            const { circleColors, todos } = state;
            const updatedCircleColors = { ...circleColors };
            delete updatedCircleColors[index];

            return {
                ...state,
                todos: todos.filter((_, i) => i !== index),
                circleColors: updatedCircleColors,
            };
        });
    }


    const inputRef = useRef(null);


    function toggleEditing(index) {
        setState((state) => ({
            ...state,
            todos: state.todos.map((todo, i) => ({
                ...todo,
                isEditing: i === index ? !todo.isEditing : todo.isEditing,
            })),
        }));

    }

    function handleEditDone(index) {
        setState((state) => {
            const editedText = state.todos[index].text;
            const updatedTodos = state.todos.map((todo, i) => ({
                ...todo,
                isEditing: i === index ? false : todo.isEditing,
                text: i === index ? editedText : todo.text,
            }));

            return {
                ...state,
                todos: updatedTodos,
            };
        });
    }


    function toggleTextDecoration(index) {
        setState((state) => {
            const updatedTodos = state.todos.map((todo, i) => ({
                ...todo,
                textDecorated: i === index ? !todo.textDecorated : todo.textDecorated,
            }));

            const newCircleColor = updatedTodos[index].textDecorated
                ? 'black'
                : state.todos[index].category === 'business'
                    ? 'blue'
                    : 'orange';

            return {
                ...state,
                todos: updatedTodos,
                circleColors: {
                    ...state.circleColors,
                    [index]: newCircleColor,
                },
            };
        });
    }


    return (
        <div className='Main-section'>
            <form onSubmit={submit}>
                <div className='Input-task'>
                    <input
                        type='text'
                        placeholder='eg. i have an exam tomorrow'
                        name='inputTask'
                        onChange={(e) => setState({ ...state, inputTask: e.target.value })}
                        value={state.inputTask}
                    />
                </div>
                <p className='p'>Pick a category</p>
                <div className='category'>
                    <div className='Business'>
                        <input
                            type='radio'
                            id='business'
                            name='category'
                            onChange={change}
                            checked={state.category === 'business'}
                            value='business'
                        />
                        <label htmlFor='business'>Business</label>
                    </div>
                    <div className='personal'>
                        <input
                            type='radio'
                            id='personal'
                            name='category'
                            onChange={change}
                            checked={state.category === 'personal'}
                            value='personal'
                        />
                        <label htmlFor='personal'>Personal</label>
                    </div>
                </div>
                <button>Add Todo</button>
            </form>
            <h3 className='todo'>TODO LIST</h3>
            <div>
                {state.todos.map((todo, index) => (
                    <div
                        key={index}
                        className='task-element'
                        style={{ backgroundColor: todo.category === 'business' ? 'blue' : 'orange',
                        color : 'white'
                         }}
                    >
                        <div className='input'>
                            <div
                                className='circle'
                                onClick={() => toggleTextDecoration(index)}
                                style={{ backgroundColor: state.circleColors[index] }}
                            ></div>

                            {todo.isEditing ? (
                                <input
                                    type='text'
                                    value={state.todos[index].text}

                                    onChange={(e) => change(e, index)}
                                    className='FormInput'
                                    style={{
                                        
                                        padding: "1rem",
                                        fontSize: "1.3rem",
                                        fontFamily: "Cinzel",
                                        outline: "none",
                                        border: "none",
                                        textIndent: "0.3rem",
                                        fontWeight: "bolder",
                                        width: "100%",
                                        height : "auto", 
                                        wordBreak: "break-word"

                                    }}
                                    ref={inputRef}
                                />
                            ) : (
                                <p style={{ textDecoration: todo.textDecorated ? 'line-through' : 'none' }}>
                                    {todo.text}
                                </p>
                            )}
                        </div>
                        <div className='btn'>
                            {todo.isEditing ? (
                                <>
                                    <button className='done-btn' onClick={() => handleEditDone(index)}>
                                        Done
                                    </button>
                                </>
                            ) : (
                                <>
                                    {todo.textDecorated ? (
                                        <button className='completed-btn' onClick={() => deleteTodo(index)}>
                                            Completed
                                        </button>
                                    ) : (
                                        <>
                                            <button className='Edit-btn' onClick={() => toggleEditing(index)}>
                                                Edit
                                            </button>
                                            <button className='delete-btn' onClick={() => deleteTodo(index)}>
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
