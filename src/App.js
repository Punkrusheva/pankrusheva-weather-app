import { useState, useEffect } from 'react'
import styles from './App.module.css'
import './stylesheets/normalize.css'
import weatherAPI from './services/weatherAPI'
import SearchBar from './Components/SearchBar/SearchBar'
import { ToastContainer } from "react-toastify"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useGeoLocation from './hooks/useGeoLocation'

function App() {
  const [temperature, setTemperature] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [icon, setIcon] = useState('')
  const location = useGeoLocation()
  
  useEffect(() => {
    if (location.coordinates.lat !== '') {
      weatherAPI.getWeatherByCoordinates(location)
      .then(res => { 
        if (res.main) {
          setTemperature(res.main.temp)
          setIcon(res.weather[0].icon)
        } else {toast.error('Could not get weather by coordinates')}
      })
    }     
    if (searchQuery) {
      weatherAPI.getWeatherByName(searchQuery)
      .then(res => {
        if (res.main) {
          setTemperature(res.main.temp)
          setIcon(res.weather[0].icon)
        }  else {toast.error('Nothing found')}
      })
    }
  }, [location, searchQuery])
  
  const handleSearchSubmit = searchQuery => {
    const normalizedSearchQuery = searchQuery.toLowerCase().trim();
    setSearchQuery(normalizedSearchQuery);
  };

  const formatWeather = (temperature - 273.15).toFixed(0)//конвертируем температуру из Кельвинов в Цельсии и оставляем целую часть
  
  const colorTemperatureDependence = (formatWeather) => {
    if (formatWeather <= -10) {return '#00ffff'}
    //if (formatWeather === 10) {return '#fff700'}
    if (-10 < formatWeather < 30) {return '#fff700'}
    if (formatWeather >= 30) {return '#ff8c00'}
  }
  
  return (
    <div className={styles.app}>
        <ToastContainer autoClose={2500} />
      <h1 className={styles.appTitle}>Weather in your city</h1> 
      <header className={styles.appHeader} style={{ backgroundColor: colorTemperatureDependence(formatWeather) }}>
        <SearchBar onSubmit={handleSearchSubmit}/> 
      </header>
      {location.loaded ?
        <>
          <p className={styles.appLocation}>
          {searchQuery ?
            (<>Location: {searchQuery[0].toUpperCase() + searchQuery.slice(1)}</>) :
            (<>Location:
            lat: {JSON.stringify(location.coordinates.lat)},  
            lng: {JSON.stringify(location.coordinates.lng)}</>)}
          </p>
          <p className={styles.appWeather}>
            Temperature: {formatWeather} &deg;С
          </p>
          <img className={styles.appIcon} src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon">
          </img>
        </>
        :
        "Location data not available yet."}
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