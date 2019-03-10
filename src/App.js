import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from 'react-particles-js';
import Signin from "./components/Signin/Signin";
import Register from './components/Register/Register';
const initialState = {
  input: '',
  imgUrl: '',
  box: {},
  route: 'signin',
  signedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: '',
  }
}
class App extends Component {
  state = initialState;
  loadUser=(data)=>{
    this.setState({
      user:{
        id:data.id,
        name:data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    })
  }
  faceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('image');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }
  onInputChange=(event)=>{
      this.setState({input:event.target.value})
  }
  onSubmitButton=()=>{
    this.setState({imgUrl:this.state.input})
    fetch('https://mighty-ocean-60928.herokuapp.com/imageurl', {
      'method': 'post',
      'headers': { 'Content-Type': 'application/json' },
      'body': JSON.stringify({
        input: this.state.input
      })
    }).then(response => response.json())
    .then(response => {
        if(response){
          fetch('https://mighty-ocean-60928.herokuapp.com/image', {
            'method': 'put',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify({
              id: this.state.user.id
            })
          }).then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user, {entries:count}))
          })
          
        }
        this.displayFaceBox(this.faceLocation(response))
      });
  }
  onRouteChange=(route)=>{
    if(route === 'signout'){
      this.setState(initialState)
    } else if(route==='home'){
      this.setState({signedIn:true})
    }
    this.setState({route:route})
  }
  
  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={{ Options }} />
         <Navigation signedIn={this.state.signedIn} onRouteChange={this.onRouteChange}/>
         {
           this.state.route==='home'?
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmitButton={this.onSubmitButton} />
              <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl} />
            </div>
            : (
              this.state.route === 'signin'|| this.state.route==='signout' ? 
                <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              :
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
         }
      </div>
    );
  }
}

const Options = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 900
      }
    }
  }
}

export default App;
