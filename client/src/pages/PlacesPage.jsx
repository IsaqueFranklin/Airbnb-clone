import { useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import Perks from '../components/Perks';
import axios from 'axios';

export default function PlacesPage() {

    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }

    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
        setAddedPhotos(prev => {
            return [...prev, filename];
        })
        setPhotoLink('');
    }

    function uploadPhoto(ev) {
        ev.preventDefault();
        const files = ev.target.files
        
    }

    return (
        <div>
            {action !== 'new' && (
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/profile/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                    Add new place
                </Link>
            </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'Title for your place. Should be short and catchy.')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='For example: My lovely house.' />

                        {preInput('Address', 'Address to this place.')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder='Address' /> 

                        {preInput('Photos', 'Photos of your place. Should be pretty and catchy.')}
                        <div className='flex gap-2'>
                            <input value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} type='text' placeholder='Add using a link ... jpg' />
                            <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
                        </div>
                        
                        <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div>
                                    <img className='rounded-2xl' src={'http://localhost:4000/uploads/'+link} alt="" />
                                </div>
                            ))}
                            <label className='cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
                                <input type='file' className='hidden' onChange={uploadPhoto} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload
                            </label>
                        </div>

                        {preInput('Description', 'Description fo the place.')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} className='' />

                        {preInput('Perks', 'Select all the perks of your place.')}
                        
                        <div className='grid mt-2 gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                            <Perks selected={perks} onChange={setPerks} />
                        </div>

                        <div></div>

                        {preInput('Extra info', 'House rules, etc.')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                        {preInput('Check in&out times, max guests.', 'Check in and out times. Remember to have some window for cleaning the room between guests.')}
                        <div className='grid gap-2 sm:grid-cols-3'>
                            <div>
                                <h3 className='mt-2 -mb-1'>Check in time</h3>
                                <input value={checkIn} 
                                onChange={ev => setCheckIn(ev.target.value)} 
                                type='text' 
                                placeholder='14' />
                            </div>
                            <div>
                                <h3 className='mt-2 -mb-1'>Check out time</h3>
                                <input value={checkOut} 
                                onChange={ev => setCheckOut(ev.target.value)} 
                                type='text' 
                                placeholder='11' />
                            </div>
                            <div>
                                <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                                <input value={maxGuests} 
                                onChange={ev => setMaxGuests(ev.target.value)} 
                                type='number' />
                            </div>
                        </div>
                        <div className='mb-10'>
                            <button className='primary my-4 mb-20'>Save</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}