import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: { main: "#ffffff" },
    secondary: { main: "#3070b3" },
  },
  status: {
    danger: 'orange',
  },
});

export default theme;