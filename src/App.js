import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import { InfoBox, Map } from './components';

import styles from './App.module.css';

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});


    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
        .then(response => response.json())
        .then(data => {
            setCountryInfo(data);
        })
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
          fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
              const countries = data.map((country) => ({
                name: country.country,
                value: country.countryInfo.iso2,
              }));
              setCountries(countries);
            });
        };

        getCountriesData();
      }, []);

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;

        const url =
        countryCode === "worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
        .then(response => response.json())
        .then(data => {
            setCountry(countryCode);
            setCountryInfo(data);
        })
    };

    return (
        <div className={styles.app}>
            <div className={styles.app__left}>
                <div className={styles.app__header}>
                <h1>COVID-19 TRACKER</h1>
                <FormControl className={styles.app__header}>
                    <Select variant="outlined" onChange={onCountryChange} value={country}>
                        <MenuItem value="worldwide">Worldwide</MenuItem>
                        {countries.map(country => (
                                <MenuItem value={country.value}>{country.name}</MenuItem>
                        ))}
                 </Select>
                </FormControl>
                </div>
                <div className={styles.app__stats}>
                    <InfoBox 
                        title="Cases" 
                        cases={countryInfo.todayCases} 
                        total={countryInfo.cases}
                    />
                    <InfoBox 
                        title="Recoveries" 
                        cases={countryInfo.todayRecovered} 
                        total={countryInfo.recovered}
                    />
                    <InfoBox 
                        title="Deaths" 
                        cases={countryInfo.todayDeaths} 
                        total={countryInfo.deaths}
                    />
                </div>
                <Map/>
            </div>
            <Card className={styles.app__right}>
                <CardContent>
                    <h3>Live Cases By Country</h3>
                    {/* Table */}
                    <h3>Worldwide new cases</h3>
                    {/* Graph */}
                </CardContent>
            </Card>
        </div>
    )
}

export default App;