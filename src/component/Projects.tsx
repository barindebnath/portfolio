import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { ReactLogo } from "@styled-icons/boxicons-logos/ReactLogo";
import { Js } from "@styled-icons/fa-brands/Js";
import { Python } from "@styled-icons/boxicons-logos/Python";
import { CardHeader, CardTitle, Container, Image, LogoGitHub, LogoLink, Title } from "./Styles";

//Local assets
import JvocabLG from "../Assets/Images/jvocab_lg.png";
import JvocabSM from "../Assets/Images/jvocab_sm.png";
import Portfolio1LG from "../Assets/Images/portfolio1_lg.png";
import Portfolio1SM from "../Assets/Images/portfolio1_sm.png";
import TodoTsLG from "../Assets/Images/todots_lg.png";
import TodoTsSM from "../Assets/Images/todots_sm.png";
import DezignDevilzLG from "../Assets/Images/dezigndevilz_lg.png";
import DezignDevilzSM from "../Assets/Images/dezigndevilz_sm.png";
import ScoeLG from "../Assets/Images/scoe_lg.png";
import ScoeSM from "../Assets/Images/scoe_sm.png";
import ProstockerLG from "../Assets/Images/prostocker_lg.png";
import ProstockerSM from "../Assets/Images/prostocker_sm.png";

const Projects = () => {
  const theme = useContext(ThemeContext);

  const projectList = [
    {
      title: "DezignDevilz",
      homepage: "https://dezigndevilz.com",
      imageSrc: { lg: DezignDevilzLG, sm: DezignDevilzSM },
      date: "October 2021",
      logo: <ReactLogo />,
    },
    {
      title: "JVocab",
      github: "https://github.com/barindebnath/jVocab",
      homepage: "https://barindebnath.github.io/jVocab",
      imageSrc: { lg: JvocabLG, sm: JvocabSM },
      date: "July 2021",
      logo: <ReactLogo />,
    },
    {
      title: "ToDo TS",
      github: "https://github.com/barindebnath/todo_ts",
      homepage: "https://barindebnath.github.io/todo_ts",
      imageSrc: { lg: TodoTsLG, sm: TodoTsSM },
      date: "May 2021",
      logo: <ReactLogo />,
    },
    {
      title: "Portfolio 1",
      github: "https://github.com/barindebnath/portfolio1",
      homepage: "https://barindebnath.github.io/portfolio1",
      imageSrc: { lg: Portfolio1LG, sm: Portfolio1SM },
      date: "August 2020",
      logo: <ReactLogo />,
    },
    {
      title: "Sanghavi College of Engineering",
      homepage: "https://scenashik.org",
      imageSrc: { lg: ScoeLG, sm: ScoeSM },
      date: "June 2020",
      logo: <Js />,
    },
    {
      title: "Pro Stocker",
      homepage: "https://barindebnath.pythonanywhere.com/",
      imageSrc: { lg: ProstockerLG, sm: ProstockerSM },
      date: "April 2020",
      logo: <Python />,
    },
  ];

  const vteSettings = {
    contentStyle: {
      background: theme.primary,
      color: theme.secondary,
      borderRadius: "0.5rem",
      transition: "background 0.5s",
    },
    iconStyle: { background: theme.secondary, color: theme.primary, transition: "color 0.5s, background 0.5s" },
    contentArrowStyle: { borderRight: `7px solid ${theme.primary}`, transition: "border 0.5s" },
  };

  return (
    <Container>
      <Title>PROJECTS</Title>

      <VerticalTimeline layout='1-column'>
        {projectList.length
          ? projectList.map((project) => {
              return (
                <VerticalTimelineElement date={project.date} icon={project.logo} {...vteSettings}>
                  <div>
                    <CardHeader>
                      <CardTitle className='vertical-timeline-element-title'>{project.title}</CardTitle>
                      <div>
                        {project.github && (
                          <a
                            href={project.github}
                            target='_blank'
                            rel='noreferrer'
                            title='Code'
                            style={{ marginRight: "14px" }}
                          >
                            <LogoGitHub />
                          </a>
                        )}
                        <a href={project.homepage} target='_blank' rel='noreferrer' title={project.title}>
                          <LogoLink />
                        </a>
                      </div>
                    </CardHeader>
                    <Image src={window.innerWidth < 768 ? project.imageSrc.sm : project.imageSrc.lg} />
                  </div>
                </VerticalTimelineElement>
              );
            })
          : null}
      </VerticalTimeline>
    </Container>
  );
};

export default Projects;
