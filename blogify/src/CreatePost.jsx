import React from 'react'
import { useState } from 'react'

const CreatePost = () => {

    const [state, setState] = useState({
        name: "",
        text: ""
    })

    const changeHandler = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        setState({
            [name]: value
        })
    }

  return (
    <div className='create-post-div'>
        <form action="/createpost" className='input-form'>
            <input type="text" name = "name" value={state.name} className = "name-input" onChange={changeHandler} />
            <br />
            <textarea name="text" value={state.text} className = "text-input" onChange = {changeHandler} cols="30" rows="10"></textarea>
            <br />
            <button type="submit" onSubmit={2}>Create Post</button>
        </form>
    </div>
  )
}

export default CreatePost