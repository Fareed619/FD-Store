/* eslint-disable react/prop-types */
import { styled } from "styled-components";

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <ProgressWrapper step1={step1} step2={step2} step3={step3}>
      <div className="step-1">1</div>
      <span className="span-step1"></span>
      <div className="div-step-2">2</div>
      <span className="span-step2"></span>
      <div className="div-step-3">3</div>
    </ProgressWrapper>
  );
};

export default ProgressSteps;

const ProgressWrapper = styled.div`
  display: flex;
  padding-top: 3rem;
  padding-bottom: 4rem;
  justify-content: center;
  position: relative;

  div {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .step-1 {
    background-color: ${(props) => (props.step1 ? "green" : "gray")};
  }
  .div-step-2 {
    background-color: ${(props) =>
      props.step1 && props.step2 ? "green" : "gray"};
  }
  .div-step-3 {
    background-color: ${(props) =>
      props.step1 && props.step2 && props.step3 ? "green" : "gray"};
  }
  .span-step1 {
    height: 5px;
    background-color: green;
    width: 20%;
    margin-top: 1.5rem;
    background-color: ${(props) =>
      props.step1 && props.step2 ? "green" : "gray"};
    transition: all 0.4s ease;
  }
  .span-step2 {
    height: 5px;
    background-color: green;
    width: 20%;
    margin-top: 1.5rem;
    background-color: ${(props) =>
      props.step1 && props.step2 && props.step3 ? "green" : "gray"};
    transition: all 0.4s ease;
  }
`;
