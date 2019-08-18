import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
var apiBaseUrl = "https://greenbadgecorev1.azurewebsites.net/api/";
import axios from 'axios';
import Scanner from './Scanner';
class Login extends Component {
  constructor(props){
    super(props);
    var localloginComponent=[];
    localloginComponent.push(
    
    )
    this.state={
      username:'',
      password:'',
      loginComponent:localloginComponent
    }
  }
  componentWillMount(){
      var localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider key={"theme"}>
        <div>
         <TextField
           hintText="Enter User"
           floatingLabelText="User"
           onChange={(event,newValue) => this.setState({username:newValue})}
           />
         <br/>
           <TextField
             type="Password"
             hintText="Enter Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
      )
      this.setState({menuValue:2,loginComponent:localloginComponent})
    }

  handleClick(event){
    var self = this;
    var payload={
      "userName":this.state.username,
	    "password":this.state.password
    }
    axios.post(apiBaseUrl+'user/token', payload)
   .then(function (response) {
     console.log(response);
       var scanner=[];
       scanner.push(<Scanner appContext={self.props.appContext}/>)
       self.props.appContext.setState({loginPage:[],scanner:scanner})
     
   })
   .catch(function (error) {
     console.log(error);
   });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
        <AppBar
             title="Login"
           />
        </MuiThemeProvider>
        <MuiThemeProvider>
        </MuiThemeProvider>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
