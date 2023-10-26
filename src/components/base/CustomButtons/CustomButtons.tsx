import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/system';

export const CustomButtonPrimary = styled(Button)<ButtonProps>(() => ({
  padding: '12px 24px',
  color: '#fff',
  backgroundColor: '#61b766',
  fontFamily: 'inherit',
  textTransform: 'none',
  border: '1px solid #61b766',
  borderRadius: '12px',
  '&:hover': {
    color: '#61b766',
    borderColor: '#ecf5ed',
  },
  ':disabled': {
    backgroundColor: 'transparent',
  }
}));

export const CustomButtonSecondary = styled(Button)<ButtonProps>(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '11px',
  width: 'min-content',
  height: 'min-content',
  minWidth: 0,
  border: '1px solid #ecf5ed',
  borderRadius: '12px',
  '&:hover': {
    borderColor: '#ecf5ed',
  },
}));