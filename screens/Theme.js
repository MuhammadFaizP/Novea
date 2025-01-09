import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#0056b3", // Blue
      accent: "#ffffff", // White
      background: "#f0f0f0", // Light Gray
      surface: "#ffffff", // White
      text: "#333333", // Dark Gray
      disabled: "#bdbdbd", // Light Gray
    },
  };

export default theme;
