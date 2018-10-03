import React from "react";
import styles from "./DoorIcon.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const DoorIcon = ({ title, to }) => (
  <Link to={to} className={cx("doorIcon")}>
    {title}
  </Link>
);

export default DoorIcon;
