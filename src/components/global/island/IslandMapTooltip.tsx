import clsx from "clsx";

export type IslandMapTooltipProps = React.ComponentPropsWithoutRef<"div"> & {
  show?: boolean;
  position?: "left" | "right" | "top" | "bottom";
};

export function IslandMapTooltip({ className, position = "top", children, show }: IslandMapTooltipProps) {
  return (
    <div
      className={clsx(
        "pointer-events-none absolute z-[45] mt-12 w-280 rounded bg-white px-20 py-12 opacity-0 transition-all group-hover:mt-0 group-hover:opacity-100 xl:top-full xl:h-fit",
        {
          "xl:mt-0 xl:opacity-100": show,
          "left-1/2 top-0 -translate-x-1/2 -translate-y-full ": position === "top",
          "left-1/2 bottom-0 -translate-x-1/2 translate-y-full  xl:-translate-y-full": position === "bottom",
          "right-20 top-1/2 translate-x-full -translate-y-1/2  xl:-translate-y-full xl:-translate-x-1/2 xl:left-1/2":
            position === "right",
          "left-20 top-1/2 -translate-x-full -translate-y-1/2  xl:-translate-y-full xl:-translate-x-1/2 xl:left-1/2":
            position === "left",
        },
        className
      )}
    >
      <div className="text-12 font-medium leading-[1.2] text-purpleDark-500 xl:text-14">{children}</div>
      <svg
        className={clsx("absolute", {
          "bottom-[-7px] left-1/2 -translate-x-1/2": position === "top",
          "top-[-7px] left-1/2 -translate-x-1/2 rotate-180 xl:rotate-0 xl:bottom-[-7px] xl:top-auto":
            position === "bottom",
          "left-[-10px] top-1/2 -translate-y-1/2 rotate-90 xl:rotate-0 xl:bottom-[-7px] xl:top-auto xl:left-1/2 xl:-translate-x-1/2 xl:translate-y-0":
            position === "right",
          "right-[-10px] top-1/2 -translate-y-1/2 -rotate-90 xl:rotate-0 xl:bottom-[-7px]  xl:top-auto xl:left-1/2 xl:-translate-x-1/2 xl:translate-y-0":
            position === "left",
        })}
        width="16"
        height="8"
        viewBox="0 0 16 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1235 6.09565C9.52218 8.09728 6.47783 8.09728 4.87652 6.09566L0 0H16L11.1235 6.09565Z"
          fill="#fff"
        />
      </svg>
    </div>
  );
}
