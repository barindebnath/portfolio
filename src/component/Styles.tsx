import styled from "styled-components";
import { ExternalLinkOutline } from "@styled-icons/evaicons-outline/ExternalLinkOutline";
import { GithubOutline } from "@styled-icons/evaicons-outline/GithubOutline";
import { Certificate } from "@styled-icons/fluentui-system-regular/Certificate";

export const Container = styled.div`
  padding: 2rem;
  flex: 1;
`;

export const Title = styled.h1`
  font-family: "SourceSansPro-Bold";
  color: ${({ theme }) => theme.primary};
  font-size: 3rem;
  margin: 0 0 2rem;
  text-transform: uppercase;
  transition: color 0.5s;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

export const CardTitle = styled.h3`
  font-family: "SourceSansPro-SemiBold";
  font-size: 1.5rem;
  margin-bottom: 0;
  transition: color 0.5s;
`;

export const Image = styled.img`
  max-width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 14px;
`;

export const Details = styled.div`
  margin-bottom: 1rem;
`;

export const SubTitle = styled.small`
  margin: 0;
  color: slategray;
  font-family: "SourceSansPro-Light";
`;

export const SubText = styled.h3`
  margin: 0;
  font-family: "SourceSansPro-Regular";
  font-weight: 400;
`;

export const UniversityIcon = styled.img`
  border-radius: 0.5rem;
  height: auto;
  position: absolute;
  opacity: 0.8;
  width: 7rem;
  bottom: 1rem;
  right: 1rem;
  padding: 0.2rem;
  background-color: #fff;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

//LOGOS

export const LogoLink = styled(ExternalLinkOutline)`
  height: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.secondary};
  transition: color 0.5s;
`;

export const LogoGitHub = styled(GithubOutline)`
  height: 1.5rem;
  color: ${({ theme }) => theme.secondary};
  transition: color 0.5s;
`;

export const LogoCertificate = styled(Certificate)`
  height: 1.5rem;
  color: ${({ theme }) => theme.secondary};
  transition: color 0.5s;
`;
