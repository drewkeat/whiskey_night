'use client'
import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#4f8b9b',
    },
    secondary: {
      main: '#5E6DAA',
    },
    error: {
      main: '#f44336',
    },
  },
  /*typography: {
    fontFamily: 'Roboto',
  },*/
};



let theme = createTheme(themeOptions)
theme = responsiveFontSizes(theme)

export {theme}
