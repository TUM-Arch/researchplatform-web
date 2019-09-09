import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: { main: "#ffffff" },
    secondary: { main: "#0065bd" },
  },
  status: {
    danger: 'orange',
  },
});

export default theme;