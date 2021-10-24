import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { School } from "@styled-icons/fa-solid/School";
import { University } from "@styled-icons/fa-solid/University";

//Local assets
import SPPU from "../Assets/Images/sppu.jpg";
import MSBTE from "../Assets/Images/msbte.jpg";
import SSC from "../Assets/Images/ssc.png";
import {
  CardHeader,
  CardTitle,
  Container,
  Details,
  UniversityIcon,
  LogoCertificate,
  SubText,
  SubTitle,
  Title,
} from "./Styles";

const Education = () => {
  const theme = useContext(ThemeContext);

  const educationList = [
    {
      title: "Bachelor of Engineering",
      university: "Savitribai Phule Pune University",
      date: "2017-2020 (3 Years)",
      unitMrk: "CGPA",
      marks: "6.96",
      isCollege: true,
      institute: "Sanghavi College of Engineering",
      logo: <University />,
      icon: SPPU,
    },
    {
      title: "Polytechnic",
      university: "Maharashtra State Board of Technical Education",
      date: "2014-2017 (3 Years)",
      unitMrk: "Percentage",
      marks: "67.65%",
      isCollege: true,
      institute: "Mahavir Polytechnic",
      logo: <University />,
      icon: MSBTE,
    },
    {
      title: "10th Class",
      university: "SSC Maharashtra Board",
      date: "2014",
      unitMrk: "Percentage",
      marks: "68.60%",
      isCollege: false,
      institute: "St. Lawrence High School",
      logo: <School />,
      icon: SSC,
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
        {educationList.length
          ? educationList.map((education) => {
              return (
                <VerticalTimelineElement date={education.date} icon={education.logo} {...vteSettings}>
                  <div>
                    <CardHeader>
                      <CardTitle className='vertical-timeline-element-title'>{education.title}</CardTitle>
                      {/* <a href='#' target='_blank' rel='noreferrer' title='Certificate'> */}
                      <LogoCertificate />
                      {/* </a> */}
                    </CardHeader>
                    <Details>
                      <SubTitle>University</SubTitle>
                      <SubText>{education.university}</SubText>
                    </Details>
                    <Details>
                      <SubTitle>{education.unitMrk}</SubTitle>
                      <SubText>{education.marks}</SubText>
                    </Details>
                    <Details>
                      <SubTitle>{education.isCollege ? "College" : "School"}</SubTitle>
                      <SubText>{education.institute}</SubText>
                    </Details>
                    <UniversityIcon src={education.icon} alt={education.university} />
                  </div>
                </VerticalTimelineElement>
              );
            })
          : null}
      </VerticalTimeline>
    </Container>
  );
};

export default Education;
