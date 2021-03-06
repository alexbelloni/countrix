import React from 'react';
import styled from 'styled-components';
import MiniCard from '../components/MiniCard';

const Section = styled.div`
    padding: 0 20px;
    display:flex;
    flex-direction: column;
    align-items: center;
    background-color: ${props => props.theme.background};
    
    @media(min-width: 1440px ){
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }
`;

const CardList = props => {
    const { data } = props;

    return (
        <Section {...props}>
            {data && data.map(d => <MiniCard key={d.name} {...props} country={d} />)}
        </Section>
    )
}

export default CardList;