import React from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";

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
    }
`;

const Image = styled.div`
    height: 200px;
    border-radius: 5px 5px 0 0;
    flex: 1;

    &>img{
        width: 100%;
    }
`;

const Info = styled.div`
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
`;

const Card = props => {
    const country = props.getCountry(useParams().id);
    const { flag, name, population, region, capital, subregion, nativeName, topLevelDomain, currencies, languages, borders } = country;
    return (
        <Section {...props}>
            <Image>
                <img alt={name} src={flag} />
            </Image>
            <Info>
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
                <Borders>
                    <span>Border Countries:</span>
                    <Countries>
                        {borders.map(code => <Border key={code} {...props}>{props.getCountryName(code) || "Ipsum"}</Border>)}
                    </Countries>
                </Borders>
            </Info>
        </Section>
    )
}

export default Card;