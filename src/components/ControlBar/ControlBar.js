import React, { useState, useContext } from "react";
import styled from "styled-components";

import ContextStore from "../../context/globalContext";
import { useAudio } from "../../context/audioContext";
import Progress from "../Progress/Progess";
import DynamicSong from "../DynamicSong/DynamicSong";

const Wrapper = styled.div`
   background-color: var(--black2);
`;

const CommandBar = styled.div`
   background-color: var(--black2);
   display: flex;
   justify-content: space-between;
   color: var(--white1);
   align-items: center;
   padding: 10px 30px;
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
   const { state, controls } = useAudio();
   const { globalState, setGlobalState } = useContext(ContextStore);
   const { albums, activeAlbum, songs, nowPlaying } = globalState;
   const [randomMode, setRandomMode] = useState(false);
   const [repeatMode, setRepeatMode] = useState(true);

   const handleProgressClick = (e) => {
      const clickX = e.clientX;
      const eleX = e.currentTarget.getBoundingClientRect().left;
      const eleWidth = e.currentTarget.offsetWidth;
      const percent = ((clickX - eleX) * 100) / eleWidth;
      controls.setCurrentTime(Math.floor((state.duration / 100) * percent));
   };

   const handleVolumeClick = (e) => {
      const clickX = e.clientX;
      const eleX = e.currentTarget.getBoundingClientRect().left;
      const eleWidth = e.currentTarget.offsetWidth;
      const percent = ((clickX - eleX) * 100) / eleWidth;
      controls.setVolume(percent);
   };

   const handleNextClick = () => {
      const activeSongs = songs[albums[activeAlbum]];
      let nextIdx = 0;
      if (randomMode) {
         nextIdx = Math.floor(Math.random() * activeSongs.length);
      } else {
         nextIdx = nowPlaying.idx + 1 >= activeSongs.length ? 0 : nowPlaying.idx + 1;
      }
      setGlobalState({
         nowPlaying: {
            ...nowPlaying,
            song: activeSongs[nextIdx].name,
            idx: nextIdx,
         },
      });
   };

   const handleBackClick = () => {
      if (state.time > 5 || nowPlaying.idx === 0) {
         controls.setCurrentTime(0);
      } else {
         const activeSongs = songs[albums[activeAlbum]];
         let nextIdx = nowPlaying.idx - 1;
         setGlobalState({
            nowPlaying: {
               ...nowPlaying,
               song: activeSongs[nextIdx].name,
               idx: nextIdx,
            },
         });
      }
   };

   return (
      <Wrapper>
         <DynamicSong />
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
               <Btn
                  icon="shuffle"
                  active={randomMode}
                  onClick={() => setRandomMode((prev) => !prev)}
               />
               <Btn icon="skip_previous" onClick={handleBackClick} />
               <Btn
                  icon={state.paused ? "play_circle_outline" : "pause_circle_outline"}
                  size="M"
                  onClick={() => (state.paused ? controls.play() : controls.pause())}
               />
               <Btn icon="skip_next" onClick={handleNextClick} />
               <Btn
                  icon="repeat"
                  active={repeatMode}
                  onClick={() => setRepeatMode((prev) => !prev)}
               />
            </div>
            <Volume percent={state.volume} onClick={handleVolumeClick} />
         </CommandBar>
      </Wrapper>
   );
};

const StyledVolume = styled.div`
   background-color: #282828;
   height: 5px;
   border-radius: 4.5px;
   position: relative;
   cursor: pointer;
   display: flex;
   flex-direction: row;
   align-items: center;
   i {
      display: block;
   }

   .barWrapper {
      width: 100px;
      border-radius: 4.5px;
      margin-left: 10px;
      position: relative;
      .colorBar {
         width: ${(props) => props.percent}%;
         height: 5px;
         border-radius: 4.5px;
         background-image: linear-gradient(to right, var(--purple1), var(--orange1));
      }

      .circle {
         width: 10px;
         height: 10px;
         border-radius: 50%;
         background-color: var(--white1);
         position: absolute;
         top: -2px;
         left: ${(props) => props.percent - 10}%;
      }
   }
`;

const Volume = ({ percent, onClick }) => {
   return (
      <StyledVolume percent={percent}>
         <i className="material-icons">volume_up</i>
         <div className="barWrapper" onClick={onClick}>
            <div className="colorBar"></div>
            <div className="circle"></div>
         </div>
      </StyledVolume>
   );
};

const StyledBtn = styled.button`
   color: ${(props) => (props.active ? "var(--purple1)" : "var(--white1)")};
   position: relative;
   cursor: pointer;
   i {
      font-size: ${(props) => (props.size === "M" ? "42px" : "26px")};
   }

   &:hover {
      color: var(--purple1);
      transition: transform 0.1s;
      transform: scale(1.1);
   }

   &::before {
      content: "";
      display: ${(props) => (props.active ? "block" : "none")};
      position: absolute;
      right: 0;
      left: 0;
      bottom: -5px;
      margin: auto;
      width: 5px;
      height: 5px;
      background-color: var(--purple1);
      border-radius: 50%;
   }
`;

const Btn = ({ active, onClick, icon, size = "S" }) => {
   return (
      <StyledBtn onClick={onClick} active={active} size={size}>
         <i className="material-icons">{icon}</i>
      </StyledBtn>
   );
};

export default ControlBar;
