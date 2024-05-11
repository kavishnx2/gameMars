import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

import { BaseIcon } from "./BaseIcon";

export type BaseLinkProps = {
  children: string;
  arrow?: "left" | "right";
  className: string;
  to?: string;
  id?: string;
};

export function BaseLink({ children, arrow, to = "/", id, className }: BaseLinkProps) {
  return (
    <Link
      className={clsx("group flex items-center gap-4 text-14 font-semibold text-purpleDark-300", className)}
      to={to}
      id={id}
      onMouseEnter={() => {}}
      onClick={() => {}}
    >
      {arrow === "left" ? (
        <BaseIcon name="arrow-left" className="transition-transform duration-200 group-hover:-translate-x-4" />
      ) : null}
      <span className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full after:bg-current after:opacity-30 after:transition-opacity after:duration-200 after:content-[''] group-hover:after:opacity-80">
        {children}
      </span>
      {arrow === "right" ? (
        <BaseIcon name="arrow-right" className="transition-transform duration-200 group-hover:translate-x-4" />
      ) : null}
    </Link>
  );
}
