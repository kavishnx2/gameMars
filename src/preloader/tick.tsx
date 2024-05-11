import { useCamera, updateCameraMatrix } from "./camera";
import { usePreloader, updatePreloader } from "./preloader";
import { useRenderer, updateRenderer } from "./renderer";

let anim: number;

export const createTick = () => {
  if (useCamera()) updateCameraMatrix();
  if (useRenderer()) updateRenderer();
  if (usePreloader()) updatePreloader();

  anim = window.requestAnimationFrame(createTick);
};

export const removeTick = () => {
  cancelAnimationFrame(anim);
};
