const baseURL = 'https://api.openweathermap.org/data/2.5/'
const KEY = 'd601651692c22f926add53251b7ead81'

const getWeatherByName = async (searchQuery) => {
    const url = `${baseURL}weather?q=${searchQuery}&appid=${KEY}&units={standard}`
    const res = await fetch(url)
        
    return await res.json()
}

const getWeatherByCoordinates = async (location) => {
    const url = `${baseURL}weather?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&appid=${KEY}&units={standard}`
    const res = await fetch(url)
   
    return await res.json()
}

export default { getWeatherByName, getWeatherByCoordinates }