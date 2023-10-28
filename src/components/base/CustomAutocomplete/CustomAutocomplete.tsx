import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

type Props = {
  dataArray: string[];
  id: string;
  label?: string,
  onSelectValue: (value: string) => void;
};

export const CustomAutocomplete: React.FC<Props> = ({
  dataArray,
  id,
  onSelectValue,
  label,
}) => {

  const handleSelect = (e: React.SyntheticEvent, val: string | null) => {
    if (val) {
      onSelectValue(val);
    }
  }

  return (
    <Autocomplete
      disablePortal
      id={id}
      options={dataArray}
      sx={{
        width: '100%',
      }}
      onChange={handleSelect}
      disableClearable
      forcePopupIcon={false}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size="small"
          sx={{
            border: '1px solid #ECF5ED',
            borderRadius: '8px',
            '& fieldset': {
              border: 'none',
            },
            '& label': {
              padding: '0 5px',
              fontSize: '14px',
              color: '#61b766',
              backgroundColor: '#fff',
            },
            '& .MuiOutlinedInput-root': {
              padding: 0,
            },
            '& .MuiFormLabel-filled': {
              color: 'rgba(0, 0, 0, 0.6)',
            },
          }}
        />
      )}
    />
  );
};