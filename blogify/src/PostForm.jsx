import React, { useState } from 'react'
import { Axios } from 'axios'

const PostForm = () => {

    const url =""
    const [data, setData] = useState({
        name: "",
        date: "",
        iduser: ""
    })

    const changeHandler = (event) =>{
        // const target = event.target;
        // const name = target.name;
        // const value = target.value;

        // setData({
        //     [name]: value
        // })

        const newData = {...data}
        newData[event.target.id] = event.target.value
        setData(newData)
        console.log(newData); //test
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        Axios.post(url,{
            name: data.name,
            data: data.date,
            iduser: data.iduser
        })
    }

  return (  
    <div>
        <form onSubmit={submitHandler}> 
            <input onChange={changeHandler} type="text" name="name" value ={data.name} placeholder='enter name' />
            <input onChange={changeHandler} type="date" name="date" value ={data.date} placeholder='choose date' />
            <input onChange={changeHandler} type="number" name="iduser" value ={data.iduser} placeholder='enter user ID' />
            <button type="submit">Submit form</button>
        </form>
    </div>
  )
}

export default PostForm