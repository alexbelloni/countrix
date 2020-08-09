import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const MenuArea = styled.div`
    position: fixed;
    width: 100%;
    padding: 20px 15px;
    background: ${props => props.theme.elements};
    color: ${props => props.theme.text};
`;

const Logo = styled.div`
    position: relative;
    top 0;
    left: 0;
    background: ${props => props.theme.elements};
`;

const Image = styled.img`
    width: 150px;
`;

const Modes = styled.div`
    position: relative;
    top -27px;
    left: -40px;
    text-align: right;
    background: ${props => props.theme.elements};

    &:hover{
        cursor: pointer;
    }
    `;

const Header = props => {
    return (
        <MenuArea theme={props.theme} className="menu">
            <Logo>
                <Image src={logo} />
            </Logo>
            <Modes onClick={() => props.modeClick()}>
                {!props.theme.light ?
                    <div><FontAwesomeIcon icon={faSun} /> <span>Light Mode</span></div> :
                    <div><FontAwesomeIcon icon={faMoon} /> <span>Dark Mode</span></div>
                }
            </Modes>
        </MenuArea>
    )
}

export default Header;