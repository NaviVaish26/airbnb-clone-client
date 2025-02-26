import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import axios from 'axios';
import PlaceImg from '../components/PlaceImg';

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places/user').then(
      ({ data }) => {
        setPlaces(data);
      },
      (err) => {
        console.error('PlacesPage', err);
      }
    );
  }, []);
  return (
    <div>
      <AccountNav />
      <div className='text-center'>
        <br />
        <Link
          className='inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full'
          to={'/account/places/new'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-6 h-6'
          >
            <path
              fillRule='evenodd'
              d='M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z'
              clipRule='evenodd'
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className='mt-4'>
        {places?.length > 0 &&
          places?.map((place) => {
            return (
              <Link
                to={'/account/places/' + place._id}
                className='flex cursor-pointer gap-4 bg-gray-100 p-4 my-1 rounded-2xl '
                key={place._id}
              >
                <div className='flex w-32 h-32 bg-gray-300 grow shrink-0 '>
                  <PlaceImg place={place} />
                </div>
                <div className='grow-0 shrink'>
                  <h2 className='text-xl'>{place.title}</h2>
                  <p className='text-sm mt-2'>{place.description}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
export default PlacesPage;
