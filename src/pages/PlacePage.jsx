import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import AddressLink from '../components/AddressLink';

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) return;

    axios.get(`/places/${id}`).then(
      (response) => {
        setPlace(response.data);
      },
      (err) => {
        console.error(err);
      }
    );
  }, [id]);

  if (!place) return '';

  return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
      <h1 className='text-3xl'>{place.title}</h1>
      {/* Address */}
      <AddressLink>{place.address}</AddressLink>
      {/* Photos */}
      <PlaceGallery place={place} />
      {/* Info */}
      <div className='mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
        {/* check in check out */}
        <div>
          {/* Description */}
          <div className='my-4'>
            <h2 className='font-semibold text-2xl'>Decription</h2>
            {place.description}
          </div>
          {/* Description */}
          Check-in: {place.checkIn} <br />
          Check-Out: {place.checkout} <br />
          Max number of guests : {place.maxGuests}
        </div>
        {/* Extra Info + price */}
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className='bg-white -mx-8 px-8 py-8 border-t'>
        <div>
          <div className='bg-white'></div>
          <h2 className='mt-2 font-semibold text-2xl'>Extra Info</h2>
        </div>
        <div className='mb-4 mt-2 text-sm text-gray-700 leading-5'>
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};
export default PlacePage;
