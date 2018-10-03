import React from "react";
import styles from "./ItemTitle.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ItemTitle = ({ title }) => <div className={cx("itemTitle")}>{title}</div>;

export default ItemTitle;
