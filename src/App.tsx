// App.jsx
import React, { useState } from "react"
import Title from './components/Title'
import Form from './components/Form'
import Results from './components/Results'
import Loading from "./components/Loading"
import './index.css'


type ResultsState = {
    country: string
    cityName: string
    temperrature: string
    conditionText: string
    icon: string
}

// デフォルトのresultsオブジェクトを定義
const defaultResults: ResultsState = {
    country: "",
    cityName: "",
    temperrature: "",
    conditionText: "",
    icon: ""
};


const App = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [city, setCity] = useState<string>("")
    const [results, setResults] = useState<ResultsState>(defaultResults)

    const [error, setError] = useState<string | null>(null); // エラー状態を追加

    const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        fetch(`https://proxy-server-umber-phi.vercel.app/weather-data?${city}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("データの取得に失敗しました")
                }
                return res.json()
            })
            .then(data => {
                setResults({
                    country: data.location.country,
                    cityName: data.location.name,
                    temperrature: data.current.temp_c,
                    conditionText: data.current.condition.text,
                    icon: data.current.condition.icon
                })
                setLoading(false)
                setCity("")
            })
            .catch(() => {
                setError("都市名が間違っているか、接続に問題がある可能性があります。もう一度確認してください。") // エラーメッセージを設定
                setLoading(false)
                setCity("")
                setResults(defaultResults)
            });
    }
    return (
        <div className="wrapper">
            <div className="container">
                <Title />
                <Form setCity={setCity}
                    getWeather={getWeather}
                    city={city}
                />
                {loading ? <Loading /> : <Results results={results} />}
                {error && <div className="error-message">{error}</div>} {/* エラーメッセージを表示 */}
            </div>
        </div>
    );
}

export default App
