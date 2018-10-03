import React from "react";
import styles from "./DoorList.scss";
import classNames from "classnames/bind";
import DoorIcon from "../DoorIcon/DoorIcon";
import { shops } from "lib/shops";

const cx = classNames.bind(styles);

const DoorList = () => {
  const doorList = shops.map((title, i) => {
    return <DoorIcon key={i} title={title} to={`/${title}`} />;
  });

  return <div className={cx("doorList")}>{doorList}</div>;
};

export default DoorList;
