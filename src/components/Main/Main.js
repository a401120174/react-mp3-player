import React, { useState, useContext, useCallback, useEffect } from "react";
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
  /* height: 100vh;
   display: flex;
   flex-direction: column; */
`;

const Background = styled.div`
  background-color: green;
  height: 40%;
  background-image: url("./img/${(props) => props.img}.jpg");
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
  padding: 0 55px;
  position: relative;
  z-index: 2;
  /* background-color: green; */
  /* height: 330px; */
  /* height: 100vh;
   display: flex;
   flex-direction: column; */
`;

const MusicDesc = styled.div`
  margin: -130px 0 50px;
  display: flex;
  .left {
    width: 185px;
    height: 185px;
    background-color: red;
    img {
      width: 185px;
      height: 185px;
    }
  }

  .mid {
    padding-left: 25px;
    color: var(--white1);
    flex-grow: 1;
    .album {
      font-size: 40px;
      margin-bottom: 35px;
    }
  }
`;

const List = styled.ul``;

const StyledItem = styled.li`
  cursor: pointer;
  color: var(--white1);

  padding: 15px 25px;
  display: flex;
  background-color: ${(props) =>
    props.idx % 2 === 1 ? "var(--black2)" : "var(--black3)"};

  .play {
    padding: 0 10px;
  }
  .name {
    flex-grow: 1;
  }
`;

const Item = ({ name, time, idx }) => {
  return (
    <StyledItem idx={idx}>
      <div>{idx + 1}</div>
      <div className="play">O</div>
      <div className="name">{name}</div>
      <div>{time}</div>
    </StyledItem>
  );
};

const Main = () => {
  const {
    albums,
    activeAlbum,
    setActiveAlbum,
    songs,
    activeSong,
    setActiveSong,
  } = useContext(ContextStore);

  const activeSongs = songs[albums[activeAlbum]];
  const album = albums[activeAlbum];

  return (
    <Wrapper>
      <Content>
        <Background img={album} />
        <PlayList>
          <MusicDesc>
            <div className="left">
              <img src={`./img/${album}.jpg`}></img>
            </div>
            <div className="mid">
              <div className="album">Youtube Music</div>
              <div className="singer">平到</div>
            </div>
            <div className="right">
              <div>+ 新增至我的專輯</div>
              <div>6</div>
            </div>
          </MusicDesc>
          <List>
            {activeSongs.map((song, idx) => (
              <Item name={song.name} time={song.time} idx={idx} key={idx} />
            ))}
          </List>
        </PlayList>
      </Content>
      <ControlBar />
    </Wrapper>
  );
};

export default Main;
