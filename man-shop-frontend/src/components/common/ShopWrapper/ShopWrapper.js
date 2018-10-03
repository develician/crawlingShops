import React from "react";
import styles from "./ShopWrapper.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ShopWrapper = ({ children }) => (
  <div className={cx("shopWrapper")}>{children}</div>
);

export default ShopWrapper;
