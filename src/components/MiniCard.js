import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Section = styled.div.attrs(props => ({
  style: {
    color: props.theme.text,
    backgroundColor: props.theme.elements
  },
}))`
    border-radius: 5px;
    margin: 25px 0;
    min-width: 290px;
    max-width: 320px;
    
    &:hover{
        cursor: pointer;
    }

    @media(min-width: 1440px ){
        flex: 1 0 25%;
    }
`;

const MyLink = styled(Link).attrs(props => ({
    style: {
      color: props.theme.text,
    },
  }))`
    text-decoration: none;
`

const Image = styled.div.attrs(props => {
    return ({
    style: {
        background: `url("${props.flag}") no-repeat`,
        backgroundSize: "cover",
    },
  })
})`
    height: 200px;
    border-radius: 5px 5px 0 0;

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
`;

const Title = styled.span`
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px;
`

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
        <Section {...props} key={name} id={alpha3Code} >
            <MyLink to={`/detail/${alpha3Code}`}>
                <Image flag={flag} />
                <Info theme={props.theme}>
                    <Title>{name.length > 30 ? `${name.substr(0, 28)}...` : name}</Title>
                    <FieldValue><Field>Population:</Field><Value>{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(population)}</Value></FieldValue>
                    <FieldValue><Field>Region:</Field><Value>{region}</Value></FieldValue>
                    <FieldValue><Field>Capital:</Field><Value>{capital}</Value></FieldValue>
                </Info>
            </MyLink>
        </Section>
    )
}

export default MiniCard;