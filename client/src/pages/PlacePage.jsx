import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

export default function PlacePage() {
    
    const {id} = useParams();
    const [place, setPlace] = useState(null);

    useEffect(()=> {
        if (!id) {
            return;
        };

        axios.get('/places/'+id).then(response => {
            setPlace(response.data);
        });
    }, [id])

    if (!place) return '';

    return (
        <div className='mt-4 px-6 py-8'>
            <h1 className='text-3xl'>{place.title}</h1>
            <a className='my-2 block font-semibold underline' target="_blank" href={'https://maps.google.com/?q='+place.address}>{place.address}</a>
            <div className='grid gap-2 grid-cols-[2fr_1fr]'>
                <div>
                    {place.photos?.[0] && (
                       <div>
                        <img className='aspect-square object-cover' src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt="" />
                       </div>
                    )}
                </div>
                <div className='grid'>
                        {place.photos?.[1] && (
                        <img className='aspect-square object-cover' src={'http://localhost:4000/uploads/'+place.photos?.[1]} alt="" /> 
                        )}
                    
                    <div className='overflow-hidden'>
                        {place.photos?.[2] && (
                        <img className='aspect-square object-cover relative top-2' src={'http://localhost:4000/uploads/'+place.photos?.[2]} alt="" /> 
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}