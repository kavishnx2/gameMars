import clsx from "clsx";
import { MouseEventHandler, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Lottie from "react-lottie";

import { IslandMapTooltip } from "./IslandMapTooltip";
import { BaseIcon } from "@/components/base/BaseIcon";

export type IslandMapIslandProps = React.ComponentPropsWithoutRef<"div"> & {
  index: number;
  active: boolean;
  onClick: MouseEventHandler;
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
  onVisible: (index: number, inView: boolean) => void;
  islandData: object;
  locked?: boolean;
};

export function IslandMapIsland({
  index,
  active,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onVisible,
  islandData,
  locked,
}: IslandMapIslandProps) {
  let marginTop = "mt-0";
  let translateZ = "translate-z-200";
  let size = 700; // Default size
  let sign = "/images/map/sign_ape.webp";
  let signPos = { x: "-left-20", y: "-top-72" };
  let signSize = "w-200";
  // let lockPos = { x: "left-1/2", y: "top-1/2" };

  // if (index === 0) {
  //   lockPos = { x: "left-[40%] xl:left-1/2", y: "top-1/2 xl:top-1/3" };
  // }
  const lottieOps = { loop: true, autoplay: true, animationData: islandData };

  if (index === 0) {
    sign = "/images/signs/archLogo.png"; // Example image for index 0
  } else if (index === 1) {
    sign = "/images/signs/1234.webp"; // Example image for index 1
  } else if (index === 2) {
    sign = "/images/signs/shoot.png"; // Example image for index 2
  }

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    onVisible(index, inView);
  }, [inView, index, onVisible]);

  const [showTooltip, setShowTooltip] = useState(false);

  const showMobileTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div
      ref={ref}
      className={clsx(
        "relative xl:mt-0 xl:flex xl:h-full xl:w-screen xl:shrink-0 xl:grow-0 xl:!transform-none xl:snap-center xl:flex-col xl:justify-center xl:overflow-hidden",
        marginTop,
        translateZ
      )}
      onMouseEnter={() => { }}
      onMouseLeave={() => { }}
      onClick={() => { }}
    >
      {/* {locked && (
        <div
          className={clsx(
            "group absolute z-40 grid size-88 max-w-200 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/75 backdrop-blur-[2px] xl:size-120",
            lockPos.x,
            lockPos.y
          )}
        >
          <img
            className="relative z-20 size-[44px] xl:size-64"
            src="/images/padlock.webp"
            width={80}
            height={80}
            alt="padlock"
          />
          <IslandMapTooltip>
            {[1, 2, 4].includes(index) && <p>Obtain the Ape Rock Boarding Pass to unlock.</p>}
            {index === 3 && <p>Diamond Isle Coming Soon! Stay tuned.</p>}
          </IslandMapTooltip>
        </div>
      )} */}

      <div
        className={clsx("group absolute z-[45] xl:static xl:left-auto xl:top-auto xl:mx-auto", signPos.x, signPos.y)}
        onMouseEnter={() => { }}
      >
        <div className={`${signSize} transition-transform group-hover:scale-110 `}>
        <img style={{ animation: "signRotation 3s infinite ease-in-out", width: "150px", height: "150px" }} src={sign} />
        </div>
        {index === 0 && (
          <IslandMapTooltip show={showTooltip}>
            <p>
              Step into the future of athletic competition on the Red Planet with Mars Archery Arena
            </p>
          </IslandMapTooltip>
        )}

        {index === 1 && (
          <IslandMapTooltip show={showTooltip}>
            <p>Embark on a journey to the frontier of interplanetary sports with Mars Shootout</p>
          </IslandMapTooltip>
        )}

        {index === 2 && (
          <IslandMapTooltip show={showTooltip}>
            <p>Engage in pulse-pounding shooting battles across the Martian surface,</p>
          </IslandMapTooltip>
        )}

        {index === 3 && (
          <IslandMapTooltip show={showTooltip} position="right">
            <p>First class experience, exclusively for our partners. TBA.</p>
          </IslandMapTooltip>
        )}
      </div>

      <div
        className={clsx("relative z-20 xl:w-full [&>*]:!pointer-events-none xl:[&>*]:!h-full xl:[&>*]:!w-full", {
          "xl:h-[60%]": index === 3,
          "xl:h-1/2": index !== 3,
        })}
        onClick={!locked ? onClick : undefined}
        onMouseEnter={!locked ? onMouseEnter : undefined}
        onMouseLeave={!locked ? onMouseLeave : undefined}
      >
        {index === 3 && (
          <Lottie options={lottieOps} height={size} width={size} isClickToPauseDisabled={true} isPaused={active} />
        )}
        {index !== 3 && (
          <Lottie options={lottieOps} height={size} width={size} isClickToPauseDisabled={true} isPaused={active} />
        )}
      </div>

      {/* <img
        className="absolute bottom-0 z-10 hidden h-1/2 w-full max-w-none object-cover object-top saturate-150 xl:block"
        src="/videos/water_poster.jpg"
      />
      /> */}

      <BaseIcon
        className="absolute bottom-16 left-16 z-20 hidden size-32 text-white xl:block"
        name="question"
        onClick={showMobileTooltip}
      />
    </div>
  );
}
