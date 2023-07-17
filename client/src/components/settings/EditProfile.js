import React, { useState } from 'react';
import './settings.css';
import axios from 'axios';
import TextEditor from './TextEditor';
import man1 from '../../assets/man1.jpg';

const EditProfile = () => {

    const [image, setImage] = useState(man1);
    const [url, setUrl] = useState('');
    const [bio, setBio] = useState('');
    const [charactersLeft, setCharactersLeft] = useState(500);

    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "solitaro")
        data.append("cloud_name", "dyqny6kxs")

        fetch("https://api.cloudinary.com/v1_1/dyqny6kxs/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url)
                console.log(data)
                alert(`Your Image has been uploaded successfully!`)
            })
            .catch(err => console.log(err))
    }


    const updateProfile = async () => {
        const data = {
            bio: bio,
            dpUrl: url
        }
        const response = await axios.put('http://localhost:5000/updateprofile', data, { withCredentials: true });
        console.log(response)
        try {
            if (response.data.success) {
                alert(response.data.message)
            }
        } catch (err) {
            alert(err)
        }
    };

    const handleBioChange = (value) => {
        setBio(value);
        const remainingChars = 500 - value.length;
        setCharactersLeft(remainingChars);
    };


    return (
        <div className='edit-profile'>
            <div className='edit-header'>
                <div className='edit-header-left'>
                    <img src={url} alt='man1' />
                    <div className='edit-header-text'>
                        <h3>Profile</h3>
                        <p>Update your profile photo and personal details.</p>
                    </div>
                </div>
                <div className='edit-header-right'>
                    <button className='social-btn'>Cancel</button>
                    <button className='social-btn' onClick={updateProfile}>Save</button>
                </div>
            </div>
            <div className='edit-body'>
                <div className='edit-field'>
                    <h3>Username</h3>
                    <input type='text' id='name' placeholder='Username' />
                </div>
                <div className='edit-field'>
                    <div className='edit-field-text'>
                        <h3>Your Photo</h3>
                        <p>Upload a photo of yourself.</p>
                    </div>
                    <div className='edit-field-input'>
                        <img src={url} alt='man1' />
                        <div className='edit-field-btn'>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
                            <button className="social-btn" onClick={uploadImage}>Upload</button>
                            <button className='social-btn'>Remove</button>
                        </div>
                    </div>
                </div>
                <div className='bio-field'>
                    <h3>Bio</h3>
                    <div className='bio-editor'>
                        <span className={charactersLeft < 0 ? 'characters-limit-exceeded' : ''}>
                            {charactersLeft >= 0 ? charactersLeft : 0} characters left
                        </span>
                        <TextEditor
                            value={bio}
                            onChange={handleBioChange}
                            maxLength={500}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile