import React, { useState } from "react";
import axios from 'axios'
import Button from "../../components/Button";
import "./BubbleForm.css";

import { Redirect, useParams } from 'react-router-dom'


function Upform() {
  const [imgData, setImgD] = useState('')
  const [upImg, setUp] = useState("")
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [caption, setCaption] = useState('')
  const [showUp, setShow] = useState(true)
  const [redirect, setRedirect] = useState(false)


  const { category } = useParams()




  ////// track change of file input and capture data
  const handleIChange = (event) => {
    console.log(event.target.files[0])
    setImgD(event.target.files[0])
  }
  ///////// handle form inputs and saves data for sending to db
  const handleDChange = (event) => {
    let name = event.target.id
    let val = event.target.value
    if (name === "name") {
      setName(val)
    }
    if (name === "title") {
      setTitle(val)
    }
    else if (name === "caption") {
      setCaption(val)
    }
  }
  const handlefile = (event) => {
    event.preventDefault()


    //################## package file info and send it back
    var formData = new FormData();
    formData.append('file', imgData);
    formData.append('name', name)
    formData.append('caption', caption)

    formData.append('category', category)



    /////// function for viewing form data
    for (var p of formData) {
      console.log(p);
    }
    axios.post('/api/bubble/imgup', formData).then((response) => {
      console.log(response)
      setUp(response.data)
      setRedirect(true)
    })
  }
  //////////add url caption and title to db
  const addPic = () => {
    const pObj = {
      title: title,
      url: upImg,
      caption: caption,
      category: window.location.search
    }
    console.log(pObj)


    axios.post('/api/bubble/dbpic', pObj).then(res => {
      console.log(res)
      setRedirect(true)
    })
  }
  return (
    <div>
      {redirect ? <Redirect push to={"/home/" + category} /> : <div></div>}
      {showUp ?
        <div className="row space">
          <div className="card col-md-6 mx-auto col-md-offset-3" style={{ marginTop: 20, borderRadius: "30px" }}>
            < div style={{ margin: 20 }}>
              <h1>Upload Image</h1>
              <p>Please select a photo from your computer</p>
              
                <label id="imgI">
                  <input type='file' accept="image/*" name="file" encType="multipart/form-data" onChange={handleIChange} />
                </label>
                <div className="card" style={{ margin: 10 }}>
                  <input id='name' name='name' type='text' placeholder="Title" value={name} onChange={handleDChange} /><br />
                  {/* <input id="imgI" type='file' accept="image/*" name="file" encType="multipart/form-data" onChange={handleIChange} /> */}
                  <input id='caption' name='caption' type='text' placeholder="Caption..." value={caption} onChange={handleDChange} /><br />
                </div>
                <div className="col-md-8 offset-md-2 text-center">
                  <Button className="btn btn-primary btn-block btn-md upload" id="upload" type='button' onClick={handlefile} style={{ margin: 10 }}>Upload</Button>
                </div>
                
            </div>
            </div>
          </div>:
            <>
          </>
        }
            {!showUp ?
            <div className="row space">
              <div className="col-xs-10 offset-xs-1 col-md-6 offset-md-3">
                <div className="card">
                  <input id='title' name='title' type='text' placeholder="Title" value={title} onChange={handleDChange} />

                  <img id="upImg" src={upImg} alt="parent" />

                  <textarea id='caption' name='caption' type='text' placeholder="Caption this" value={caption} onChange={handleDChange} />
                  <button id='addPic' onClick={addPic}>Add To Pictures</button>
                </div>
              </div>
            </div> :
            <></>
          }
        </div>
  )
}

export default Upform

  // /* font-family: 'Oswald', sans-serif; */
  // font-family: 'Caveat', cursive;
  // font-style: Bold;