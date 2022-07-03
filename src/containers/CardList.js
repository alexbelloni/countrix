import React from 'react';
import styled from 'styled-components';
import MiniCard from '../components/MiniCard';

const Section = styled.div`
    padding: 0 20px;
    display:flex;
    flex-direction: column;
    /*align-items: center;*/
    background-color: ${props => props.theme.background};
    min-height: 100vh;
    
    /*320px, 768px, and 1200px*/
    @media(min-width: 768px ){
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }
`;

const CardList = ({theme, getCountries}) => {
    const data = getCountries();

    return (
        <Section theme={theme}>
            {data && data.map(d => <MiniCard key={d.name} theme={theme} country={d} />)}
        </Section>
    )
}

export default CardList;