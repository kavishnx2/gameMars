import clsx from "clsx";
import { forwardRef, LegacyRef } from "react";

export const IslandMapPagination = forwardRef(
  (
    props: { active: boolean; mobileActive: number; onPageChange: (direction: "left" | "right") => void },
    ref: LegacyRef<HTMLDivElement> | undefined
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "x-center absolute bottom-32 z-20 flex w-max items-end gap-24 opacity-0 xl:fixed xl:bottom-16 xl:gap-12 xl:opacity-100"
        )}
      >
        <img
          className={`h-40 cursor-pointer transition-opacity ${!props.active ? "opacity-50" : "opacity-20"} ${props.mobileActive === 0 ? "xl:opacity-50" : "xl:opacity-20"}`}
          src="/images/pagination/1.png"
          onClick={() => props.onPageChange("left")}
        />
        <img
          className={`h-40 cursor-pointer transition-opacity ${!props.active ? "opacity-50" : "opacity-20"} ${props.mobileActive === 1 ? "xl:opacity-50" : "xl:opacity-20"}`}
          src="/images/pagination/2.png"
          onClick={() => props.onPageChange("left")}
        />
        <img
          className={`h-40 cursor-pointer transition-opacity ${!props.active ? "opacity-50" : "opacity-20"} ${props.mobileActive === 2 ? "xl:opacity-50" : "xl:opacity-20"}`}
          src="/images/pagination/3.png"
          onClick={() => props.onPageChange("left")}
        />
        <img
          className={`h-40 cursor-pointer transition-opacity ${props.active ? "opacity-50" : "opacity-20"} ${props.mobileActive === 3 ? "xl:opacity-50" : "xl:opacity-20"}`}
          src="/images/pagination/4.png"
          onClick={() => props.onPageChange("right")}
        />
        <img
          className={`h-40 cursor-pointer transition-opacity ${props.active ? "opacity-50" : "opacity-20"} ${props.mobileActive === 4 ? "xl:opacity-50" : "xl:opacity-20"}`}
          src="/images/pagination/5.png"
          onClick={() => props.onPageChange("right")}
        />
      </div>
    );
  }
);
