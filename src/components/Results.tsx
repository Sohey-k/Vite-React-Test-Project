//Results.tsx

type ResultsProps = {
    results: {
        country: string
        cityName: string
        temperrature: string
        conditionText: string
        icon: string
    }
}

const Results = (props: ResultsProps) => {
    return (
        <div>
            {props.results.country &&
                <div>
                    <div className='results-country'>{props.results.country}</div>
                    <div className='results-city'>{props.results.cityName}</div>
                    <div className='results-temp'>{props.results.temperrature}<span>°C</span></div>
                    <div className='results-condition'>
                        <img src={props.results.icon} alt="icon" />
                        <span>{props.results.conditionText}</span>
                    </div>
                </div>

            }
        </div>
    )
}

export default Results