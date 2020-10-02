import React, { useEffect, useRef, useState, createContext, useContext } from "react";

const parseTimeRange = (ranges) =>
   ranges.length < 1
      ? {
           start: 0,
           end: 0,
        }
      : {
           start: ranges.start(0),
           end: ranges.end(0),
        };

const AudioContext = createContext(null);

const AudioProvider = ({ src, children }) => {
   const [state, setOrgState] = useState({
      buffered: {
         start: 0,
         end: 0,
      },
      time: 0,
      duration: 0,
      paused: true,
      waiting: false,
      playbackRate: 1,
      endedCallback: null,
      src: "",
      volume: 100,
   });
   const setState = (partState) => setOrgState({ ...state, ...partState });
   const ref = useRef(null);
   const firstTime = useRef(true);

   useEffect(() => {
      setState({ src });
      if (!firstTime.current) {
         controls.play();
      }
      firstTime.current = false;
   }, [src]);

   const element = React.createElement("audio", {
      src: `./react-mp3-player/song/${src}.mp3`,
      controls: false,
      id: "audio",
      ref,
      onPlay: () => setState({ paused: false }),
      onPause: () => setState({ paused: true }),
      onWaiting: () => setState({ waiting: true }),
      onPlaying: () => setState({ waiting: false }),
      onEnded: state.endedCallback,
      onDurationChange: () => {
         const el = ref.current;
         if (!el) {
            return;
         }
         const { duration, buffered } = el;
         setState({
            duration,
            buffered: parseTimeRange(buffered),
         });
      },
      onTimeUpdate: () => {
         const el = ref.current;
         if (!el) {
            return;
         }

         setState({ time: el.currentTime });
      },
      onProgress: () => {
         const el = ref.current;
         if (!el) {
            return;
         }
         setState({ buffered: parseTimeRange(el.buffered) });
      },
   });

   let lockPlay = false;

   const controls = {
      play: () => {
         const el = ref.current;
         if (!el) {
            return undefined;
         }
         if (!lockPlay) {
            const promise = el.play();
            const isPromise = typeof promise === "object";

            if (isPromise) {
               lockPlay = true;
               const resetLock = () => {
                  lockPlay = false;
               };
               promise.then(resetLock, resetLock);
            }

            return promise;
         }
         return undefined;
      },
      pause: () => {
         const el = ref.current;
         if (el && !lockPlay) {
            return el.pause();
         }
      },
      seek: (time) => {
         const el = ref.current;
         if (!el || state.duration === undefined) {
            return;
         }
         time = Math.min(state.duration, Math.max(0, time));
         el.currentTime = time || 0;
      },
      // 設定播放速度
      setPlaybackRate: (rate) => {
         const el = ref.current;
         if (!el || state.duration === undefined) {
            return;
         }

         setState({
            playbackRate: rate,
         });
         el.playbackRate = rate;
      },
      setCurrentTime: (time) => {
         const el = ref.current;
         if (!el) {
            return;
         }

         el.currentTime = time;

         setState({
            time,
         });
      },
      setVolume: (percent) => {
         const el = ref.current;
         if (!el) {
            return;
         }

         el.volume = (percent / 100).toFixed(1);

         setState({
            volume: percent.toFixed(1),
         });
      },
      setEndedCallback: (callback) => {
         setState({ endedCallback: callback });
      },
   };

   //    useEffect(() => {
   //       const el = ref.current;
   //       setState({
   //          paused: el.paused,
   //       });

   //       controls.setPlaybackRate(startPlaybackRate);

   //       if (autoPlay && el.paused) {
   //          controls.play();
   //       }
   //    }, [src]);

   return (
      <AudioContext.Provider
         value={{
            state,
            controls,
         }}
      >
         {children}
         {element}
      </AudioContext.Provider>
   );
};

const useAudio = () => useContext(AudioContext);

export { useAudio };
export default AudioProvider;

// export default ({ src, autoPlay = false, startPlaybackRate = 1 }) => {
//    const [state, setOrgState] = useState({
//       buffered: {
//          start: 0,
//          end: 0,
//       },
//       time: "00:00",
//       duration: "00:00",
//       paused: true,
//       waiting: false,
//       playbackRate: 1,

//       endedCallback: null,
//    });
//    const setState = (partState) => setOrgState({ ...state, ...partState });
//    const ref = useRef(null);

//    const element = React.createElement("audio", {
//       src,
//       controls: false,
//       ref,
//       onPlay: () => setState({ paused: false }),
//       onPause: () => setState({ paused: true }),
//       onWaiting: () => setState({ waiting: true }),
//       onPlaying: () => setState({ waiting: false }),
//       onEnded: state.endedCallback,
//       onDurationChange: () => {
//          const el = ref.current;
//          if (!el) {
//             return;
//          }
//          const { duration, buffered } = el;
//          setState({
//             duration: toTimeStr(duration),
//             buffered: parseTimeRange(buffered),
//          });
//       },
//       onTimeUpdate: () => {
//          const el = ref.current;
//          if (!el) {
//             return;
//          }
//          console.log(el.currentTime);
//          console.log(toTimeStr(el.currentTime));

//          setState({ time: toTimeStr(el.currentTime) });
//       },
//       onProgress: () => {
//          const el = ref.current;
//          if (!el) {
//             return;
//          }
//          setState({ buffered: parseTimeRange(el.buffered) });
//       },
//    });

//    let lockPlay = false;

//    const controls = {
//       play: () => {
//          const el = ref.current;
//          if (!el) {
//             return undefined;
//          }

//          if (!lockPlay) {
//             const promise = el.play();
//             const isPromise = typeof promise === "object";

//             if (isPromise) {
//                lockPlay = true;
//                const resetLock = () => {
//                   lockPlay = false;
//                };
//                promise.then(resetLock, resetLock);
//             }

//             return promise;
//          }
//          return undefined;
//       },
//       pause: () => {
//          const el = ref.current;
//          if (el && !lockPlay) {
//             return el.pause();
//          }
//       },
//       seek: (time) => {
//          const el = ref.current;
//          if (!el || state.duration === undefined) {
//             return;
//          }
//          time = Math.min(state.duration, Math.max(0, time));
//          el.currentTime = time || 0;
//       },
//       // 設定播放速度
//       setPlaybackRate: (rate) => {
//          const el = ref.current;
//          if (!el || state.duration === undefined) {
//             return;
//          }

//          setState({
//             playbackRate: rate,
//          });
//          el.playbackRate = rate;
//       },
//       setEndedCallback: (callback) => {
//          setState({ endedCallback: callback });
//       },
//    };

//    useEffect(() => {
//       const el = ref.current;
//       setState({
//          paused: el.paused,
//       });

//       controls.setPlaybackRate(startPlaybackRate);

//       if (autoPlay && el.paused) {
//          controls.play();
//       }
//    }, [src]);

//    return { element, state, controls };
// };