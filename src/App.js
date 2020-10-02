import "./App.css";
import { ResetStyle, GlobalStyle } from "./globalStyle";

import React, { useState } from "react";
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
   albums: ["Maroon 5", "Alan Walker", "Coldplay", "Ariana Grande"],
   songs: {
      "Maroon 5": [
         { name: "One More Night", time: "03:42" },
         { name: "Girls Like You", time: "03:53" },
         { name: "Harder To Breathe", time: "02:55" },
         { name: "Memories", time: "03:09" },
         { name: "Nobody's Love", time: "03:30" },
      ],
      "Alan Walker": [
         { name: "Faded", time: "03:32" },
         { name: "Different World", time: "03:42" },
         { name: "All Falls Down", time: "03:40" },
         { name: "Baby Don't Go", time: "03:30" },
         { name: "Diamond Heart", time: "03:38" },
      ],
      Coldplay: [
         { name: "One More Night", time: "03:42" },
         { name: "Girls Like You", time: "03:53" },
         { name: "Harder To Breathe", time: "02:55" },
         { name: "Memories", time: "03:09" },
         { name: "Nobody's Love", time: "03:30" },
      ],
      "Ariana Grande": [
         { name: "Faded", time: "03:32" },
         { name: "Different World", time: "03:42" },
         { name: "All Falls Down", time: "03:40" },
         { name: "Baby Don't Go", time: "03:30" },
         { name: "Diamond Heart", time: "03:38" },
      ],
   },
   activeAlbum: 0,
   activeSong: 0,
   nowPlaying: {
      album: "Maroon 5",
      song: "One More Night",
      idx: 0,
   },
};

function App() {
   const [state, setState] = useState(initState);
   const setGlobalState = (partState) => setState({ ...state, ...partState });
   const { nowPlaying } = state;

   return (
      <ContextStore.Provider
         value={{
            globalState: state,
            setGlobalState,
         }}
      >
         <AudioProvider src={nowPlaying.song}>
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
