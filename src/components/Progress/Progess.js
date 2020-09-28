import React, { useState, useContext, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";

const StylesProgress = styled.div`
   background-color: rgba(54, 54, 54, 0.8);
   position: relative;
   cursor: pointer;
   .colorBar {
      width: ${(props) => props.percent}%;
      height: 5px;
      background-image: linear-gradient(to right, var(--purple1), var(--orange1));
   }

   .circle {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--white1);
      position: absolute;
      top: -3px;
      left: ${(props) => props.percent}%;
   }
`;

const Progress = ({ currentTime, duration, onClick }) => {
   const percent = ((currentTime * 100) / duration).toFixed(2);

   return (
      <StylesProgress percent={percent} onClick={onClick}>
         <div className="colorBar"></div>
         <div className="circle"></div>
      </StylesProgress>
   );
};

export default Progress;
