import "./App.css";
import { ResetStyle, GlobalStyle } from "./globalStyle";

import React, { useState, useContext, useCallback, useEffect } from "react";
import styled from "styled-components";

import AsideBar from "./components/AsideBar/AsideBar";
import Main from "./components/Main/Main";

import ContextStore from "./context/globalContext";
import AudioProvider, { useAudio } from "./context/audioContext";

const StyledApp = styled.main`
   font-size: 20px;
   display: flex;
`;

const state = {
   albums: ["Maroon 5", "Jay", "Louis"],
   songs: {
      "Maroon 5": [{ name: "Sugar" }],
   },
};

function App() {
   const [activeAlbum, setActiveAlbum] = useState(0);
   const [activeSong, setActiveSong] = useState(0);

   return (
      <ContextStore.Provider
         value={{
            ...state,
            activeAlbum,
            setActiveAlbum,
            activeSong,
            setActiveSong,
         }}
      >
         <AudioProvider
            src={`./song/${state.songs[state.albums[activeAlbum]][activeSong].name}.mp3`}
         >
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
