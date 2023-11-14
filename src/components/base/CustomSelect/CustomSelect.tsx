import { FormControl, MenuItem, Select } from '@mui/material';
import React from 'react';

type Props = {
  values: string[];
  selectedValue: string;
  onSelectValue: (val: string) => void;
};

export const CustomSelect: React.FC<Props> = ({
  values,
  selectedValue,
  onSelectValue,
}) => {
  return (
    <FormControl fullWidth size="small">
      <Select
        value={selectedValue}
        inputProps={{ 'aria-label': 'Without label' }}
        onChange={e => onSelectValue(e.target.value)}
        sx={{
            fontFamily: 'Manrope',
          '& .MuiSelect-select': {
            height: '1.4375em !important',
            color: '#61463A',
            fontSize: 14,
            fontWeight: 500,
            textAlign: 'left',
          },

          '& fieldset': {
            border: '1px solid #ECF5ED',
            borderRadius: '8px',
            transition: 'all .3s ease',
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#61B766',
            borderWidth: 1,
          },

          '& .MuiInputBase-input:hover ~ fieldset': {
            borderColor: '#61B766',
          },
        }}
      >
        {values.map(value => (
          <MenuItem
            value={value}
            key={value}
          >
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
