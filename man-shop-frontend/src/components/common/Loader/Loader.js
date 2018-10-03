import React from "react";
import styles from "./Loader.scss";
import classNames from "classnames/bind";
import { ThreeBounce } from "better-react-spinkit";

const cx = classNames.bind(styles);

const Loader = () => (
  <div className={cx("loaderWrapper")}>
    <ThreeBounce />
  </div>
);

export default Loader;
