// App.jsx

import { useState } from "react"
import Title from './components/Title'
import Form from './components/Form'
import Results from './components/Results'


const App = () => {
    const [city , setCity] = useState<string>("")
    const getWeather = (e:any) => {
        e.preventDefault()
        fetch("https://api.weatherapi.com/v1/current.json?key=b5c77b27a2234da6859121952241408&q=London&aqi=no")
            .then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <div>
            <Title/>
            <Form setCity={setCity} getWeather={getWeather}/>
            <Results/>
        </div>
    );
}

export default App;
