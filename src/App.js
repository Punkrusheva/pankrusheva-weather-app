import { useState, useEffect } from 'react'
import './App.css'
import './stylesheets/normalize.css'
import weatherAPI from './services/weatherAPI'
import Filter from './Components/Filter/Filter'
import { ToastContainer } from "react-toastify"
//import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useGeoLocation from './hooks/useGeoLocation'

function App() {
  const [weather, setWeather] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [icon, setIcon] = useState('')
  const location = useGeoLocation()
  
  console.log("location",location)

  useEffect(() => {
    weatherAPI.getWeatherByCoordinates(location)
      .then(res => { 
        if (res.main) {
          setWeather(res.main.temp)
          setIcon(res.weather[0].icon)
        }// else { toast.error('Nothing found') }
      })
    weatherAPI.getWeatherByName(searchQuery)
      .then(res => {
        if (res.main) {
          setWeather(res.main.temp)
          setIcon(res.weather[0].icon)
        }// else { toast.error('Nothing found') }
      }
      )
  }, [location, searchQuery])

  const changeSpeciesFilter = e => {
    setSearchQuery(e.currentTarget.value)
 }
  const formatWeather = (weather - 273.15).toFixed(0)//конвертируем температуру из Кельвинов в Цельсии и оставляем целую часть
  
  const colorTemperatureDependence = (formatWeather) => {
    if (formatWeather <= -10) {return '#00ffff'}
    //if (formatWeather === 10) {return '#fff700'}
    if (formatWeather >= 30) {return '#ff8c00'}
    if (-10<formatWeather < 30) {return '#fff700'}
  }
  
  return (
    <div className="App">
        <ToastContainer autoClose={2500} />
      <h1 className="App-title">Weather in your city</h1> 
      <header className="App-header" style={{ backgroundColor: colorTemperatureDependence(formatWeather) }}>
        <Filter
          value={searchQuery}
          placeholder='Set your location'
          onChange={changeSpeciesFilter} />
        {location.loaded ? <> 
          <p className="App-location">
            {searchQuery ? (<>Location: {searchQuery[0].toUpperCase() + searchQuery.slice(1)}</>) : (<>
            lat: {JSON.stringify(location.coordinates.lat)},  
            lng: {JSON.stringify(location.coordinates.lng)}</>)}
            
          </p>
          <p className="App-weather">
            Weather: {formatWeather} &deg;С
          </p>

          <img className="App-icon" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon">
          </img>
          </>
          : "Location data not available yet."}
                      
      </header>
    </div>
  );
}

export default App
/**{searchQuery === ''  && <p>Where are you from?</p>}
        </>)}

 * {searchQuery && (<>Location: {searchQuery[0].toUpperCase() + searchQuery.slice(1)}</>)}
 * 
 * 
 *   {searchQuery !== ''  && (<>
 */
/** 
 * 
 * 
*/