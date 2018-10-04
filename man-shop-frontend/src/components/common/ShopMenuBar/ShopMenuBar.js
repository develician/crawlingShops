import React from "react";
import styles from "./ShopMenuBar.scss";
import classNames from "classnames/bind";
import { shops } from "lib/shops";

const cx = classNames.bind(styles);

const ShopMenuBar = ({ shopname, selectedMenu, onClickMenu }) => {
  const handleClickMenu = e => {
    const menu = myShop[0].menus[e.target.id];
    onClickMenu({ menu });
  };

  const myShop = shops.filter((shop, i) => {
    return shop.name === shopname;
  });
  const menuList = myShop[0].menus.map((menu, i) => {
    if (selectedMenu === menu) {
      return (
        <div
          className={cx("shopMenu", "selected")}
          id={i}
          onClick={handleClickMenu}
          key={menu}
        >
          {menu}
        </div>
      );
    }
    return (
      <div
        className={cx("shopMenu")}
        id={i}
        onClick={handleClickMenu}
        key={menu}
      >
        {menu}
      </div>
    );
  });

  return <div className={cx("shopMenuBarWrapper")}>{menuList}</div>;
};
export default ShopMenuBar;
