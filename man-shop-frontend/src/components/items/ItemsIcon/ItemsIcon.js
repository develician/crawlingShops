import React from "react";
import styles from "./ItemsIcon.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ItemsIcon = ({
  discountPercent,
  discountPrice,
  href,
  imgSrc,
  normalPrice,
  subTitle,
  title
}) => (
  <a href={`https://store.musinsa.com${href}`} className={cx("itemsIcon")}>
    <div className={cx("itemsIconThumbnail")}>
      <img src={imgSrc} alt="itemsIconThumbnail" />
    </div>
    <div className={cx("itemsIconTitle")}>{subTitle}</div>
    {discountPercent ? (
      <>
        <div className={cx("itemsIconNormalPriceThrough")}>{normalPrice}</div>
        <div className={cx("itemsIconDiscountPrice")}>
          {discountPrice.split("원")[1]}원
        </div>
        <div className={cx("itemsIconDiscountPercent")}>{discountPercent}</div>
      </>
    ) : (
      <div className={cx("itemsIconNormalPrice")}>{normalPrice}</div>
    )}
  </a>
);

export default ItemsIcon;
