import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import {
    Redirect,
} from "react-router-dom";

const MenuArea = styled.header`
    position: fixed;
    width: 100%;
    padding: 10px 15px;
    background: ${props => props.theme.elements};
    color: ${props => props.theme.text};
    z-index: 1000;
    height: 80px;
    left: 0;
`;

const Logo = styled.div`
    position: relative;
    top 0;
    left: 0;
    background: ${props => props.theme.elements};
    z-index: 1;
    width: fit-content;

    &:hover{
        cursor: pointer;
    }
`;

const Image = styled.img`
    width: 150px;
`;

const Modes = styled.nav`
    position: relative;
    top -90px;
    left: -40px;
    text-align: right;
    background: ${props => props.theme.elements};
    display: flex;
    justify-content: right;

    &>div:hover{
        cursor: pointer;
    }
`;

const Header = ({ theme, modeClick }) => {
    const [goHome, setGoHome] = useState(false);

    return (
        <MenuArea theme={theme} className="menu">
            {goHome && <Redirect to="/" />}
            <Logo onClick={() => {
                setGoHome(true);
                setTimeout(() => {
                    setGoHome(false)
                }, 1000);
            }}>
                <Image alt="logo" src={logo} />
                <h1 style={{color:"gray", marginTop: "0"}}>The Flag Collection</h1>
            </Logo>
            
            <Modes>
                <div style={{ width: "fit-content" }} onClick={() => modeClick()}>
                    {!theme.light ?
                        <><FontAwesomeIcon icon={faSun} /> <span>Light Mode</span></> :
                        <><FontAwesomeIcon icon={faMoon} /> <span>Dark Mode</span></>
                    }
                </div>
            </Modes>
            
        </MenuArea>
    )
}

export default Header;