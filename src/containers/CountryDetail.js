import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

const Section = styled.div`
    padding: 100px 20px 20px 20px;
    background-color: ${props => props.theme.background};
    display:flex;
    flex-direction: column;

    @media(min-width: 1440px ){
        flex-direction: row;
    }
`;

const ButtonBack = styled.div`
    display: flex;
    min-width:70px;
    padding: 20px;
    background-color: ${props => props.theme.elements};
    color: ${props => props.theme.text};
    width: fit-content;

    &>a{
        text-decoration: none;
        padding-right: 10px;
        color: inherit;

        &>svg{
            padding-right: 10px;
        }
    }
`;

const Detail = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    width: 100%;
`;

const CountryDetail = props => {
    return (
        <Section {...props}>
            <div>
                <ButtonBack {...props}>
                    <Link to="/"><FontAwesomeIcon icon={faLongArrowAltLeft} /><span>Home</span></Link>
                </ButtonBack>
            </div>
            <Detail className='detail'>
                <Card getCountry={props.getCountry} getCountryName={props.getCountryName}/>
            </Detail>
        </Section>
    )
}

export default CountryDetail;