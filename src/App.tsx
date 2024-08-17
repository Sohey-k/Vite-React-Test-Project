// App.jsx
import React, { useState } from "react"
import Title from './components/Title'
import Form from './components/Form'
import Results from './components/Results'
import './index.css'


type ResultsState = {
    country: string
    cityName: string
    temperrature: string
    conditionText: string
    icon: string
}


const App = () => {
    const [city, setCity] = useState<string>("")
    const [results, setResults] = useState<ResultsState>({
        country: "",
        cityName: "",
        temperrature: "",
        conditionText: "",
        icon: ""
    })
    const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetch(`https://api.weatherapi.com/v1/current.json?key=b5c77b27a2234da6859121952241408&q=${city}&aqi=no`)
            .then(res => res.json())
            .then(data => {
                setResults({
                    country: data.location.country,
                    cityName: data.location.name,
                    temperrature: data.current.temp_c,
                    conditionText: data.current.condition.text,
                    icon: data.current.condition.icon
                })
            })
    }
    return (
        <div className="wrapper">
            <div className="container">
                <Title />
                <Form setCity={setCity} getWeather={getWeather} />
                <Results results={results} />
            </div>
        </div>
    );
}

export default App;
