import React, { useState, useContext, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";

import ContextStore from "../../context/globalContext";
import AudioProvider, { useAudio } from "../../context/audioContext";
import Progress from "../Progress/Progess";

const Wrapper = styled.div`
   background-color: var(--black2);
`;

const ProgressBar = styled.div`
   background-color: var(--black2);
`;

const CommandBar = styled.div`
   background-color: var(--black2);
   display: flex;
   justify-content: space-between;
   color: var(--white1);
   align-items: center;
   padding: 10px;
   .command {
      width: 300px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
   }
`;

const toTimeStr = (num) => {
   const minute = Math.floor(num / 60);
   const second = Math.floor(num % 60);

   return `${minute < 10 ? "0" : ""}${minute}:${second < 10 ? "0" : ""}${second}`;
};

const ControlBar = () => {
   const {
      albums,
      activeAlbum,
      setActiveAlbum,
      songs,
      activeSong,
      setActiveSong,
   } = useContext(ContextStore);
   const { state, controls } = useAudio();

   const handleProgressClick = (e) => {
      const clickX = e.clientX;
      const eleX = e.currentTarget.getBoundingClientRect().left;
      const eleWidth = e.currentTarget.offsetWidth;
      const percent = ((clickX - eleX) * 100) / eleWidth;
      console.log(percent);
      controls.setCurrentTime(Math.floor((state.duration / 100) * percent));
   };

   return (
      <Wrapper>
         <Progress
            currentTime={state.time}
            duration={state.duration}
            onClick={handleProgressClick}
         />
         <CommandBar>
            <div>
               {toTimeStr(state.time)} / {toTimeStr(state.duration)}
            </div>
            <div className="command">
               <Btn icon="shuffle" />
               <Btn icon="skip_previous" />
               <Btn
                  icon={state.paused ? "play_circle_outline" : "pause_circle_outline"}
                  size="M"
                  onClick={() => (state.paused ? controls.play() : controls.pause())}
               />
               <Btn icon="skip_next" />
               <Btn icon="repeat" />
            </div>
            <div>00:00/22:00</div>
            {state.buffered.start}/{state.buffered.end}
         </CommandBar>
      </Wrapper>
   );
};

const StyledBtn = styled.button`
   color: ${(props) => (props.active ? "var(--purple1)" : "var(--white1)")};
   transition: 0.5s;

   i {
      font-size: ${(props) => (props.size === "M" ? "42px" : "26px")};
   }

   &:hover {
      color: var(--purple1);
   }
`;

const Btn = ({ active, onClick, icon, size = "S" }) => {
   return (
      <StyledBtn onClick={onClick} active={active} size={size}>
         <i class="material-icons">{icon}</i>
      </StyledBtn>
   );
};

export default ControlBar;
