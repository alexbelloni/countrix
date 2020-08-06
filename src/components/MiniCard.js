import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Section = styled.div`
    border-radius: 5px;
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.elements};
    margin: 25px 0;
    max-width: 320px;
    
    &>a{
        text-decoration: none;
        color: ${props => props.theme.text};
    }

    &:hover{
        cursor: pointer;
    }

    @media(min-width: 1440px ){
        flex: 1 0 25%;
    }
`;

const Image = styled.div`
    height: 200px;
    border-radius: 5px 5px 0 0;

    &>img{
        width: 100%;
    }

    @media(min-width: 1440px ){
        background: url("${props => props.src}") no-repeat;
        background-size: cover;

        &>img{
            display:none;
        }
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 20px 30px 20px;
`;

const Title = styled.span`
    font-weight: bold;
    font-size: 18px;
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

const MiniCard = props => {
    const { flag, name, population, region, capital, alpha3Code } = props.country;
    return (
        <Section {...props} key={name} >
            <Link to={`/detail/${alpha3Code}`}>
                <Image src={flag}>
                    <img alt={name} src={flag}/>
                </Image>
                <Info>
                    <Title>{name.length > 30 ? `${name.substr(0, 28)}...` : name}</Title>
                    <FieldValue><Field>Population:</Field><Value>{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(population)}</Value></FieldValue>
                    <FieldValue><Field>Region:</Field><Value>{region}</Value></FieldValue>
                    <FieldValue><Field>Capital:</Field><Value>{capital}</Value></FieldValue>
                </Info>
            </Link>
        </Section>
    )
}

export default MiniCard;