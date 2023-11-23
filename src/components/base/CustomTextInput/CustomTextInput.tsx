import { TextField } from '@mui/material';
import React from 'react';

type Props = {
  value: string | number;
  placeholderText: string;
  onChangeValue: (val: string) => void;
};

export const CustomTextInput: React.FC<Props> = ({
  value,
  placeholderText,
  onChangeValue,
}) => {
  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      // placeholder="Enter distance..."
      placeholder={placeholderText}
      value={value !== '0' ? value : ''}
      onChange={(e) => onChangeValue(e.target.value)}
      type="text"
      sx={{
          fontFamily: 'Manrope, sans-serif',
        '& fieldset': {
          border: '1px solid #ECF5ED',
          borderRadius: '8px',
          transition: 'all .3s ease',
        },
        '& .MuiInputBase-root': {
          fontSize: 14,
          fontWeight: 500,
          color: '#61463A',
        },
        
        '& .MuiInputBase-root:hover fieldset': {
          borderColor: '#61B766',
        },
        '& .MuiInputBase-root.Mui-focused fieldset': {
          borderColor: '#61B766',
          borderWidth: 1,
        }
      }}
    />
  );
};
