import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import {
    Redirect,
} from "react-router-dom";

const Section = styled.div`
    font-size: 16px;
    border-radius: 5px;
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.elements};
    margin: 25px 0;
    max-width: 320px;
    display: flex;
    flex-direction: column;

    @media(min-width: 1440px ){
        max-width: 520px;
        margin: 0;
    }
`;

const Image = styled.div`
    height: 200px;
    border-radius: 5px 5px 0 0;
    flex: 1;

    &>img{
        width: 100%;
    }

    /*flag effect*/
    overflow: hidden;
    position: relative;

    /*flag effect*/
    &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, rgba(0,0,0,.25) 0%, rgba(255,255,255,.25) 15%, rgba(0,0,0,.25) 30%, rgba(255,255,255,.25) 45%, rgba(0,0,0,.25) 60%, rgba(255,255,255,.25) 75%, rgba(0,0,0,.25) 90%);
      }

`;

const Info = styled.div.attrs(props => ({
    style: {
      color: props.theme.text,
      backgroundColor: props.theme.elements
    },
  }))`
    display: flex;
    flex-direction: column;
    margin: 20px 20px 30px 20px;
    flex: 1;
`;

const Title = styled.span`
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
`;

const FieldValue = styled.div`
    display: flex;
`;

const Field = styled.span`
    padding-right: 10px;
`;

const Value = styled.span`
    font-weight: bold;
`;

const Separator = styled.div`
    height: 20px;
`;

const Borders = styled.div`
    display:flex;
    flex-direction: column;
    margin: 20px 0;

    &>span{
        font-weight: bolder;
        font-size: 18px;
    }
`;

const Countries = styled.div`
    display:flex;
    flex-direction: row;
    margin: 20px 0;
    flex-wrap: wrap;
`;

const Border = styled.div`
    padding: 15px;
    background: ${props => props.theme.background};
    border: thin;
    margin: 0 5px 5px 0;
    cursor: pointer;

    &:hover{
        border: 1px solid gray;
    }
`;

const Card = props => {
    const [redirect, setRedirect] = useState();

    const country = props.getCountry(useParams().id);
    const { flag, name, population, region, capital, subregion, nativeName, topLevelDomain, currencies, languages, borders, alpha3Code } = country;

    useEffect(() => {
        if (alpha3Code === redirect) {
            setRedirect('')
        }
    }, [redirect, alpha3Code])

    return redirect ? <Redirect to={`/detail/${redirect}`} /> : (
        <Section {...props}>
            <Image>
                <img alt={`flag of ${name}`} src={flag} />
            </Image>
            <Info theme={props.theme}>
                <Title>{name.length > 30 ? `${name.substr(0, 28)}...` : name}</Title>
                <FieldValue><Field>Native Name:</Field><Value>{nativeName}</Value></FieldValue>
                <FieldValue><Field>Population:</Field><Value>{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(population)}</Value></FieldValue>
                <FieldValue ><Field>Region:</Field><Value>{region}</Value></FieldValue>
                <FieldValue ><Field>Sub Region:</Field><Value>{subregion}</Value></FieldValue>
                <FieldValue ><Field>Capital:</Field><Value>{capital}</Value></FieldValue>
                <Separator />
                <FieldValue><Field>Top Level Domain:</Field><Value>{topLevelDomain}</Value></FieldValue>
                <FieldValue><Field>Currencies:</Field><Value>{currencies.map(c => c.name).toString()}</Value></FieldValue>
                <FieldValue><Field>Languages:</Field><Value>{languages.map(c => c.name).toString()}</Value></FieldValue>
                {borders && (
                    <Borders>
                        <span>Border Countries:</span>
                        <Countries>
                            {borders.map(code => <Border key={code} {...props} onClick={
                                () => setRedirect(code)
                            }>{props.getCountryName(code)}</Border>)}
                        </Countries>
                    </Borders>
                )}
            </Info>
        </Section>
    )
}

export default Card;