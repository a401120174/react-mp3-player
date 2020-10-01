import React, { useState, useContext, useCallback, useEffect } from "react";
import styled from "styled-components";

import ContextStore from "../../context/globalContext";

const Wrapper = styled.aside`
   width: 200px;
   background-color: var(--black3);
   height: 100vh;
   display: flex;
   flex-direction: column;
   position: relative;
   z-index: 2;
   box-shadow: 5px 0px 15px rgba(0, 0, 0, 0.4);
`;

const Title = styled.div`
   background-color: var(--black1);
   padding: 20px 25px;
   color: var(--white1);
   font-size: var(--fzM);
   display: flex;
   align-items: center;
   font-weight: bold;
   i {
      margin-right: 10px;
   }
`;

const Ul = styled.ul`
   flex-grow: 1;
`;

const Li = styled.li`
   cursor: pointer;
   padding: 15px 25px;
   color: var(--gray2);
   font-size: var(--fzS);
   color: ${(props) => (props.active ? "var(--white1)" : "var(--gray1)")};
   background: ${(props) => (props.active ? `var(--liner)` : "")};
   &:hover {
      color: #e3b8ff;
      text-shadow: 0 0px 15px #bf89e2;
   }
`;

const NowPlaying = styled.div`
   height: 210px;
   background-image: url("./img/Maroon 5.jpg");
   background-size: cover;
   background-position: center;
   display: flex;
   flex-direction: column;
   position: relative;
   .title {
      padding: 16px 25px 8px;
      color: var(--white1);
      font-size: var(--fzM);
      background-color: rgba(0, 0, 0, 0.5);
   }
   .album {
      padding: 0 25px;
      color: var(--orange1);
      font-size: var(--fzM);
      flex-grow: 1;
      text-shadow: 0 0px 7px #f5705d;
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
   }
   .song {
      padding: 16px 25px;
      color: var(--purple2);
      font-size: var(--fzL);
      text-shadow: 0 0px 7px #811dc5;
      background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
   }
`;

const AsideBar = () => {
   const { globalState, setGlobalState } = useContext(ContextStore);
   const { albums, activeAlbum, nowPlaying } = globalState;

   return (
      <Wrapper>
         <Title>
            <i class="material-icons">library_music</i>
            <span>My Albums</span>
         </Title>
         <Ul>
            {albums.map((li, idx) => (
               <Li
                  onClick={() => setGlobalState({ activeAlbum: idx })}
                  active={idx === activeAlbum}
               >
                  {li}
               </Li>
            ))}
         </Ul>
         <NowPlaying>
            <div className="title">Now Playing</div>
            <div className="album">{nowPlaying.album}</div>
            <div className="song">{nowPlaying.song}</div>
         </NowPlaying>
      </Wrapper>
   );
};

export default AsideBar;
