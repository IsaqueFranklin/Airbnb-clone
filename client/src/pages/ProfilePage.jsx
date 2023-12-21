import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProfilePage() {

    const [redirect, setRedirect] = useState(null);

    const {ready, user, setUser} = useContext(UserContext);

    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    };

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }


    function linkClasses (type=null) {
        let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';
        if (type === subpage) {
          classes += ' bg-primary text-white';
        } else {
          classes += ' bg-gray-200';
        }
        return classes;
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link className={linkClasses('profile')} to={'/profile'}>My profile</Link>
                <Link className={linkClasses('bookings')} to={'/profile/bookings'}>My bookings</Link>
                <Link className={linkClasses('places')} to={'/profile/places'}>My accommodations</Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br/>
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
        </div>
    )
}