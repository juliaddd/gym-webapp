'use client';
import { useRouter } from 'next/navigation';
import { Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function StartTrainingPage() {
  const router = useRouter();
  const [category, setCategory] = useState(null);
  
  useEffect(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      setCategory(JSON.parse(savedCategory));
    }
  }, []);

  const handleManualEntry = () => {
    router.push('/timer_manual');
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleStartClick = () => {
    router.push('/timer_on');
  };

   
  
 return (
    <div className="min-h-screen w-full bg-[#fdf9f3] flex flex-col items-center justify-center px-4 pt-12 relative">
      {/* Back button */}
      <button
        onClick={handleBackClick}
        className="absolute top-4 left-4 text-gray-600"
      >
        <ArrowBackIcon />
      </button>
      {/* Category title */}
    {category && (
       <Typography
       variant="h4"
       component="h1"
       sx={{
         fontWeight: 600,
         position: 'absolute',
         top: '20px',
         textAlign: 'center',
       }}
     >
       {category.title}
     </Typography>
   )}
      {/* Timer Icon */}
      <Image
        src="/images/timericon.png"
        alt="Timer"
        width={140}
        height={140}
        className="mb-10"
      />

      {/* Start Button */}
      <Button
        variant="contained"
        onClick={handleStartClick}
        fullWidth
        sx={{
          maxWidth: '300px',
          backgroundColor: '#2CB5A0',
          borderRadius: '9999px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          paddingY: '10px',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#239a89',
            boxShadow: 'none',
          },
          marginBottom: '20px',
          marginTop: '30px',
        }}
      >
        Start
      </Button>

      {/* Manual Entry Button */}
      <Button
        variant="outlined"
        onClick={handleManualEntry}
        fullWidth
        sx={{
          maxWidth: '300px',
          borderRadius: '9999px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          paddingY: '10px',
          borderColor: '#B0B0B0',
          color: '#444',
          '&:hover': {
            borderColor: '#999',
            backgroundColor: '#f9f9f9',
          },
        }}
      >
        Enter manually
      </Button>
    </div>
  );
}
