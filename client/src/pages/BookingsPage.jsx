import { useEffect, useState } from "react";
import ProfileNav from "../components/ProfileNav";
import axios from 'axios';

export default function BookingsPage(){

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data)
        }) 
    }, []);

    return (
        <div>
            <ProfileNav />
            <div>
                {bookings?.length > 0 && bookings.map(booking => (
                    <div key={booking}> 
                        {booking.checkIn} to {booking.checkOut}
                        <h2>{booking.price}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}