import s from "./Container.module.css";
import clsx from "clsx";

export const Container = ({ children, className }) => {
  return <div className={clsx(s.container, className && className)}>{children}</div>;
};
