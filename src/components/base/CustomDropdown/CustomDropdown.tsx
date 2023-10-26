import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

type Props = {
  dataArray: string[];
  id: string;
  label?: string,
  onSelectValue: (value: string) => void;
};

export const CustomDropdown: React.FC<Props> = ({
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
          sx={{
            border: '1px solid #ECF5ED',
            borderRadius: '8px',
            '& fieldset': {
              border: 'none',
            },
            '& label': {
              color: '#61b766',
              backgroundColor: '#fff',
              padding: '0 5px'
            },
            '& .MuiFormLabel-filled': {
              color: 'rgba(0, 0, 0, 0.6)',
            }
          }}
        />
      )}
    />
  );
};
