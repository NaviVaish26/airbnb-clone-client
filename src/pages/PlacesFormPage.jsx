import { useEffect, useState } from 'react';
import PhotosUploader from '../components/PhotosUploader';
import Perks from '../components/Perks';
import axios from 'axios';
import AccountNav from '../components/AccountNav';
import { Navigate, useParams } from 'react-router-dom';

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState(12);
  const [checkout, setCheckout] = useState(12);
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get('/places/' + id).then(
      (resp) => {
        const { data } = resp;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckout(data.checkout);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      },
      (err) => {
        console.error(err);
      }
    );
  }, [id]);

  const saveNewPlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkout,
      maxGuests,
      price,
    };
    if (id) {
      //update
      await axios.put('/places', { id, ...placeData });
      setRedirect(true);
    } else {
      //save new
      await axios.post('/places', placeData);
      setRedirect(true);
    }
  };

  const inputHeader = (text) => {
    return <h2 className='text-2xl mt-4'>{text}</h2>;
  };

  const inputDescription = (text) => {
    return <p className='text-gray-500 text-sm'>{text}</p>;
  };

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  return (
    <>
      <AccountNav />
      <div>
        <form onSubmit={saveNewPlace}>
          {preInput(
            'Title',
            'Title for your place should be short and catchy.'
          )}
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='title, for example : My lovely apartment'
          />
          {preInput('Address', 'Address to this place.')}
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='address'
          />
          {preInput('Photos', 'more = better')}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          {preInput('Description', 'description of the area')}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {preInput('Perks', 'Select all the perks of your place')}
          <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
            <Perks selected={perks} onChange={setPerks} />
          </div>
          {preInput('Extra Info', 'House rules etc')}
          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />
          {preInput(
            'Check in Check out times',
            'Add check in -out times , remember to have some time window for cleaning the room between guests'
          )}

          <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
            <div>
              <h3 className='mt-2 -mb-1'>Check in time</h3>
              <input
                type='number'
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                placeholder='14:00'
              />
            </div>
            <div>
              <h3 className='mt-2 -mb-1'>Checkout time</h3>
              <input
                type='number'
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
                placeholder='11:00'
              />
            </div>
            <div>
              <h3 className='mt-2 -mb-1'>Max number of guests</h3>
              <input
                type='number'
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
                placeholder='3'
              />
            </div>
            <div>
              <h3 className='mt-2 -mb-1'>Price per night</h3>
              <input
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <button className='primary my-4'>Save</button>
        </form>
      </div>
    </>
  );
};
export default PlacesFormPage;
