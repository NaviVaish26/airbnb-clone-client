import { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const BookingWidget = ({ place }) => {
  const [checkIn, setcheckIn] = useState('');
  const [checkOut, setcheckOut] = useState('');
  const [guestNumb, setGuestNumb] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  let nights;

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (checkIn && checkOut) {
    nights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  const bookPlace = async (e) => {
    if (!nights) {
      alert('Update the days you want to book');
      return;
    }
    e.preventDefault();

    try {
      const { data } = await axios.post('/bookings', {
        checkIn,
        checkOut,
        name,
        phone,
        place: place._id,
        price: nights * place.price,
      });
      const bookingId = data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      if (!user) {
        console.log({ error });
        setRedirect('/login');
      }
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className='bg-white shadow p-4 rounded-2xl'>
      <div className='text-2xl text-center'>Price: €{place.price} /night</div>
      <div className='border rounded-2xl mt-4'>
        <div className='flex'>
          <div className='py-3 px-4'>
            <label>Check In: </label>
            <input
              type='date'
              value={checkIn}
              onChange={(e) => setcheckIn(e.target.value)}
            />
          </div>
          <div className='py-3 px-4 border-l'>
            <label>Check Out: </label>
            <input
              type='date'
              value={checkOut}
              onChange={(e) => setcheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className='py-3 px-4 border-t'>
          <label>Number of Guests </label>
          <input
            type='number'
            value={guestNumb}
            onChange={(e) => setGuestNumb(e.target.value)}
          />
        </div>
        {nights > 0 && (
          <div className='py-3 px-4 border-t'>
            <label>Your Full Name: </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email: </label>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Phone Number: </label>
            <input
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={bookPlace} className='primary mt-4'>
        Book{' '}
        {nights > 0 && (
          <>
            <span>€{nights * place.price} </span>
          </>
        )}
      </button>
    </div>
  );
};
export default BookingWidget;
