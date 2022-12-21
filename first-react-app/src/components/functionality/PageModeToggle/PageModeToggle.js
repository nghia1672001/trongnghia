import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: green[600],
    '&:hover': {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: green[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

export default function ColorSwitches({ theme, onTogglePress }) {

  const toggleDarkMode = () => {
    const newTheme= theme === 'light'?'dark':'light';
    onTogglePress(newTheme);
  };
  return (
    <div style={{ paddingTop: "12px" }} onClick={toggleDarkMode} >
      {
        theme==="dark"?
        <GreenSwitch {...label} defaultChecked />
        :
        <GreenSwitch {...label}  />
      }
    </div>
  );
}