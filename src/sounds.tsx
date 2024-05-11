import gsap from "gsap";

let allMuted: boolean = false;

let introPlane: HTMLAudioElement | null = null;
let mapPlane: HTMLAudioElement | null = null;
let waves: HTMLAudioElement | null = null;
let uiHover: HTMLAudioElement | null = null;
let uiClick: HTMLAudioElement | null = null;
let uiClaim: HTMLAudioElement | null = null;

let woosh1: HTMLAudioElement | null = null;
let woosh2: HTMLAudioElement | null = null;
let transition2island: HTMLAudioElement | null = null;

let island1: HTMLAudioElement | null = null;
let island2: HTMLAudioElement | null = null;
let island3: HTMLAudioElement | null = null;
let island4: HTMLAudioElement | null = null;
let island5: HTMLAudioElement | null = null;

let wheel: HTMLAudioElement | null = null;

export const createSounds = () => {
  // introPlane
  introPlane = new Audio("/sounds/intro-plane.mp3");
  introPlane.volume = 0.5;
  introPlane.muted = false;
  introPlane.load();

  // introPlane
  mapPlane = new Audio("/sounds/map-plane.mp3");
  mapPlane.volume = 0.2;
  mapPlane.muted = false;
  mapPlane.load();

  // waves
  waves = new Audio("/sounds/waves.mp3");
  waves.volume = 0.5;
  waves.muted = false;
  waves.loop = true;
  waves.load();

  // uiHover
  uiHover = new Audio("/sounds/ui-hover.mp3");
  uiHover.volume = 0.1;
  uiHover.muted = false;
  uiHover.load();

  // uiClick
  uiClick = new Audio("/sounds/ui-click.mp3");
  uiClick.volume = 0.2;
  uiClick.muted = false;
  uiClick.load();

  // uiClaim
  uiClaim = new Audio("/sounds/ui-claim.mp3");
  uiClaim.volume = 0.2;
  uiClaim.muted = false;
  uiClaim.load();

  // woosh1
  woosh1 = new Audio("/sounds/woosh1.mp3");
  woosh1.volume = 0.2;
  woosh1.muted = false;
  woosh1.load();

  // woosh2
  woosh2 = new Audio("/sounds/woosh2.mp3");
  woosh2.volume = 0.2;
  woosh2.muted = false;
  woosh2.load();

  // transition2island
  transition2island = new Audio("/sounds/transition-to-island.mp3");
  transition2island.volume = 0.2;
  transition2island.muted = false;
  transition2island.load();

  // island1
  island1 = new Audio("/sounds/island1.mp3");
  island1.volume = 0.5;
  island1.muted = false;
  island1.load();

  // island2
  island2 = new Audio("/sounds/island2.mp3");
  island2.volume = 0.5;
  island2.muted = false;
  island2.load();

  // island3
  island3 = new Audio("/sounds/island3.mp3");
  island3.volume = 0.5;
  island3.muted = false;
  island3.load();

  // island4
  island4 = new Audio("/sounds/island4.mp3");
  island4.volume = 0.5;
  island4.muted = false;
  island4.load();

  // island5
  island5 = new Audio("/sounds/island5.mp3");
  island5.volume = 0.5;
  island5.muted = false;
  island5.load();

  // wheel
  wheel = new Audio("/sounds/wheel.mp3");
  wheel.volume = 0.5;
  wheel.muted = false;
  wheel.load();
};

const muteOtherIslands = (excludeIsland: HTMLAudioElement) => {
  if (allMuted) return;

  const islands = [island1, island2, island3, island4, island5];

  islands.forEach((island) => {
    if (island !== excludeIsland && island) {
      island.muted = true;
    }
  });

  if (excludeIsland) {
    excludeIsland.muted = false;
  }
};

export const muteAllIslands = () => {
  const islands = [island1, island2, island3, island4, island5];

  islands.forEach((island) => {
    if (island) {
      island.muted = true;
    }
  });
};

export const playIntroPlane = () => {
  if (introPlane) introPlane.play();
};

export const playSoundMapPlane = () => {
  if (mapPlane) mapPlane.play();
};

export const playSoundWaves = () => {
  if (waves) waves.play();
};

export const playSoundUiHover = () => {
  if (!uiHover) return;
  uiHover.currentTime = 0;
  uiHover.play();
};

export const playSoundUiClick = () => {
  if (!uiClick) return;
  uiClick.currentTime = 0;
  uiClick.play();
};

export const playSoundUiClaim = () => {
  if (!uiClaim) return;
  uiClaim.currentTime = 0;
  uiClaim.play();
};

export const playSoundWoosh1 = () => {
  if (!woosh1) return;
  woosh1.currentTime = 0;
  woosh1.play();
};

export const playSoundWoosh2 = () => {
  if (!woosh2) return;
  woosh2.currentTime = 0;
  woosh2.play();
};

export const playSoundTransitionToIsland = () => {
  if (!transition2island) return;
  transition2island.currentTime = 0;
  transition2island.play();
};

export const playSoundIsland1 = () => {
  if (!island1) return;
  muteOtherIslands(island1);
  island1.currentTime = 0;
  island1.volume = 0.5;
  island1.play();
};

export const playSoundIsland2 = () => {
  if (!island2) return;
  muteOtherIslands(island2);
  island2.currentTime = 0;
  island2.volume = 0.5;
  island2.play();
};

export const playSoundIsland3 = () => {
  if (!island3) return;
  muteOtherIslands(island3);
  island3.currentTime = 0;
  island3.volume = 0.5;
  island3.play();
};

export const playSoundIsland4 = () => {
  if (!island4) return;
  muteOtherIslands(island4);
  island4.currentTime = 0;
  island4.volume = 0.5;
  island4.play();
};

export const playSoundIsland5 = () => {
  if (!island5) return;
  muteOtherIslands(island5);
  island5.currentTime = 0;
  island5.volume = 0.5;
  island5.play();
};

export const fadeOutIsland1 = () => {
  if (!island1) return;
  gsap.to(island1, { duration: 0.5, volume: 0 });
};

export const fadeOutIsland2 = () => {
  if (!island2) return;
  gsap.to(island2, { duration: 0.5, volume: 0 });
};

export const fadeOutIsland3 = () => {
  if (!island3) return;
  gsap.to(island3, { duration: 0.5, volume: 0 });
};

export const fadeOutIsland4 = () => {
  if (!island4) return;
  gsap.to(island4, { duration: 0.5, volume: 0 });
};

export const fadeOutIsland5 = () => {
  if (!island5) return;
  gsap.to(island5, { duration: 0.5, volume: 0 });
};

export const playSoundWheel = () => {
  if (!wheel) return;
  wheel.currentTime = 0;
  wheel.play();
};

export const muteAllSounds = (val: boolean) => {
  if (introPlane) introPlane.muted = val;
  if (mapPlane) mapPlane.muted = val;
  if (waves) waves.muted = val;
  if (uiHover) uiHover.muted = val;
  if (uiClick) uiClick.muted = val;
  if (uiClaim) uiClaim.muted = val;

  if (woosh1) woosh1.muted = val;
  if (woosh2) woosh2.muted = val;
  if (transition2island) transition2island.muted = val;

  if (island1) island1.muted = val;
  if (island2) island2.muted = val;
  if (island3) island3.muted = val;
  if (island4) island4.muted = val;
  if (island5) island5.muted = val;

  if (wheel) wheel.muted = val;

  allMuted = val;
};

export const areSoundsMuted = () => allMuted;
