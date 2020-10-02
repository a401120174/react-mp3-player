import React, { useContext } from "react";
import { useAudio } from "../../context/audioContext";
import styled from "styled-components";

import ContextStore from "../../context/globalContext";

import ControlBar from "../ControlBar/ControlBar";

const Wrapper = styled.div`
   background-color: var(--black2);
   height: 100vh;
   display: flex;
   flex-direction: column;
   flex-grow: 1;
`;

const Content = styled.div`
   background-color: var(--black2);
   flex-grow: 1;
   overflow: auto;
   &::-webkit-scrollbar {
      width: 12px;
      background-color: var(--gray2);
   }

   &::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #555;
   }
`;

const Background = styled.div`
   background-color: green;
   height: 40%;
   background-image: url("./react-mp3-player/img/${(props) => props.img}.jpg");
   background-size: cover;
   background-position: center;
   position: relative;

   &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(22, 22, 22, 0.8);
      z-index: 1;
   }
`;

const PlayList = styled.div`
   padding: 0 55px 55px;
   position: relative;
   z-index: 2;
`;

const MusicDesc = styled.div`
   margin: -100px 0 50px;
   display: flex;
   .left {
      width: 185px;
      height: 185px;
      background-color: red;
      box-shadow: 3px 6px 10px rgba(0, 0, 0, 0.6);
      img {
         width: 185px;
         height: 185px;
      }
   }

   .mid {
      padding-left: 25px;
      color: var(--white1);
      flex-grow: 1;
      font-weight: bold;
      .album {
         font-size: 40px;
         margin-bottom: 30px;
      }
      .singer {
         color: var(--gray1);
      }
   }
`;

const List = styled.ul``;

const StyledItem = styled.li`
   color: var(--white1);
   padding: 15px 25px;
   display: flex;
   font-size: 18px;
   align-items: center;
   background-color: ${(props) =>
      props.idx % 2 === 1 ? "var(--black2)" : "var(--black3)"};
   > div {
      margin-right: 10px;
   }
   .play {
      padding: 0 10px;
   }
   i {
      opacity: ${(props) => (props.isPlaying ? 1 : 0)};
      cursor: pointer;
      font-size: 24px;
   }
   .name {
      flex-grow: 1;
      text-align: center;
   }
   &:hover {
      background: var(--liner);
      i {
         opacity: 1;
      }
   }
`;

const Item = ({ name, time, isPlaying, onClick, idx }) => {
   return (
      <StyledItem idx={idx} isPlaying={isPlaying}>
         <div>{idx + 1}</div>
         <div className="play" onClick={() => onClick(idx)}>
            <i className="material-icons">
               {isPlaying ? "pause_circle_outline" : "play_circle_outline"}
            </i>
         </div>
         <div className="name">{name}</div>
         <div>{time}</div>
      </StyledItem>
   );
};

const Main = () => {
   const { globalState, setGlobalState } = useContext(ContextStore);
   const { albums, activeAlbum, songs, nowPlaying } = globalState;

   const { state, controls } = useAudio();

   const activeSongs = songs[albums[activeAlbum]];
   const album = albums[activeAlbum];

   const handleClickPlay = (idx) => {
      if (nowPlaying.song === activeSongs[idx].name) {
         state.paused ? controls.play() : controls.pause();
      } else {
         setGlobalState({ nowPlaying: { album, song: activeSongs[idx].name, idx } });
      }
   };

   return (
      <Wrapper>
         <Content>
            <Background img={album} />
            <PlayList>
               <MusicDesc>
                  <div className="left">
                     <img src={`./react-mp3-player/img/${album}.jpg`} alt="album"></img>
                  </div>
                  <div className="mid">
                     <div className="album">{album}</div>
                     <div className="singer">Red Pill Blues</div>
                  </div>
               </MusicDesc>
               <List>
                  {activeSongs.map((song, idx) => (
                     <Item
                        name={song.name}
                        time={song.time}
                        idx={idx}
                        key={idx}
                        onClick={handleClickPlay}
                        isPlaying={song.name === nowPlaying.song && !state.paused}
                     />
                  ))}
               </List>
            </PlayList>
         </Content>
         <ControlBar />
      </Wrapper>
   );
};

export default Main;
