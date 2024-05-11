import clsx from "clsx";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";

import { IslandMapBtn } from "./IslandMapBtn";
import { IslandMapCursor } from "./IslandMapCursor";
import { IslandMapIsland } from "./IslandMapIsland";
import { IslandMapPagination } from "./IslandMapPagination";
import styles from "@/components/styles/IslandMap.module.scss";
import planet1 from "@/lotties/planet1.json";
import planet2 from "@/lotties/planet2.json";
import planet3 from "@/lotties/planet3.json";
import { BaseIcon } from "@/components/base/BaseIcon";
import MarsCanvas from "@/canvas/mars_cover";

import {
  playSoundTransitionToIsland,
  playSoundUiClick,
  playSoundWaves,
  playSoundMapPlane,
  playSoundWoosh1,
  muteAllIslands,
} from "@/sounds";

export function IslandMap({ playAnim }: { playAnim: boolean }) {
  const navigateTo = useNavigate();

  const [enabled, setEnabled] = useState(false);
  const [angleReset, setAngleReset] = useState<null | number>(null);
  const [active, setActive] = useState(false);
  const [mobileActive, setMobileActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const root = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLImageElement>(null);
  const islands = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const waterHolder = useRef<HTMLDivElement>(null);
  const water = useRef<HTMLVideoElement>(null);
  const pagination = useRef<HTMLDivElement>(null);

  const zoomAnimation = (type: string) => {
    playSoundWaves();
    playSoundMapPlane();
    
    const tl = gsap.timeline({
      onComplete: () => setEnabled(true),
    });

    if (type === "play") {
      tl.to(plane.current, { duration: 2, x: "200vw", y: -100, ease: "power1.out" });
      tl.to(scene.current, { duration: 1, scale: 1, ease: "power1.inOut", onStart: () => playSoundWoosh1() }, 1);
      tl.to(islands.current, { duration: 1, xPercent: 0, left: 0, ease: "power1.inOut" }, 1);
      tl.to(waterHolder.current, { duration: 1, xPercent: -10, left: 0, ease: "power1.inOut" }, 1);
      tl.to(pagination.current, { duration: 1, autoAlpha: 1, ease: "power1.inOut" }, 2);
    } else {
      tl.set(plane.current, { x: "200vw", y: -100 });
      tl.set(scene.current, { scale: 1 });
      tl.set(islands.current, { xPercent: 0, left: 0 });
      tl.set(waterHolder.current, { xPercent: -10, left: 0 });
      tl.set(pagination.current, { autoAlpha: 1 });
    }
  };

  const handleHover = (hoverState: boolean, island: number) => {
    console.log(`Hover state: ${hoverState}, Island: ${island}`);
    if (active && (island === 0 || island === 1 || island === 2)) return;
    setIsHovered(hoverState);
  };

  const isMoving = useRef<boolean>();

  const handlePaginationClick = (direction: "left" | "right") => {
    if (typeof window !== "undefined" && window.innerWidth > 1080) {
      moveTrack(direction);
    }
  };

  const moveTrack = useCallback((direction: string) => {
    if (isMoving.current) return;

    playSoundUiClick();
    playSoundWoosh1();


    isMoving.current = true;
    const trackDiv: HTMLDivElement = track.current || document.createElement("div");
    const waterDiv: HTMLVideoElement = water.current || document.createElement("video");
    const windW = window.innerWidth;

    if (direction === "left") {
      trackDiv.style.setProperty("--x", `0px`);
      waterDiv.style.setProperty("--x", `0px`);
      setActive(false);
    } else {
      trackDiv.style.setProperty("--x", windW - trackDiv.offsetWidth + "px");
      waterDiv.style.setProperty("--x", windW - trackDiv.offsetWidth + "px");
      setActive(true);
    }

    setTimeout(() => {
      isMoving.current = false;
    }, 1000);
  }, []);

  const transition = (island: number) => {
    if (innerWidth > 1080) {
       if (active && (island === 0 || island === 1 || island === 2 || island === 3 || island === 4)) return;
    }

    let xPos = 0;
    let yPos = 0;
    let zoom = 0;
    let url = "";

    switch (island) {
      case 0:
        if (innerWidth > 1600) xPos = 73;
        else xPos = 83;
        yPos = 320;
        zoom = 2;
        url = "/competition/0";
        break;
      case 1:
        if (innerWidth > 1600) xPos = 18;
        else if (innerWidth > 1400 && innerWidth <= 1600) xPos = 25;
        else xPos = 23;
        yPos = 180;
        zoom = 1.8;
        url = "/competition/1";
        break;
      case 2:
        if (innerWidth > 1800) xPos = -45;
        else if (innerWidth > 1600 && innerWidth <= 1800) xPos = -60;
        else if (innerWidth > 1400 && innerWidth <= 1600) xPos = -45;
        else if (innerWidth > 1200 && innerWidth <= 1400) xPos = -50;
        else xPos = -65;
        yPos = 100;
        zoom = 1.8;
        url = "/competition/2";
        break;
     
    }

    playSoundTransitionToIsland();

    setEnabled(false);
    setAngleReset(0);

    gsap.set(track.current, { transition: "none" });

    const tl = gsap.timeline({
      onComplete: () => {
        muteAllIslands();
        navigateTo(url);
      },
    });

    if (innerWidth > 1080) {
      tl.to(scene.current, { duration: 1, scale: zoom, xPercent: xPos, y: yPos, ease: "power1.inOut" }, 0);
      tl.to(scene.current, { duration: 1, y: yPos + innerHeight, ease: "power2.inOut" });
      tl.to(root.current, { duration: 1, autoAlpha: 0, ease: "power2.inOut" }, "-=1");
    } else {
      tl.to(root.current, { duration: 1, autoAlpha: 0, ease: "power2.inOut" });
    }
  };

  const updatePagination = (index: number, isVisible: boolean) => {
    if (isVisible) setMobileActive(index);
  };

  useEffect(() => {
    if (playAnim) zoomAnimation(innerWidth > 1080 ? "play" : "set");
  }, [playAnim]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") moveTrack("left");
      else if (event.key === "ArrowRight") moveTrack("right");
    };

    // Add event listener for keydown events
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [moveTrack]);


  return (
    <section ref={root} className="relative h-screen w-full overflow-hidden ">
      <MarsCanvas />
      <div ref={scene} className="relative z-10 size-full origin-bottom scale-50 xl:transform-none">
        <img ref={plane} className="absolute left-[-100vw] top-0 w-360 xl:hidden" src="/images/rock12.png" style={{ transform: 'rotate(20deg)' }}/>

        <BaseIcon
          className={clsx(
            mobileActive === 0 ? "opacity-0" : "opacity-30",
            "fixed left-8 top-1/2 z-20 hidden size-40 -translate-y-1/2 animate-arrowleft text-purpleDark-500 transition-opacity xl:block"
          )}
          name="double-caret-left"
        />
        <BaseIcon
          className={clsx(
            mobileActive === 4 ? "opacity-0" : "opacity-30",
            "fixed right-8 top-1/2 z-20 hidden size-40 -translate-y-1/2 animate-arrowright text-purpleDark-500 transition-opacity xl:block"
          )}
          name="double-caret-right"
        />

        <Tilt
          className={clsx(
            "preserve-3d relative z-10 size-full xl:!transform-none xl:!transform-style-flat",
            styles.islandMap__3dTilt
          )}
          tiltEnable={enabled}
          tiltMaxAngleX={4}
          tiltMaxAngleY={4}
          transitionSpeed={2000}
          perspective={2000}
          trackOnWindow={true}
          tiltAngleXManual={angleReset}
          tiltAngleYManual={angleReset}
        >
          <div
            ref={islands}
            className="x-center preserve-3d absolute bottom-120 z-20 h-[500px] xl:relative xl:!bottom-0 xl:h-full xl:snap-x xl:snap-mandatory xl:overflow-x-auto xl:!transform-style-flat h-l:bottom-40"
          >
            <div
              ref={track}
              className={clsx(
                "preserve-3d flex h-full w-max items-start gap-120 px-240 duration-1000 sl:gap-56 sl:px-120 xxxl:gap-24 xxxl:px-80 xl:gap-0 xl:px-0 xl:py-96",
                styles.islandMap__track
              )}
            >
              <IslandMapIsland
                index={0}
                active={active}
                onClick={() => transition(0)}
                onMouseEnter={() => handleHover(true, 0)}
                onMouseLeave={() => handleHover(false, 0)}
                islandData={planet1}
                onVisible={updatePagination}
              />

              <IslandMapIsland
                index={1}
                active={active}
                onClick={() => transition(1)}
                onMouseEnter={() => handleHover(true, 1)}
                onMouseLeave={() => handleHover(false, 1)}
                islandData={planet2}
                onVisible={updatePagination}
              />

              <IslandMapIsland
                index={2}
                active={active}
                onClick={() => transition(2)}
                onMouseEnter={() => handleHover(true, 2)}
                onMouseLeave={() => handleHover(false, 2)}
                islandData={planet3}
                onVisible={updatePagination}
              />
            </div>
          </div>

          <div
            className={clsx("absolute left-0 top-0 z-0 h-[750px] w-[5760px]", styles.islandMap__clouds)}
            style={{ animation: "clouds 50s infinite linear" }}
          />

        </Tilt>
      </div>

      <IslandMapBtn type="left" active={active} onClick={() => moveTrack("left")} />
      <IslandMapBtn type="right" active={active} onClick={() => moveTrack("right")} />
      <IslandMapCursor isHovered={isHovered} />
    </section>
  );
}
