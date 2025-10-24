'use client';

import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { createTraining } from '../../api';

export default function StartTrainingPage() {
  const router = useRouter();
  const [manualTime, setManualTime] = useState({ hours: '', minutes: '' });
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      setCategory(JSON.parse(savedCategory));
    }
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  const handleCancel = () => {
    router.push('/timer');
  };

  const handleTimeChange = (e, type) => {
    const value = e.target.value;
    
    // Only allow positive numbers or empty string
    if (value === '' || (parseInt(value) >= 0 && !value.includes('-'))) {
      setManualTime((prev) => ({ ...prev, [type]: value }));
    }
  };

  const handleSave = async () => {
    const hours = parseInt(manualTime.hours || '0');
    const minutes = parseInt(manualTime.minutes || '0');
    const totalMinutes = hours * 60 + minutes;

    if (isNaN(totalMinutes) || totalMinutes <= 0) {
      alert('Please enter a valid time');
      return;
    }

    try {
      const userId = localStorage.getItem('user_id');
      const categoryId = category?.id;
      const date = new Date().toISOString().split('T')[0];

      if (!userId || !categoryId) {
        alert('Missing user or category data');
        return;
      }

      const trainingData = {
        user_id: userId,
        category_id: categoryId,
        date: date,
        training_duration: totalMinutes,
      };

      await createTraining(trainingData);
      alert(`Training recorded: ${totalMinutes} min`);
      router.push('/usermain');
    } catch (error) {
      console.error('Error. Could not create training:', error);
      alert('Error. Could not save training.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fdf9f3] flex flex-col items-center justify-center px-4 pt-12 relative">
      {/* Back Button */}
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

      {/* Timer inputs */}
      <div className="flex gap-6 mt-20 mb-12">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          min="0"
          placeholder="0"
          value={manualTime.hours}
          onChange={(e) => handleTimeChange(e, 'hours')}
          className="w-28 h-20 text-3xl text-center border rounded-xl shadow"
        />
        <span className="text-4xl font-bold flex items-center justify-center">:</span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          min="0"
          placeholder="0"
          value={manualTime.minutes}
          onChange={(e) => handleTimeChange(e, 'minutes')}
          className="w-28 h-20 text-3xl text-center border rounded-xl shadow"
        />
      </div>

      {/* Buttons */}
      <Button
        variant="contained"
        onClick={handleSave}
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
        }}
      >
        Save
      </Button>

      <Button
        variant="outlined"
        onClick={handleCancel}
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
          marginBottom: '40px',
        }}
      >
        Cancel
      </Button>

      <style jsx global>{`
        /* Hide spinner buttons for number inputs */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}