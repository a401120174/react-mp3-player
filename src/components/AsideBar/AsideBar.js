import React, { useState, useContext, useCallback, useEffect } from "react";
import styled from "styled-components";

import ContextStore from "../../context/globalContext";

const Wrapper = styled.aside`
   width: 200px;
   background-color: var(--black3);
   height: 100vh;
   display: flex;
   flex-direction: column;
`;

const Title = styled.div`
   background-color: var(--black1);
   padding: 20px 25px;
   color: var(--gray1);
   font-size: var(--fzM);
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
   background: ${(props) =>
      props.active
         ? `linear-gradient(
   to right,
   rgba(57, 39, 255, 0.1),
   rgba(255, 168, 131, 0.1)
)`
         : ""};

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
      color: var(--gray1);
      font-size: var(--fzM);
      flex-grow: 1;
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
   }
   .song {
      padding: 16px 25px;
      color: var(--white1);
      font-size: var(--fzL);
      background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
   }
`;

const AsideBar = () => {
   const {
      albums,
      activeAlbum,
      setActiveAlbum,
      songs,
      activeSong,
      setActiveSong,
   } = useContext(ContextStore);
   // const albums = [];
   return (
      <Wrapper>
         <Title>My Albums</Title>
         <Ul>
            {albums.map((li, idx) => (
               <Li onClick={() => setActiveAlbum(idx)} active={idx === activeAlbum}>
                  {li}
               </Li>
            ))}
         </Ul>
         <NowPlaying>
            <div className="title">現在播放</div>
            <div className="album">{albums[activeAlbum]}</div>
            <div className="song">{songs[albums[activeAlbum]][activeSong].name}</div>
         </NowPlaying>
      </Wrapper>
   );
};

export default AsideBar;
