import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: { main: "#ffffff", contrastText: "#000000" },
    secondary: { main: "#3070b3", contrastText: "#ffffff" },
  },
  status: {
    danger: 'orange',
  },
});

export default theme;