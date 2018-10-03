import React from "react";
import styles from "./ItemsList.scss";
import classNames from "classnames/bind";
import ItemsIcon from "components/items/ItemsIcon";

const cx = classNames.bind(styles);

const ItemsList = ({ list }) => {
  const itemsList = list.map((item, i) => {
    return (
      <ItemsIcon
        key={i}
        discountPercent={item.discount_percent}
        discountPrice={item.discounted_price}
        href={item.href}
        imgSrc={item.imgSrc}
        normalPrice={item.normal_price}
        subTitle={item.sub_title}
        title={item.title}
      />
    );
  });

  return <div className={cx("itemsList")}>{itemsList}</div>;
};

export default ItemsList;
