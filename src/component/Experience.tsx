import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { ReactLogo } from "@styled-icons/boxicons-logos/ReactLogo";
import { Js } from "@styled-icons/fa-brands/Js";
import { CardHeader, CardTitle, Container, Details, LogoLink, SubText, SubTitle, Title } from "./Styles";

const Experience = () => {
  const theme = useContext(ThemeContext);

  const experienceList = [
    {
      title: "React.js Developer",
      company: "AdroitCoders",
      date: "Sep 2021 - Present",
      location: "Nashik, Maharashtra, India",
      technology: "React.js, TypeScript, StoryBook, Redux, Lerna, Yarn Monorepo, GitHub",
      homepage: "https://adroitcoders.com",
      logo: <ReactLogo />,
    },
    {
      title: "React.js Developer",
      company: "AxelBuzz Tech Solutions",
      date: "Dec 2020 - Sep 2021 (9 Months)",
      location: "Nashik, Maharashtra, India",
      technology: "React.js, JavaScript, jQuery, Bootstrap4, BitBucket",
      homepage: "https://axelbuzz.com",
      logo: <ReactLogo />,
    },
    {
      title: "Frontend Developer",
      company: "Puspendu Studio",
      date: "Sep 2019 - Aug 2020 (1 Year)",
      location: "Nashik, Maharashtra, India",
      technology: "CSS3, Bootstrap4, JavaScript, jQuery, HTML5",
      homepage: "https://puspendustudio.com",
      logo: <Js />,
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
      <Title>EXPERIENCE</Title>

      <VerticalTimeline layout='1-column'>
        {experienceList.length
          ? experienceList.map((experience) => {
              return (
                <VerticalTimelineElement date={experience.date} icon={experience.logo} {...vteSettings}>
                  <div>
                    <CardHeader>
                      <CardTitle className='vertical-timeline-element-title'>{experience.title}</CardTitle>
                      <a href={experience.homepage} target='_blank' rel='noreferrer' title={experience.company}>
                        <LogoLink />
                      </a>
                    </CardHeader>
                    <Details>
                      <SubTitle>Company</SubTitle>
                      <SubText>{experience.company}</SubText>
                    </Details>
                    <Details>
                      <SubTitle>Location</SubTitle>
                      <SubText>{experience.location}</SubText>
                    </Details>
                    <Details>
                      <SubTitle>Technologies</SubTitle>
                      <SubText>{experience.technology}</SubText>
                    </Details>
                  </div>
                </VerticalTimelineElement>
              );
            })
          : null}
      </VerticalTimeline>
    </Container>
  );
};

export default Experience;
