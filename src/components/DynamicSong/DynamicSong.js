import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAudio } from "../../context/audioContext";
import { song } from "../../source";

const StyledDynamicSong = styled.div`
   transition: 0.5s;
   height: 98px;
   overflow: hidden;
   background-color: rgba(0, 0, 0, 0.6);
   > div {
      transform: ${(props) => `translateY(-${props.active * 24}px)`};
   }
`;

const SingStr = styled.p`
   transition: 0.5s;
   line-height: 1.5;
   color: ${(props) => (props.active ? "var(--white1)" : "var(--gray1)")};
   text-align: center;
   font-size: ${(props) => (props.active ? "30px" : "16px")};
`;

const DynamicSong = () => {
   const { state } = useAudio();
   const [nowSinging, setNowSinging] = useState(0);
   const [loading, setLoading] = useState(false);
   const [songArr, setSongArr] = useState([]);

   useEffect(() => {
      if (!state.src) return;
      const getText = async () => {
         setLoading(true);
         fetch(song[state.src].lrc)
            .then((r) => r.text())
            .then((text) => {
               const songArr = text.split("\n").map((str) => {
                  const minute = +str.substring(1, 3);
                  const second = +str.substring(4, 6);
                  return {
                     time: minute * 60 + second,
                     songStr: str.substring(10),
                  };
               });
               setSongArr(songArr);
               setLoading(false);
            })
            .catch((err) => {});
      };
      getText();
   }, [state.src]);

   useEffect(() => {
      if (loading) {
         return;
      }

      let index = 0;

      while (songArr[index + 1] && state.time > songArr[index + 1].time) {
         index++;
      }

      setNowSinging(index);
   }, [state.time, loading]);

   return (
      <StyledDynamicSong active={nowSinging}>
         {loading ? (
            <div>loading</div>
         ) : (
            <div>
               {songArr.map((item, idx) => (
                  <SingStr active={idx === nowSinging} key={idx}>
                     {item.songStr}
                  </SingStr>
               ))}
            </div>
         )}
      </StyledDynamicSong>
   );
};

export default DynamicSong;
