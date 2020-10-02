import AlanWalker from "./static/img/Alan Walker.jpg";
import ArianaGrande from "./static/img/Ariana Grande.jpg";
import Coldplay from "./static/img/Coldplay.jpg";
import Maroon5 from "./static/img/Maroon 5.jpg";

import AllFallsDown from "./static/lrc/All Falls Down.txt";
import Alone from "./static/lrc/Alone.txt";
import BabyDontGo from "./static/lrc/Baby Don't Go.txt";
import DiamondHeart from "./static/lrc/Diamond Heart.txt";
import DifferentWorld from "./static/lrc/Different World.txt";
import Faded from "./static/lrc/Faded.txt";
import GirlsLikeYou from "./static/lrc/Girls Like You.txt";
import HarderToBreathe from "./static/lrc/Harder To Breathe.txt";
import Memories from "./static/lrc/Memories.txt";
import NobodysLove from "./static/lrc/Nobody's Love.txt";
import OneMoreNight from "./static/lrc/One More Night.txt";

import AllFallsDown_song from "./static/song/All Falls Down.mp3";
import Alone_song from "./static/song/Alone.mp3";
import BabyDontGo_song from "./static/song/Baby Don't Go.mp3";
import DiamondHeart_song from "./static/song/Diamond Heart.mp3";
import DifferentWorld_song from "./static/song/Different World.mp3";
import Faded_song from "./static/song/Faded.mp3";
import GirlsLikeYou_song from "./static/song/Girls Like You.mp3";
import HarderToBreathe_song from "./static/song/Harder To Breathe.mp3";
import Memories_song from "./static/song/Memories.mp3";
import NobodysLove_song from "./static/song/Nobody's Love.mp3";
import OneMoreNight_song from "./static/song/One More Night.mp3";

const albumImg = {
   "Alan Walker": AlanWalker,
   "Ariana Grande": ArianaGrande,
   Coldplay: Coldplay,
   "Maroon 5": Maroon5,
};

const song = {
   "One More Night": {
      lrc: OneMoreNight,
      music: OneMoreNight_song,
   },
   "All Falls Down": {
      lrc: AllFallsDown,
      music: AllFallsDown_song,
   },
   Alone: {
      lrc: Alone,
      music: Alone_song,
   },
   "Baby Don't Go": {
      lrc: BabyDontGo,
      music: BabyDontGo_song,
   },
   "Diamond Heart": {
      lrc: DiamondHeart,
      music: DiamondHeart_song,
   },
   "Different World": {
      lrc: DifferentWorld,
      music: DifferentWorld_song,
   },
   Faded: {
      lrc: Faded,
      music: Faded_song,
   },
   "Girls Like You": {
      lrc: GirlsLikeYou,
      music: GirlsLikeYou_song,
   },
   "Harder To Breathe": {
      lrc: HarderToBreathe,
      music: HarderToBreathe_song,
   },
   Memories: {
      lrc: Memories,
      music: Memories_song,
   },
   "Nobody's Love": {
      lrc: NobodysLove,
      music: NobodysLove_song,
   },
};

export { albumImg, song };
