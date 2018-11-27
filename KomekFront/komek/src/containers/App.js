import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MainPage from './Main'
import {
	blue700,
	cyan500,
	blueA700,
} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#2CACBD',
    primary2Color: '#03333C',
    accent1Color: '#2CACBD',
  },
});

class App extends Component {
  render() {
    return (
    	<MuiThemeProvider muiTheme={muiTheme}>
    		<MainPage />
    	</MuiThemeProvider>
    )
  }
}

export default App;
