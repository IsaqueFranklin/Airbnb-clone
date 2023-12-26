import { useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import Perks from '../components/Perks';
import axios from 'axios';
import PhotosUploader from '../components/PhotosUploader';

export default function PlacesPage() {

    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirectToPlacesList, setRedirectToPlacesList] = useState(false);

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

    async function addNewPlace(ev) {
        ev.preventDefault();
        await axios.post('/places', {
            title, address, addedPhotos, 
            description, perks, extraInfo, 
            checkIn,checkOut, maxGuests
        });
        setRedirectToPlacesList(true);
    }

    if (redirectToPlacesList && !action) {
        return <Navigate to={'/profile/places'} />
    };


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
                    <form onSubmit={addNewPlace}>
                        {preInput('Title', 'Title for your place. Should be short and catchy.')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='For example: My lovely house.' />

                        {preInput('Address', 'Address to this place.')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder='Address' /> 

                        {preInput('Photos', 'Photos of your place. Should be pretty and catchy.')}
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                        
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