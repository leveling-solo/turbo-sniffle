import React, { useState, useEffect } from 'react';

export default function Header(){
    const initalName = localStorage.getItem('userName')|| ''; 
    const[name, setName] = useState(initalName); 

    useEffect(()=>{
        localStorage.setItem('userName' , name) ;
    },[name])

    const handleNameChange = (event)=>{
        //update the name in state when the input changes
        setName(event.target.value)
    }
    return(
        <>
        <>
            <h1>TO DO List</h1>
        </>
        <div className="container">
         <div className="Heading">
            <h2>What's Up,</h2>
            <input
                type="text"
                placeholder="Name Here"
                onChange={handleNameChange}
                value={name}
            />
         </div>   
            <div className="secondHeading">
             <h3>Create A TODO</h3>
             <p>What's on your todo List?</p>
            </div>
        </div>
        </>
    )
}