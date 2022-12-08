import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { useEffect, useState } from 'react';
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

export default function ColorSwitches() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark' ? true : false);
    useEffect(() => {
        if (darkMode) {
          document.body.classList.add('dark-mode');
          localStorage.setItem('theme', 'dark');
        } else {
          document.body.classList.remove('dark-mode');
          localStorage.setItem('theme', 'light');
        }
      }, [darkMode]);
    
      const toggleDarkMode = () => {
        setDarkMode(!darkMode);
      };
  return (
    <div style = {{paddingTop: "12px"}} onClick={toggleDarkMode} >
      <GreenSwitch {...label} defaultChecked />
    </div>
  );
}