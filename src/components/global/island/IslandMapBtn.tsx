import { BaseIcon } from "@/components/base/BaseIcon";
import clsx from "clsx";
import { MouseEventHandler } from "react";

export function IslandMapBtn({ type, active, onClick }: { type: string; active: boolean; onClick: MouseEventHandler }) {
  return (
    <button
      className={clsx(
        "y-center absolute z-20 grid size-64 place-items-center rounded-lg  bg-white/20 backdrop-blur-lg transition-all  xl:hidden",
        type === "left" ? "left-80" : "right-40 xxxl:right-24",
        type === "left" && !active ? "invisible opacity-0" : "",
        type === "right" && active ? "invisible opacity-0" : ""
      )}
      onMouseEnter={() => {}}
      onClick={onClick}
    >
      <BaseIcon
        name={type === "left" ? "arrow-left" : "arrow-right"}
        width="48px"
        height="48px"
        className="text-purple-400"
      />
    </button>
  );
}
