import styled from "styled-components";
import { devices } from "../../../utils/styledConstants";
export const AdminWrappr = styled.div`
  min-height: 100vh;
  width: 87%;
  margin: auto;
  padding-top: 1.5rem;
  position: relative;
  margin-bottom: 2rem;

  @media ${devices.lg} {
    width: 80%;
    
  }
`;
