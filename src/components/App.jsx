import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export function App() {
  const [imageName, setImageName] = useState('');

  const handelSubmitForm = image => {
    setImageName(image);
  };
  return (
    <Box>
      <Searchbar onSubmit={handelSubmitForm} />
      <ImageGallery imageName={imageName} />
      <ToastContainer />
    </Box>
  );
}
