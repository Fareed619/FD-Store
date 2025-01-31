import styled from "styled-components";
import { devices } from "../../../utils/styledConstants";

// all span
export const Span = styled.span`
  visibility: hidden;
  /* Todo => diplay in good way */
  /* display: none; */
  opacity: 0;
  transition: visibility 0s, opacity 0.4s linear;
`;

// styled sidebar
export const SidebarWrapper = styled.div`
  width: 4.5rem;
  height: 100vh;
  background-color: #000000bf;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 25px;
  justify-content: space-between;
  transition: all ease 0.4s;
  position: fixed;
  z-index: 999999999;

  &:hover {
    width: 14rem;
    ${Span} {
      visibility: visible;
      /* Todo => diplay in good way */
      /* display: block; */
      opacity: 1;
    }
  }

  .sidebar-top {
    .sidebar-route {
      font-size: 23px;
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 25px;
      height: 30px;
      color: white;
      /* opacity: 0.7; */
    }
  }

  .sidebar-bottom {
    padding-bottom: 30px;
    width: 100%;

    .sidebar-bottom-dropdown {
      font-size: 21px;
      display: flex;
      align-items: center;
      gap: 12px;
      height: 30px;
      width: 100%;
    }
  }
  .sidebar-exit {
    position: absolute;
    top: 8px;
    right: -10px;
    font-size: 20px;
    cursor: pointer;
    display: none;
  }

  @media ${devices.md} {
    width: 14rem;
    display: ${(props) => (props.navbar ? "flex" : "none")};
    ${Span} {
      visibility: visible;
      opacity: 1;
    }
    .sidebar-top {
      width: 100%;
    }
    .sidebar-bottom {
      width: 100%;
    }
    .sidebar-route {
      width: 100%;
      margin: auto;
      margin-top: 25px;
    }
    .sidebar-exit {
      display: block;
    }
    .sidebar-bottom-dropdown {
      width: 50%;
      margin: auto;
    }
  }
`;
// dropdown div
export const DropdownDiv = styled.div`
  display: ${(props) => (props.opendropdown ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: rgba(0, 0, 0, 0.742);
  width: 80%;
  /* margin: auto; */
  margin-top: 10px;
  border-radius: 6px;
  padding: 10px 0;

  .sidebar-bottom-link {
    background: #aaaaaa5e;
    padding: 4px 0;
    width: 80%;
    border-radius: 3px;
    text-align: center;
    transition: ease all 0.4s;
    color: white;

    &:hover {
      transform: scale(1.1);
    }
  }

  /* @media ${devices.md} {
    margin-left: 9rem;
    width: 30%;
  }
  @media ${devices.sm} {
    margin: auto;
    width: 50%;
  } */
`;

export const CustomSpanIcon = styled.span`
  position: absolute;
  top: -10px;
  left: 16px;
  font-size: 16px;
  background: var(--primary-clr-pink);
  border-radius: 50%;
  padding: 0 6px;

  /* @media ${devices.md} {
    top: 7px;
    left: 85%;
  } */
  /* @media ${devices.sm} {
    top: 5px;
    left: 80%;
  } */
`;
