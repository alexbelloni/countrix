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
  Route,
} from "react-router-dom";
import { ReactQueryDevtools } from 'react-query-devtools'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBroom } from '@fortawesome/free-solid-svg-icons'

const Main = styled.main.attrs(props => ({
  style: {
    background: props.theme.background,
  },
}))`
padding: 0 15px;`

const FiltersArea = styled.section`
  display: flex;
  flex-direction: column;

  @media (min-width: 1440px){
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Keyword = styled.article.attrs(props => ({
  style: {
    background: props.theme.background,
  },
}))`
  display: flex;
  align-items: center;
  justify-content: space-between;
  

  &>input{
   width: 100%;
   border-radius: 5px;
   padding:10px;
   font: inherit;
   background: ${props => props.theme.elements};
   color: ${props => props.theme.text};
   border: 1px solid rgba(0, 0, 0, 0.3);
   box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2);
  }

  &>input::placeholder {
    color: ${props => props.theme.text};
  }
`;

const CleanButton = styled.div`
  margin-left: 20px;
  cursor: pointer;
  color: ${props => props.theme.text};
}
`;

const Filter = styled.div`
  background: ${props => props.theme.background};

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
  const [keyword, setKeyword] = useState("");
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  const fetchCountries = async () => {
    const res = await fetch("https://restcountries.com/v2/all");
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
    document.querySelector('#keyword').value = "";
    setKeyword("");

    const filterSelected = document.querySelector('#filterSelect').value;
    if (filterSelected === FilterUndefinedLabel) {
      setCountries(allCountries);
    } else {
      setCountries(allCountries.filter(country => country.region === filterSelected));
    }
  }

  function updateDataByKeyword(isEmpty) {
    document.querySelector('#filterSelect').value = FilterUndefinedLabel;
    const keyword = isEmpty ? "" : document.querySelector('#keyword').value;

    if (keyword === "") {
      setCountries(allCountries);
    } else {
      setCountries(allCountries.filter(country => country.name.substr(0, keyword.length).toUpperCase() === keyword.toUpperCase()));
    }
    setKeyword(keyword);
  }

  function getCountryByAlpha3Code(code) {
    return allCountries.find(country => country.alpha3Code === code) || { "name": "Afghanistan", "topLevelDomain": [".af"], "alpha2Code": "AF", "alpha3Code": "AFG", "callingCodes": ["93"], "capital": "Kabul", "altSpellings": ["AF", "Afġānistān"], "region": "Asia", "subregion": "Southern Asia", "population": 27657145, "latlng": [33.0, 65.0], "demonym": "Afghan", "area": 652230.0, "gini": 27.8, "timezones": ["UTC+04:30"], "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"], "nativeName": "افغانستان", "numericCode": "004", "currencies": [{ "code": "AFN", "name": "Afghan afghani", "symbol": "؋" }], "languages": [{ "iso639_1": "ps", "iso639_2": "pus", "name": "Pashto", "nativeName": "پښتو" }, { "iso639_1": "uz", "iso639_2": "uzb", "name": "Uzbek", "nativeName": "Oʻzbek" }, { "iso639_1": "tk", "iso639_2": "tuk", "name": "Turkmen", "nativeName": "Türkmen" }], "translations": { "de": "Afghanistan", "es": "Afganistán", "fr": "Afghanistan", "ja": "アフガニスタン", "it": "Afghanistan", "br": "Afeganistão", "pt": "Afeganistão", "nl": "Afghanistan", "hr": "Afganistan", "fa": "افغانستان" }, "flag": "https://restcountries.eu/data/afg.svg", "regionalBlocs": [{ "acronym": "SAARC", "name": "South Asian Association for Regional Cooperation", "otherAcronyms": [], "otherNames": [] }], "cioc": "AFG" };
  }

  function getCountryNameByAlpha3Code(code) {
    const country = getCountryByAlpha3Code(code);
    return country && country.name;
  }

  function getCountries() {
    return countries
  }

  return (
    <>
      <Main theme={theme}>
        <Router>
          <Header theme={theme} modeClick={modeClick} />
          <div style={{ padding: "120px 0" }}>
            <Switch>
              <Route path="/detail/:id">
                <CountryDetail theme={theme} getCountry={getCountryByAlpha3Code} getCountryName={getCountryNameByAlpha3Code} />
              </Route>
              <Route exact path="/">
                <Query />
                <FiltersArea>
                  <Keyword theme={theme}>
                    <input id="keyword" value={keyword} onChange={() => updateDataByKeyword()} placeholder="Search for a country" />
                    <CleanButton theme={theme} onClick={() => updateDataByKeyword(true)} > <FontAwesomeIcon icon={faBroom} /></CleanButton>
                  </Keyword>
                  <Filter theme={theme}>
                    <select id="filterSelect" aria-label="Country's Region" defaultValue={FilterUndefinedLabel} onChange={() => updateDataByFilter()}>
                      <option key={-1}>{FilterUndefinedLabel}</option>
                      {getFilterOptions()}
                    </select>
                  </Filter>
                </FiltersArea>
                <CardList theme={theme} getCountries={getCountries} />
              </Route>
            </Switch>
          </div>
        </Router>
        <footer style={{ textAlign: "center", fontSize: '0.8rem', padding: "10px" }}><span>COUNTRIX - The Flag Collection . </span><a href="https://alexandrebelloni.com">Alexandre Alves</a></footer>
      </Main>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
