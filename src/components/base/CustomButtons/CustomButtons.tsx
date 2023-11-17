import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/system';

export const CustomButtonPrimary = styled(Button)<ButtonProps>(() => ({
  padding: '11px 24px',
  color: '#fff',
  backgroundColor: '#61b766',
  fontFamily: 'inherit',
  fontSize: 16,
  fontWeight: 500,
  textTransform: 'none',
  border: '1px solid #61b766',
  borderRadius: '12px',
  lineHeight: 1.3625,
  '&:hover': {
    color: '#61b766',
    borderColor: '#ecf5ed',
  },
  ':disabled': {
    backgroundColor: 'transparent',
  },
  height: 'inherit',
}));

export const CustomButtonSecondary = styled(Button)<ButtonProps>(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '11px',
  width: 46,
  height: 46,
  minWidth: 0,
  border: '1px solid #ecf5ed',
  borderRadius: '12px',
  '&:hover': {
    borderColor: '#ecf5ed',
  },
}));