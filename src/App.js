import "./App.css";
import { ResetStyle, GlobalStyle } from "./globalStyle";

import React, { useState, useContext, useCallback, useEffect } from "react";
import styled from "styled-components";

import AsideBar from "./components/AsideBar/AsideBar";
import Main from "./components/Main/Main";

import ContextStore from "./context/globalContext";
import AudioProvider from "./context/audioContext";

const StyledApp = styled.main`
   font-size: 20px;
   display: flex;
`;

const initState = {
   albums: ["Maroon 5", "Jay", "Louis"],
   songs: {
      "Maroon 5": [{ name: "Sugar" }, { name: "A" }, { name: "B" }],
      Louis: [{ name: "C" }, { name: "D" }],
      Jay: [{ name: "E" }, { name: "F" }],
   },
   activeAlbum: 0,
   activeSong: 0,
   nowPlaying: {
      album: "Maroon 5",
      song: "Sugar",
   },
};

function App() {
   const [state, setState] = useState(initState);
   const setGlobalState = (partState) => setState({ ...state, ...partState });
   const { songs, albums, activeAlbum, activeSong, nowPlaying } = state;

   return (
      <ContextStore.Provider
         value={{
            globalState: state,
            setGlobalState,
         }}
      >
         <AudioProvider src={`./song/${nowPlaying.song}.mp3`}>
            <StyledApp>
               <ResetStyle />
               <GlobalStyle />
               <AsideBar />
               <Main />
            </StyledApp>
         </AudioProvider>
      </ContextStore.Provider>
   );
}

export default App;
