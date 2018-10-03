import React from "react";
import styles from "./MenuBar.scss";
import classNames from "classnames/bind";
import { shops } from "lib/shops";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const MenuItems = shops.map((shop, i) => {
  return (
    <Link key={shop} to={`/${shop}`} className={cx("menuItem")}>
      {shop}
    </Link>
  );
});

const MenuBar = () => <div className={cx("menuBar")}>{MenuItems}</div>;

export default MenuBar;
