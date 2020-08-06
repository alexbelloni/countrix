import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

const Section = styled.div`
    padding: 140px 20px 20px 20px;
    background-color: ${props => props.theme.background};
    display:flex;
    flex-direction:column;

    @media(min-width: 1440px ){

    }
`;

const ButtonBack = styled.div`
    display: flex;
    padding: 20px;
    background-color: ${props => props.theme.elements};
    color: ${props => props.theme.text};
    width: fit-content;

    &>a{
        text-decoration: none;
        padding: 0 10px;
        color: inherit;
    }
`;

const Detail = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
`;

const CardList = props => {
    const country = props.country || { "name": "Afghanistan", "topLevelDomain": [".af"], "alpha2Code": "AF", "alpha3Code": "AFG", "callingCodes": ["93"], "capital": "Kabul", "altSpellings": ["AF", "Afġānistān"], "region": "Asia", "subregion": "Southern Asia", "population": 27657145, "latlng": [33.0, 65.0], "demonym": "Afghan", "area": 652230.0, "gini": 27.8, "timezones": ["UTC+04:30"], "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"], "nativeName": "افغانستان", "numericCode": "004", "currencies": [{ "code": "AFN", "name": "Afghan afghani", "symbol": "؋" }], "languages": [{ "iso639_1": "ps", "iso639_2": "pus", "name": "Pashto", "nativeName": "پښتو" }, { "iso639_1": "uz", "iso639_2": "uzb", "name": "Uzbek", "nativeName": "Oʻzbek" }, { "iso639_1": "tk", "iso639_2": "tuk", "name": "Turkmen", "nativeName": "Türkmen" }], "translations": { "de": "Afghanistan", "es": "Afganistán", "fr": "Afghanistan", "ja": "アフガニスタン", "it": "Afghanistan", "br": "Afeganistão", "pt": "Afeganistão", "nl": "Afghanistan", "hr": "Afganistan", "fa": "افغانستان" }, "flag": "https://restcountries.eu/data/afg.svg", "regionalBlocs": [{ "acronym": "SAARC", "name": "South Asian Association for Regional Cooperation", "otherAcronyms": [], "otherNames": [] }], "cioc": "AFG" }
    return (
        <Section {...props}>
            <ButtonBack {...props}>
                <FontAwesomeIcon icon={faLongArrowAltLeft} /> 
                <Link to="/">Home</Link>
            </ButtonBack>
            <Detail className='detail'>
                {country && <Card key={country.name} {...props} country={country} />}
            </Detail>
        </Section>
    )
}

export default CardList;