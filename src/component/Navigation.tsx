import { useState } from "react";
import { useHistory, Switch, Route, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

//local components
import Projects from "./Projects";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import About from "./About";

type Props = {
  isDark: Boolean;
  handleSwitch: () => void;
};

const Navigation = ({ isDark, handleSwitch }: Props) => {
  const history = useHistory();
  const { pathname } = useLocation();
  console.log(pathname);
  const [menuToggle, setMenuToggle] = useState(false);

  const handleClick = (route: string) => {
    history.push(route);
    setMenuToggle(false);
  };

  return (
    <>
      <Fixed>
        <Nav>
          <BrandName>
            {/* <NavButtons active={false} onClick={() => handleClick("/about")}> */}
            Barin Debnath
            {/* </NavButtons> */}
          </BrandName>
          <Toggle isDark={isDark} onClick={handleSwitch} desktop={false} />
          <MenuToggle onClick={() => setMenuToggle(!menuToggle)}>☰</MenuToggle>
          <ButtonGroup menuToggle={menuToggle}>
            <NavButtons active={pathname === "/" || pathname === "/projects"} onClick={() => handleClick("/projects")}>
              Projects
            </NavButtons>
            <NavButtons active={pathname === "/experience"} onClick={() => handleClick("/experience")}>
              Experience
            </NavButtons>
            <NavButtons active={pathname === "/skills"} onClick={() => handleClick("/skills")}>
              Skills
            </NavButtons>
            <NavButtons active={pathname === "/education"} onClick={() => handleClick("/education")}>
              Education
            </NavButtons>
            <NavButtons active={pathname === "/about"} onClick={() => handleClick("/about")}>
              About
            </NavButtons>
            <Toggle isDark={isDark} onClick={handleSwitch} desktop={true} />
          </ButtonGroup>
        </Nav>
      </Fixed>

      <Switch>
        <Route path='/projects' exact>
          <Projects />
        </Route>
        <Route path='/education'>
          <Education />
        </Route>
        <Route path='/experience'>
          <Experience />
        </Route>
        <Route path='/skills'>
          <Skills />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        {/* change default Route */}
        <Route component={Projects}></Route>
      </Switch>
    </>
  );
};

export default Navigation;

const Fixed = styled.div`
  /* position: fixed; */
  width: 100%;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 2rem 2rem 0 2rem;
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  transition: background 0.5s;
`;

const BrandName = styled.span`
  font-size: 1rem;
  font-family: SourceSansPro-SemiBold;
  color: ${({ theme }) => theme.primary};
  margin-right: auto;
  transition: color 0.5s;
`;

const ButtonGroup = styled.div<{ menuToggle: Boolean }>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 2;
  transition: color 0.5s, background 0.5s;

  @media only screen and (max-width: 768px) {
    display: ${({ menuToggle }) => (menuToggle ? "flex" : "none")};
    position: absolute;
    flex-direction: column;
    background-color: ${({ theme }) => theme.secondary};
    width: 100%;
    align-items: flex-start;
    left: 0;
    top: 86px;
    padding: 0.5rem 0 0.5rem 2rem;
    height: ${({ menuToggle }) => (menuToggle ? "auto" : "0%")};
    box-shadow: ${({ theme }) => `0 4px ${theme.primary}`};
  }
`;

const NavButtons = styled.button<{ active: boolean }>`
  position: relative;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1rem;
  font-family: SourceSansPro-SemiBold;
  color: ${({ theme }) => theme.primary};
  margin: 0 0.3rem;
  padding: 0.1rem 0.3rem;
  transition: color 0.5s, background 0.5s;
  border-radius: 0.25rem;

  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }

  @media only screen and (min-width: 769px) {
    background-color: ${({ theme, active }) => (active ? theme.hover : "transparent")};
  }

  @media only screen and (max-width: 768px) {
    margin: 0.5rem 0;
    width: 100%;
    text-align: left;
  }
`;

const darkToggle = keyframes`
  0%{ right: 17px;  top: 10px; }
  25%{ right: 13px; top: 0px;}
  50%{ right: 7px; top: -3px;}
  75%{ right: 2px; top: -2px;} 
  100% { right: -3px; top: 1px;}
`;

const lightToggle = keyframes`
  0%{ left: 15px;  bottom: 9px; }
  20%{ left: 14px; bottom: 2px;}
  40%{ left: 10px; bottom: -2px;}
  60%{ left: 7px; bottom: -4px;}
  80%{ left: 1px; bottom: -3px;} 
  100% { left: -3px; bottom: 0px;}
`;

const Toggle = styled.button<{ desktop: Boolean; isDark: Boolean }>`
  position: relative;
  height: 22px;
  width: 22px;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 1rem;
  background-color: transparent;
  margin: auto 0.5rem;
  padding: 0;
  cursor: pointer;
  display: ${({ desktop }) => (desktop ? "block" : "none")};

  transform: scale(1.2);

  @media only screen and (max-width: 768px) {
    display: ${({ desktop }) => (desktop ? "none" : "block")};
  }

  &::before {
    display: ${({ isDark }: { isDark: Boolean }) => (isDark ? "block" : "none")};
    content: "";
    position: absolute;
    height: 8px;
    width: 8px;
    border: 1px solid ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.secondary};
    border-radius: 50%;
    left: -3px;
    bottom: 0px;
    animation-name: ${lightToggle};
    animation-duration: 0.3s;
  }
  &::after {
    display: ${({ isDark }: { isDark: Boolean }) => (isDark ? "none" : "block")};
    content: "";
    position: absolute;
    height: 9px;
    width: 9px;
    background-color: ${({ theme }) => theme.primary};
    border-radius: 50%;
    right: -3px;
    top: 1px;

    animation-name: ${darkToggle};
    animation-duration: 0.3s;
  }
`;

const MenuToggle = styled.button`
  display: none;
  position: relative;
  border: 0;
  border-radius: 50%;
  background-color: transparent;
  padding: 1.1rem 0.6rem 1.2rem;
  height: 22px;
  color: ${({ theme }) => theme.primary};
  font-size: 1.2rem;
  line-height: 0;
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ theme }) => theme.hover};
    }
  }
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;
