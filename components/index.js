import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";

// home screen
import Welcome from "./home/welcome/Welcome";
import Musicas from "./home/musicas/Musicas";
import Playlists from "./home/playlists/Playlists";
import Albuns from "./home/albuns/Albuns";
import Artistas from "./home/artistas/Artistas";

// common
import NearbyJobCard from "./common/cards/nearby/NearbyJobCard";

import NavButton from "./common/navbutton/navButton";

// Context
import { AudioContext, AudioProvider } from "./context/audioProvider.js";

export {
  ScreenHeaderBtn,
  Welcome,
  NavButton,
  Musicas,
  Playlists,
  Albuns,
  Artistas,
  AudioContext,
  AudioProvider,
  NearbyJobCard
};
