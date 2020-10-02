import React from "react";
import styled from "styled-components";

const StylesProgress = styled.div`
   background-color: rgba(54, 54, 54, 0.8);
   position: relative;
   cursor: pointer;
`;

const StyledCircle = styled.div.attrs((props) => ({
   style: {
      left: props.percent > 98 ? 98 : props.percent + "%",
   },
}))`
   width: 10px;
   height: 10px;
   border-radius: 50%;
   background-color: var(--white1);
   position: absolute;
   top: -3px;
`;

const StyledColorBar = styled.div.attrs((props) => ({
   style: {
      width: props.percent + "%",
   },
}))`
   height: 5px;
   background-image: linear-gradient(to right, var(--purple1), var(--orange1));
`;

const Progress = ({ currentTime, duration, onClick }) => {
   const percent = ((currentTime * 100) / duration).toFixed(2);
   return (
      <StylesProgress onClick={onClick}>
         <StyledColorBar percent={percent} />
         <StyledCircle percent={percent} />
      </StylesProgress>
   );
};

export default Progress;
