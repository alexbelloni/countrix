import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import './App.css';
import Header from './containers/Header';
import CardList from './containers/CardList';
import CountryDetail from './containers/CountryDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ReactQueryDevtools } from 'react-query-devtools'

const Wrapper = styled.section`
  background: ${props => props.theme.background};
`;

const FiltersArea = styled.div`
  padding-top: 140px;
  display: flex;
  flex-direction: column;

  @media (min-width: 1440px){
    flex-direction: row;
    justify-content: space-between;
    padding: 140px 20px 0 20px;
  }
`;

const Keyword = styled.div`
  background: ${props => props.theme.background};
  padding: 20px 15px;

  &>input{
   min-width: 297px;
   border-radius: 5px;
   padding:10px;
   font: inherit;
   background: ${props => props.theme.elements};
   color: ${props => props.theme.text};
   border: 1px solid rgba(0, 0, 0, 0.3);
   box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Filter = styled.div`
  background: ${props => props.theme.background};
  padding: 20px 15px;

  &>select{
   min-width: 100px;
   border-radius: 5px;
   padding:10px;
   font: inherit;
   background: ${props => props.theme.elements};
   color: ${props => props.theme.text};
   border: 1px solid rgba(0, 0, 0, 0.3);
   box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2);
  }
`;

function App() {
  const [mode, setMode] = useState(1);
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  const fetchCountries = async () => {
    // return [
    //   { "name": "Afghanistan", "topLevelDomain": [".af"], "alpha2Code": "AF", "alpha3Code": "AFG", "callingCodes": ["93"], "capital": "Kabul", "altSpellings": ["AF", "Afġānistān"], "region": "Asia", "subregion": "Southern Asia", "population": 27657145, "latlng": [33.0, 65.0], "demonym": "Afghan", "area": 652230.0, "gini": 27.8, "timezones": ["UTC+04:30"], "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"], "nativeName": "افغانستان", "numericCode": "004", "currencies": [{ "code": "AFN", "name": "Afghan afghani", "symbol": "؋" }], "languages": [{ "iso639_1": "ps", "iso639_2": "pus", "name": "Pashto", "nativeName": "پښتو" }, { "iso639_1": "uz", "iso639_2": "uzb", "name": "Uzbek", "nativeName": "Oʻzbek" }, { "iso639_1": "tk", "iso639_2": "tuk", "name": "Turkmen", "nativeName": "Türkmen" }], "translations": { "de": "Afghanistan", "es": "Afganistán", "fr": "Afghanistan", "ja": "アフガニスタン", "it": "Afghanistan", "br": "Afeganistão", "pt": "Afeganistão", "nl": "Afghanistan", "hr": "Afganistan", "fa": "افغانستان" }, "flag": "https://restcountries.eu/data/afg.svg", "regionalBlocs": [{ "acronym": "SAARC", "name": "South Asian Association for Regional Cooperation", "otherAcronyms": [], "otherNames": [] }], "cioc": "AFG" },
    //   { "name": "Afghanistan1", "topLevelDomain": [".af"], "alpha2Code": "AF", "alpha3Code": "AFG", "callingCodes": ["93"], "capital": "Kabul", "altSpellings": ["AF", "Afġānistān"], "region": "Asia", "subregion": "Southern Asia", "population": 27657145, "latlng": [33.0, 65.0], "demonym": "Afghan", "area": 652230.0, "gini": 27.8, "timezones": ["UTC+04:30"], "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"], "nativeName": "افغانستان", "numericCode": "004", "currencies": [{ "code": "AFN", "name": "Afghan afghani", "symbol": "؋" }], "languages": [{ "iso639_1": "ps", "iso639_2": "pus", "name": "Pashto", "nativeName": "پښتو" }, { "iso639_1": "uz", "iso639_2": "uzb", "name": "Uzbek", "nativeName": "Oʻzbek" }, { "iso639_1": "tk", "iso639_2": "tuk", "name": "Turkmen", "nativeName": "Türkmen" }], "translations": { "de": "Afghanistan", "es": "Afganistán", "fr": "Afghanistan", "ja": "アフガニスタン", "it": "Afghanistan", "br": "Afeganistão", "pt": "Afeganistão", "nl": "Afghanistan", "hr": "Afganistan", "fa": "افغانستان" }, "flag": "https://restcountries.eu/data/afg.svg", "regionalBlocs": [{ "acronym": "SAARC", "name": "South Asian Association for Regional Cooperation", "otherAcronyms": [], "otherNames": [] }], "cioc": "AFG" },
    //   { "name": "Afghanistan2", "topLevelDomain": [".af"], "alpha2Code": "AF", "alpha3Code": "AFG", "callingCodes": ["93"], "capital": "Kabul", "altSpellings": ["AF", "Afġānistān"], "region": "Asia2", "subregion": "Southern Asia", "population": 27657145, "latlng": [33.0, 65.0], "demonym": "Afghan", "area": 652230.0, "gini": 27.8, "timezones": ["UTC+04:30"], "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"], "nativeName": "افغانستان", "numericCode": "004", "currencies": [{ "code": "AFN", "name": "Afghan afghani", "symbol": "؋" }], "languages": [{ "iso639_1": "ps", "iso639_2": "pus", "name": "Pashto", "nativeName": "پښتو" }, { "iso639_1": "uz", "iso639_2": "uzb", "name": "Uzbek", "nativeName": "Oʻzbek" }, { "iso639_1": "tk", "iso639_2": "tuk", "name": "Turkmen", "nativeName": "Türkmen" }], "translations": { "de": "Afghanistan", "es": "Afganistán", "fr": "Afghanistan", "ja": "アフガニスタン", "it": "Afghanistan", "br": "Afeganistão", "pt": "Afeganistão", "nl": "Afghanistan", "hr": "Afganistan", "fa": "افغانستان" }, "flag": "https://restcountries.eu/data/afg.svg", "regionalBlocs": [{ "acronym": "SAARC", "name": "South Asian Association for Regional Cooperation", "otherAcronyms": [], "otherNames": [] }], "cioc": "AFG" },
    //   { "name": "Afghanistan3", "topLevelDomain": [".af"], "alpha2Code": "AF", "alpha3Code": "AFG", "callingCodes": ["93"], "capital": "Kabul", "altSpellings": ["AF", "Afġānistān"], "region": "Asia", "subregion": "Southern Asia", "population": 27657145, "latlng": [33.0, 65.0], "demonym": "Afghan", "area": 652230.0, "gini": 27.8, "timezones": ["UTC+04:30"], "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"], "nativeName": "افغانستان", "numericCode": "004", "currencies": [{ "code": "AFN", "name": "Afghan afghani", "symbol": "؋" }], "languages": [{ "iso639_1": "ps", "iso639_2": "pus", "name": "Pashto", "nativeName": "پښتو" }, { "iso639_1": "uz", "iso639_2": "uzb", "name": "Uzbek", "nativeName": "Oʻzbek" }, { "iso639_1": "tk", "iso639_2": "tuk", "name": "Turkmen", "nativeName": "Türkmen" }], "translations": { "de": "Afghanistan", "es": "Afganistán", "fr": "Afghanistan", "ja": "アフガニスタン", "it": "Afghanistan", "br": "Afeganistão", "pt": "Afeganistão", "nl": "Afghanistan", "hr": "Afganistan", "fa": "افغانستان" }, "flag": "https://restcountries.eu/data/afg.svg", "regionalBlocs": [{ "acronym": "SAARC", "name": "South Asian Association for Regional Cooperation", "otherAcronyms": [], "otherNames": [] }], "cioc": "AFG" },
    //   { "name": "Afghanistan4", "topLevelDomain": [".af"], "alpha2Code": "AF", "alpha3Code": "AFG", "callingCodes": ["93"], "capital": "Kabul", "altSpellings": ["AF", "Afġānistān"], "region": "Asia2", "subregion": "Southern Asia", "population": 27657145, "latlng": [33.0, 65.0], "demonym": "Afghan", "area": 652230.0, "gini": 27.8, "timezones": ["UTC+04:30"], "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"], "nativeName": "افغانستان", "numericCode": "004", "currencies": [{ "code": "AFN", "name": "Afghan afghani", "symbol": "؋" }], "languages": [{ "iso639_1": "ps", "iso639_2": "pus", "name": "Pashto", "nativeName": "پښتو" }, { "iso639_1": "uz", "iso639_2": "uzb", "name": "Uzbek", "nativeName": "Oʻzbek" }, { "iso639_1": "tk", "iso639_2": "tuk", "name": "Turkmen", "nativeName": "Türkmen" }], "translations": { "de": "Afghanistan", "es": "Afganistán", "fr": "Afghanistan", "ja": "アフガニスタン", "it": "Afghanistan", "br": "Afeganistão", "pt": "Afeganistão", "nl": "Afghanistan", "hr": "Afganistan", "fa": "افغانستان" }, "flag": "https://restcountries.eu/data/afg.svg", "regionalBlocs": [{ "acronym": "SAARC", "name": "South Asian Association for Regional Cooperation", "otherAcronyms": [], "otherNames": [] }], "cioc": "AFG" },
    //   { "name": "Afghanistana", "topLevelDomain": [".af"], "alpha2Code": "AF", "alpha3Code": "AFG", "callingCodes": ["93"], "capital": "Kabul", "altSpellings": ["AF", "Afġānistān"], "region": "Asia", "subregion": "Southern Asia", "population": 27657145, "latlng": [33.0, 65.0], "demonym": "Afghan", "area": 652230.0, "gini": 27.8, "timezones": ["UTC+04:30"], "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"], "nativeName": "افغانستان", "numericCode": "004", "currencies": [{ "code": "AFN", "name": "Afghan afghani", "symbol": "؋" }], "languages": [{ "iso639_1": "ps", "iso639_2": "pus", "name": "Pashto", "nativeName": "پښتو" }, { "iso639_1": "uz", "iso639_2": "uzb", "name": "Uzbek", "nativeName": "Oʻzbek" }, { "iso639_1": "tk", "iso639_2": "tuk", "name": "Turkmen", "nativeName": "Türkmen" }], "translations": { "de": "Afghanistan", "es": "Afganistán", "fr": "Afghanistan", "ja": "アフガニスタン", "it": "Afghanistan", "br": "Afeganistão", "pt": "Afeganistão", "nl": "Afghanistan", "hr": "Afganistan", "fa": "افغانستان" }, "flag": "https://restcountries.eu/data/afg.svg", "regionalBlocs": [{ "acronym": "SAARC", "name": "South Asian Association for Regional Cooperation", "otherAcronyms": [], "otherNames": [] }], "cioc": "AFG" },
    //   { "name": "Afghanistan1aa", "topLevelDomain": [".af"], "alpha2Code": "AF", "alpha3Code": "AFG", "callingCodes": ["93"], "capital": "Kabul", "altSpellings": ["AF", "Afġānistān"], "region": "Asia", "subregion": "Southern Asia", "population": 27657145, "latlng": [33.0, 65.0], "demonym": "Afghan", "area": 652230.0, "gini": 27.8, "timezones": ["UTC+04:30"], "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"], "nativeName": "افغانستان", "numericCode": "004", "currencies": [{ "code": "AFN", "name": "Afghan afghani", "symbol": "؋" }], "languages": [{ "iso639_1": "ps", "iso639_2": "pus", "name": "Pashto", "nativeName": "پښتو" }, { "iso639_1": "uz", "iso639_2": "uzb", "name": "Uzbek", "nativeName": "Oʻzbek" }, { "iso639_1": "tk", "iso639_2": "tuk", "name": "Turkmen", "nativeName": "Türkmen" }], "translations": { "de": "Afghanistan", "es": "Afganistán", "fr": "Afghanistan", "ja": "アフガニスタン", "it": "Afghanistan", "br": "Afeganistão", "pt": "Afeganistão", "nl": "Afghanistan", "hr": "Afganistan", "fa": "افغانستان" }, "flag": "https://restcountries.eu/data/afg.svg", "regionalBlocs": [{ "acronym": "SAARC", "name": "South Asian Association for Regional Cooperation", "otherAcronyms": [], "otherNames": [] }], "cioc": "AFG" },
    //   { "name": "Afghanistan2a", "topLevelDomain": [".af"], "alpha2Code": "AF", "alpha3Code": "AFG", "callingCodes": ["93"], "capital": "Kabul", "altSpellings": ["AF", "Afġānistān"], "region": "Asia2", "subregion": "Southern Asia", "population": 27657145, "latlng": [33.0, 65.0], "demonym": "Afghan", "area": 652230.0, "gini": 27.8, "timezones": ["UTC+04:30"], "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"], "nativeName": "افغانستان", "numericCode": "004", "currencies": [{ "code": "AFN", "name": "Afghan afghani", "symbol": "؋" }], "languages": [{ "iso639_1": "ps", "iso639_2": "pus", "name": "Pashto", "nativeName": "پښتو" }, { "iso639_1": "uz", "iso639_2": "uzb", "name": "Uzbek", "nativeName": "Oʻzbek" }, { "iso639_1": "tk", "iso639_2": "tuk", "name": "Turkmen", "nativeName": "Türkmen" }], "translations": { "de": "Afghanistan", "es": "Afganistán", "fr": "Afghanistan", "ja": "アフガニスタン", "it": "Afghanistan", "br": "Afeganistão", "pt": "Afeganistão", "nl": "Afghanistan", "hr": "Afganistan", "fa": "افغانستان" }, "flag": "https://restcountries.eu/data/afg.svg", "regionalBlocs": [{ "acronym": "SAARC", "name": "South Asian Association for Regional Cooperation", "otherAcronyms": [], "otherNames": [] }], "cioc": "AFG" },
    //   { "name": "Afghanistan3a", "topLevelDomain": [".af"], "alpha2Code": "AF", "alpha3Code": "AFG", "callingCodes": ["93"], "capital": "Kabul", "altSpellings": ["AF", "Afġānistān"], "region": "Asia", "subregion": "Southern Asia", "population": 27657145, "latlng": [33.0, 65.0], "demonym": "Afghan", "area": 652230.0, "gini": 27.8, "timezones": ["UTC+04:30"], "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"], "nativeName": "افغانستان", "numericCode": "004", "currencies": [{ "code": "AFN", "name": "Afghan afghani", "symbol": "؋" }], "languages": [{ "iso639_1": "ps", "iso639_2": "pus", "name": "Pashto", "nativeName": "پښتو" }, { "iso639_1": "uz", "iso639_2": "uzb", "name": "Uzbek", "nativeName": "Oʻzbek" }, { "iso639_1": "tk", "iso639_2": "tuk", "name": "Turkmen", "nativeName": "Türkmen" }], "translations": { "de": "Afghanistan", "es": "Afganistán", "fr": "Afghanistan", "ja": "アフガニスタン", "it": "Afghanistan", "br": "Afeganistão", "pt": "Afeganistão", "nl": "Afghanistan", "hr": "Afganistan", "fa": "افغانستان" }, "flag": "https://restcountries.eu/data/afg.svg", "regionalBlocs": [{ "acronym": "SAARC", "name": "South Asian Association for Regional Cooperation", "otherAcronyms": [], "otherNames": [] }], "cioc": "AFG" },
    //   { "name": "Afghanistan4a", "topLevelDomain": [".af"], "alpha2Code": "AF", "alpha3Code": "AFG", "callingCodes": ["93"], "capital": "Kabul", "altSpellings": ["AF", "Afġānistān"], "region": "Asia2", "subregion": "Southern Asia", "population": 27657145, "latlng": [33.0, 65.0], "demonym": "Afghan", "area": 652230.0, "gini": 27.8, "timezones": ["UTC+04:30"], "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"], "nativeName": "افغانستان", "numericCode": "004", "currencies": [{ "code": "AFN", "name": "Afghan afghani", "symbol": "؋" }], "languages": [{ "iso639_1": "ps", "iso639_2": "pus", "name": "Pashto", "nativeName": "پښتو" }, { "iso639_1": "uz", "iso639_2": "uzb", "name": "Uzbek", "nativeName": "Oʻzbek" }, { "iso639_1": "tk", "iso639_2": "tuk", "name": "Turkmen", "nativeName": "Türkmen" }], "translations": { "de": "Afghanistan", "es": "Afganistán", "fr": "Afghanistan", "ja": "アフガニスタン", "it": "Afghanistan", "br": "Afeganistão", "pt": "Afeganistão", "nl": "Afghanistan", "hr": "Afganistan", "fa": "افغانستان" }, "flag": "https://restcountries.eu/data/afg.svg", "regionalBlocs": [{ "acronym": "SAARC", "name": "South Asian Association for Regional Cooperation", "otherAcronyms": [], "otherNames": [] }], "cioc": "AFG" },
    // ]

    const res = await fetch("https://restcountries.eu/rest/v2/all");
    return res.json();
  }

  const Query = () => {
    const { data, status } = useQuery("all", fetchCountries, {
      staleTime: 5000,
      cacheTime: 10,
    });

    if (status === "success" && allCountries.length === 0) {
      setTimeout(() => {
        setAllCountries(data);
        setCountries(data);
      }, 100);
    }

    return ""
  }

  const FilterUndefinedLabel = '- Filter by Region -';
  const themes = [
    {
      light: 0,
      elements: 'hsl(209, 23%, 22%)',
      background: 'hsl(207, 26%, 17%)',
      text: 'hsl(0, 0%, 100%)',
    },
    {
      light: 1,
      elements: 'hsl(0, 0%, 100%)',
      background: 'hsl(0, 0%, 92%)',
      text: 'hsl(200, 15%, 8%)',
      input: 'hsl(0, 0%, 52%)',
    },
  ]

  const theme = themes[mode];

  function modeClick() {
    setMode(mode ? 0 : 1)
  }

  function getFilterOptions() {
    const regions = [];
    allCountries.forEach((country) => {
      const addRegion = regions.indexOf(country.region) === -1;
      if (addRegion) {
        regions.push(country.region);
      }
    })

    return regions.map((region, i) => <option key={i}>{region}</option>);
  }

  function updateDataByFilter() {
    const filterSelected = document.querySelector('#filterSelect').value;
    if (filterSelected === FilterUndefinedLabel) {
      setCountries(allCountries);
    } else {
      setCountries(allCountries.filter(country => country.region === filterSelected));
    }
  }

  function updateDataByKeyword() {
    const keyword = document.querySelector('#keyword').value;
    if (keyword === "") {
      setCountries(allCountries);
    } else {
      setCountries(allCountries.filter(country => country.name.substr(0, keyword.length).toUpperCase() === keyword.toUpperCase()));
    }
  }

  function getCountryByAlpha3Code(code) {
    return allCountries.find(country => country.alpha3Code === code);
  }

  function getCountryNameByAlpha3Code(code) {
    const country = getCountryByAlpha3Code(code);
    return country && country.name;
  }

  return (
    <>
      <Wrapper theme={theme}>
        <Header theme={theme} modeClick={modeClick} />
        <Router>
          <Switch>
            <Route path="/detail/:id">
              <CountryDetail theme={theme} getCountry={getCountryByAlpha3Code} getCountryName={getCountryNameByAlpha3Code} />
            </Route>
            <Route path="/">
              <Query />
              <FiltersArea>
                <Keyword theme={theme}>
                  <input id="keyword" onChange={() => updateDataByKeyword()} placeholder="Search for a country" />
                </Keyword>
                <Filter theme={theme}>
                  <select id="filterSelect" defaultValue={FilterUndefinedLabel} onChange={() => updateDataByFilter()}>
                    <option key={-1}>{FilterUndefinedLabel}</option>
                    {getFilterOptions()}
                  </select>
                </Filter>
              </FiltersArea>
              <CardList theme={theme} data={countries} />
            </Route>
          </Switch>
        </Router>
      </Wrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
