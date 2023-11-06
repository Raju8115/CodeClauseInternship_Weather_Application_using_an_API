import React from 'react'
import apiKeys from './APIkey'
import Clock from 'react-live-clock';
import ReactAnimatedWeather from 'react-animated-weather';
import Forcast from './Forcast'
import bg_img from "./images/bg-img.jpg"
import left_img from "./images/city.jpg"
import "./currentLocation.css"


const dateBuilder = (d) =>{
    let months = ["January","February","March","April","May","June","July","August","September","October","Novermber","December"]
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month}, ${year}`


};
const defaults = {
    color : "white",
    size : 122,
    animate : "true"
};
class Weather extends React.Component{
    state = {
        lat : undefined,
        lon : undefined,
        errorMessage : undefined,
        temperatureC : undefined,
        temperatureF : undefined,
        city : undefined,
        country : undefined,
        humidity : undefined,
        description : undefined,
        icon : "CLEAR_DAY",
        sunrise : undefined,
        sunset : undefined,
        errorMsg : undefined
    }
    
    componentDidMount = () =>{
       
        if(navigator.geolocation){
            this.getposition()
            .then((position)=>{
                this.getWeather(position.coords.latitude,position.coords.longitude)
            })
            .catch((err)=>{
                this.getWeather(22.33,33.22)
                alert('You have disabled the location service, "This app will use Location to calculate weather"')
            })

        }else{
                alert("Geolocation are Not available") 
            }

        this.timerID = setInterval(()=>
            this.getWeather(this.state.lat,this.state.lon),600000
        )
}

    componentWillUnmount(){
        clearInterval(this.timerID);
    }


    getposition =(options) =>{
        return new Promise(function(resolve,reject){
            navigator.geolocation.getCurrentPosition(resolve,reject,options)
        })
    }

    getWeather = async (lat, lon) => {
        const api_call = await fetch(`${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`);
        const data = await api_call.json();
        console.log(lat, lon, data.weather[0].main )
        this.setState({
            lat : lat,
            lon : lon,
            city : data.name,
            temperatureC : Math.round(data.main.temp),
            temperatureF : Math.round(data.main.temp * 1.8 + 32),
            humidity : data.main.humidity,
            main : data.weather[0].main,
            country : data.sys.country,
        });

    switch (this.state.main) {
        case "Haze":
          this.setState({ icon: "CLEAR_DAY" });
          break;
        case "Clouds":
          this.setState({ icon: "CLOUDY" });
          break;
        case "Rain":
          this.setState({ icon: "RAIN" });
          break;
        case "Snow":
          this.setState({ icon: "SNOW" });
          break;
        case "Dust":
          this.setState({ icon: "WIND" });
          break;
        case "Drizzle":
          this.setState({ icon: "SLEET" });
          break;
        case "Fog":
          this.setState({ icon: "FOG" });
          break;
        case "Smoke":
          this.setState({ icon: "FOG" });
          break;
        case "Tornado":
          this.setState({ icon: "WIND" });
          break;
        default:
          this.setState({ icon: "CLEAR_DAY" });
       }
    };
  

    render(){
        return (
            <div>
                <div className='main-conatiner'>
                    <img src={bg_img} className='background_img' alt=''/>
                    <div className='box_container'>
                        <div className='left-box'>
                            <img src={left_img} className='left-img' alt=''/>
                            <div className='left-head'>
                                <h1 className='left-cityName'>{this.state.city}</h1>
                                <h1 className='left-country'>{this.state.country}</h1>
                            </div>
                            <div className='date-temp'>
                                <div className='date-clock'>
                                    <Clock format='HH:mm:ss' interval={1000} ticking={true} className='time' ></Clock>
                                    <p className='date'>{dateBuilder(new Date())}</p>
                                </div>
                                <div className='temperature-left'>
                                    <p>{this.state.temperatureC}&deg;</p>
                                    <p className='p'>c</p>
                                </div>
                            </div>
                        </div>
                        <div className='right-box'>
                        <div className='header-container'>
                        <ReactAnimatedWeather icon = {this.state.icon} size = {defaults.size} color = {defaults.color} animate = {defaults.animate}></ReactAnimatedWeather>
                            <div className='icons-description'>{this.state.main}</div>
                        </div>
                        <div className='search-part'>
                            <Forcast icon={this.state.icon} weather={this.state.main}></Forcast>
                        </div>  
                        </div>
                        
                    </div>
                 <div className='footer-info'>
                    <a href='#self'>Download source Code {" "} </a>
                    <p> |{" "}Developed by Raju A {" "}</p>
                </div> 
                </div>            
            </div>
            
            );
     }
    }



export default Weather;
