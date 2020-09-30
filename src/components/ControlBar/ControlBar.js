import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import styled from "styled-components";

import ContextStore from "../../context/globalContext";
import AudioProvider, { useAudio } from "../../context/audioContext";
import Progress from "../Progress/Progess";

const Wrapper = styled.div`
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

  return `${minute < 10 ? "0" : ""}${minute}:${
    second < 10 ? "0" : ""
  }${second}`;
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
  const [volume, setVolume] = useState(100);

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
    // console.log(percent);
    setVolume(percent);
    // controls.setCurrentTime(Math.floor((state.duration / 100) * percent));
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
        <Volume percent={volume} onClick={handleVolumeClick} />
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
      background-image: linear-gradient(
        to right,
        var(--purple1),
        var(--orange1)
      );
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
      <i class="material-icons">volume_up</i>
      <div className="barWrapper" onClick={onClick}>
        <div className="colorBar"></div>
        <div className="circle"></div>
      </div>
    </StyledVolume>
  );
};

const StyledBtn = styled.button`
  color: ${(props) => (props.active ? "var(--purple1)" : "var(--white1)")};
  cursor: pointer;
  i {
    font-size: ${(props) => (props.size === "M" ? "42px" : "26px")};
  }

  &:hover {
    color: var(--purple1);
    transition: transform 0.1s;
    transform: scale(1.1);
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
