import React from "react";
import styles from "./DoorWrapper.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const DoorWrapper = ({ children }) => (
  <div className={cx("doorWrapper")}>{children}</div>
);

export default DoorWrapper;
