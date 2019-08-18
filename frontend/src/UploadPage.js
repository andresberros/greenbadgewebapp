import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import UploadScreen from './UploadScreen';
import Pastfiles from './Pastfiles';
import LoginScreen from './Loginscreen';
import Scanner from './Scanner';
import Result from './Result';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {draweropen: false,currentScreen:[], scanning: false, results: []};
  }
  componentDidMount(){
    var currentScreen=[];
    currentScreen.push(<UploadScreen appContext={this.props.appContext} role={this.props.role}/>);
    this.setState({currentScreen})
  }
  /**
   * Toggle opening and closing of drawer
   * @param {*} event 
   */ 
  toggleDrawer(event){
  // console.log("drawer click");
  
  this.setState({draweropen: !this.state.draweropen, scanning: false, results: []})
  }
  handleMenuClick(event,page){
    switch(page){
      case "openprint":
      // console.log("need to open uploadapge")
      var currentScreen=[];
      currentScreen.push(<UploadScreen appContext={this.props.appContext} role={this.props.role}/>);
      this.setState({currentScreen})
      break;
      case "openpast":
      // console.log("need to open pastfiles")
      var currentScreen=[];
      currentScreen.push(<Pastfiles appContext={this.props.appContext} role={this.props.role}/>);
      this.setState({currentScreen})
      break;
      case "logout":
      var loginPage =[];
      loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
      this.props.appContext.setState({loginPage:loginPage,uploadScreen:[]})
      break;
    }
    this.setState({draweropen:false})
  }
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar
            title="Printing Page"
            onLeftIconButtonTouchTap={(event) => this.toggleDrawer(event)}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
   
        </MuiThemeProvider>
        <div>
          {this.state.currentScreen}
        </div>
      </div>
    );
  }

  _scan() {
    this.setState({scanning: !this.state.scanning});
}

_onDetected(result) {
    this.setState({results: this.state.results.concat([result])});
}
}

export default App;
