import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, } from "@material-ui/core";

import styles from './App.module.css';

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');

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

    const onCountryChange = (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);
    };

    return (
        <div className="app">
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
                {/* InfoBoxs */}
                {/* InfoBoxs */}
                {/* InfoBoxs */}
            </div>

            {/* Header */}
            {/* Title + Select input dropdown field */}

  

            {/* Table */}

            {/* Map */}

        </div>
    )
}

export default App;