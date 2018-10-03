import React from "react";
import styles from "./Header.scss";
import classNames from "classnames/bind";
import MenuBar from "components/common/MenuBar";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Header = () => (
  <>
    <div className={cx("header")}>
      <Link to={`/`} className={cx("logo")}>
        Man's Shop
      </Link>
    </div>
    <MenuBar />
  </>
);

export default Header;
