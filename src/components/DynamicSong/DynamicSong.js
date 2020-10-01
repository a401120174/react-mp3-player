import React, { useState, useContext, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import AudioProvider, { useAudio } from "../../context/audioContext";

const songStr = `
[00:00.00](ready to start!!)
[00:18.60]I’m hurting baby,宝贝我心如刀割
[00:20.06]I’m broken down宝贝我几欲崩溃
[00:22.39]I need your loving, loving此时急需你的爱
[00:24.51]I need it now没法再拖延一秒
[00:26.37]When I’m without you没有你的日子里
[00:28.14]I’m something weak我变得脆弱无力
[00:30.16]You got me begging, begging为了得到你的爱
[00:32.39]I’m on my knees我愿意屈膝跪舔
[00:34.37]I don’t wanna be needing your love我不希望像现在这样苦苦哀求你的爱
[00:36.48]I just wanna be deep in your love我只希望沉浸在你的爱海里沉醉不醒`;

const StyledDynamicSong = styled.div`
   transition: 0.5s;
   height: 100px;
   overflow: hidden;
   background-color: rgba(0, 0, 0, 0.6);
   > div {
      transform: ${(props) => `translateY(-${props.active * 20}px)`};
   }
`;

const SingStr = styled.p`
   transition: 0.5s;
   line-height: 1.5;
   color: ${(props) => (props.active ? "var(--white1)" : "var(--gray1)")};
   text-align: center;
   font-size: ${(props) => (props.active ? "32px" : "16px")};
`;

const DynamicSong = ({}) => {
   const { state } = useAudio();
   const [nowSinging, setNowSinging] = useState(0);

   const songArr = songStr.split("\n").map((str) => {
      const minute = +str.substring(1, 3);
      const second = +str.substring(4, 6);
      return {
         time: minute * 60 + second,
         songStr: str.substring(10),
      };
   });

   songArr.shift();

   useEffect(() => {
      let index = 0;

      while (songArr[index + 1] && state.time > songArr[index + 1].time) {
         index++;
      }

      setNowSinging(index);
   }, [state.time]);
   return (
      <StyledDynamicSong active={nowSinging}>
         <div>
            {songArr.map((item, idx) => (
               <SingStr active={idx === nowSinging}>{item.songStr}</SingStr>
            ))}
         </div>
      </StyledDynamicSong>
   );
};

export default DynamicSong;
