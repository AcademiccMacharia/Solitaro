import React, { useState } from 'react';
import './settings.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import man1 from '../../assets/man1.jpg';

const EditProfile = () => {

    const [bio, setBio] = useState('');

    const handleBioChange = (value) => {
        setBio(value);
    };

    const charactersLeft = 500 - bio.length;
    const allowEditing = charactersLeft >= 0;



    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
    ];


    return (
        <div className='edit-profile'>
            <div className='edit-header'>
                <div className='edit-header-left'>
                    <img src={man1} alt='man1' />
                    <div className='edit-header-text'>
                        <h3>Profile</h3>
                        <p>Update your profile photo and personal details.</p>
                    </div>
                </div>
                <div className='edit-header-right'>
                    <button className='social-btn'>Cancel</button>
                    <button className='social-btn'>Save</button>
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
                        <img src={man1} alt='man' />
                        <div className='edit-field-btn'>
                            <button className='social-btn'>Upload</button>
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
                    <ReactQuill
                        value={bio}
                        onChange={handleBioChange}
                        modules={modules}
                        formats={formats}
                        readOnly={!allowEditing}
                        className='quill-editor'
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile