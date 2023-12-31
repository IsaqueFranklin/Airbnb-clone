import {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import Perks from '../components/Perks';
import PhotosUploader from '../components/PhotosUploader';
import ProfileNav from '../components/ProfileNav';
import axios from 'axios';

export default function PlacesFormPage() {

    const {id} = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id]);

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

    async function savePlace(ev) {
        ev.preventDefault();

        const placeData = {
            title, address, addedPhotos, 
            description, perks, extraInfo, 
            checkIn,checkOut, maxGuests, price,
        }

        if (id) {
            //update
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true);
        } else {
            //Add new place
            await axios.post('/places', {
                ...placeData
            });
            setRedirect(true);
        }
    }

    if(redirect) {
        return <Navigate to={'/profile/places'} />
    }
    
    return (
        <div>
            <ProfileNav />
                    <form onSubmit={savePlace}>
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
                        <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-4'>
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
                            <div>
                                <h3 className='mt-2 -mb-1'>Price per night</h3>
                                <input value={price} 
                                onChange={ev => setPrice(ev.target.value)} 
                                type='number' />
                            </div>
                        </div>
                        <div className='mb-10'>
                            <button className='primary my-4 mb-20'>Save</button>
                        </div>
                    </form>
                </div>
    )
}