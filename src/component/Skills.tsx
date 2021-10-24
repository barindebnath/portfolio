import styled from "styled-components";
import { Container, Title } from "./Styles";

//LOGOs
import { ReactLogo } from "@styled-icons/fa-brands/ReactLogo";
import { Babel } from "@styled-icons/simple-icons/Babel";
import { Typescript } from "@styled-icons/simple-icons/Typescript";
import { JsSquare } from "@styled-icons/fa-brands/JsSquare";
import { Storybook } from "@styled-icons/simple-icons/Storybook";
import { Styledcomponents } from "@styled-icons/simple-icons/Styledcomponents";
import { Redux } from "@styled-icons/boxicons-logos/Redux";
import { Webpack } from "@styled-icons/simple-icons/Webpack";
import { Yarn } from "@styled-icons/simple-icons/Yarn";
import { Npm } from "@styled-icons/icomoon/Npm";
import { Git } from "@styled-icons/boxicons-logos/Git";
import { Materialui } from "@styled-icons/simple-icons/Materialui";
import { Github } from "@styled-icons/bootstrap/Github";
import { LogoBitbucket } from "@styled-icons/ionicons-solid/LogoBitbucket";
import { Trello } from "@styled-icons/icomoon/Trello";
import { ReactComponent as Lerna } from "../Assets/Images/lerna.svg";
import { ReactComponent as Unfuddle } from "../Assets/Images/unfuddle.svg";

const Skills = () => {
  const skills = [
    {
      name: "React",
      icon: <ReactLogo />,
      bgColor: "#61DBFB",
      isDarkBG: false,
    },
    {
      name: "TypeScript",
      icon: <Typescript />,
      bgColor: "#007acc",
      isDarkBG: true,
    },
    {
      name: "JavaScript",
      icon: <JsSquare />,
      bgColor: "#f0db4f",
      isDarkBG: false,
    },
    {
      name: "Redux",
      icon: <Redux />,
      bgColor: "#764abc",
      isDarkBG: true,
    },
    {
      name: "Styled Components",
      icon: <Styledcomponents />,
      bgColor: "#d96f92",
      isDarkBG: false,
    },
    {
      name: "Git",
      icon: <Git />,
      bgColor: "#F1502F",
      isDarkBG: true,
    },
    {
      name: "Material UI",
      icon: <Materialui />,
      bgColor: "#0070E1",
      isDarkBG: true,
    },
    {
      name: "StoryBook",
      icon: <Storybook />,
      bgColor: "#FF4785",
      isDarkBG: true,
    },
    {
      name: "Lerna",
      icon: <Lerna />,
      bgColor: "#fff",
      isDarkBG: false,
    },
    {
      name: "Bitbucket",
      icon: <LogoBitbucket />,
      bgColor: "#2684ff",
      isDarkBG: true,
    },
    {
      name: "Unfuddle",
      icon: <Unfuddle />,
      bgColor: "#841F1A",
      isDarkBG: true,
    },
    {
      name: "Yarn Workspace",
      icon: <Yarn />,
      bgColor: "#2C8EBB",
      isDarkBG: true,
    },
    {
      name: "Babel",
      icon: <Babel />,
      bgColor: "#F9DC3E",
      isDarkBG: false,
    },
    {
      name: "GitHub",
      icon: <Github />,
      bgColor: "#24292F",
      isDarkBG: true,
    },
    {
      name: "Webpack",
      icon: <Webpack />,
      bgColor: "#8dd6f9",
      isDarkBG: false,
    },
    {
      name: "NPM",
      icon: <Npm />,
      bgColor: "#CD0000",
      isDarkBG: true,
    },
    {
      name: "Trello",
      icon: <Trello />,
      bgColor: "#0084D1",
      isDarkBG: true,
    },
  ];

  return (
    <Container>
      <Title>SKILLS</Title>
      <GridContainer>
        {Array.isArray(skills) &&
          skills.length &&
          skills.map((skill) => (
            <GridCard bgColor={skill.bgColor} isDarkBG={skill.isDarkBG}>
              <div style={{ textAlign: "center" }}>
                <div style={{ maxWidth: "3rem", margin: "0 auto 0.4rem", minHeight: "42px" }}>{skill.icon}</div>
                {skill.name}
              </div>
            </GridCard>
          ))}
      </GridContainer>
    </Container>
  );
};

export default Skills;

const GridContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: minmax(150px, 1fr);
  grid-gap: 2rem;
  grid-auto-flow: dense;
`;
const GridCard = styled.div<{ bgColor: string; isDarkBG: boolean }>`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ isDarkBG }) => (isDarkBG ? "#fff" : "#000")};
  border-radius: 1rem;
  font-family: "SourceSansPro-Bold";
  box-shadow: 0 0 10px rgb(0 0 0 / 0.2);

  /*Center number in cards*/
  display: flex;
  align-items: center;
  justify-content: center;
`;
