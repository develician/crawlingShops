import React from "react";
import styles from "./ItemListWrapper.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ItemListWrapper = ({ children }) => (
  <div className={cx("itemListWrapper")}>{children}</div>
);

export default ItemListWrapper;
