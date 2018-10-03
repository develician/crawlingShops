import React from "react";
import styles from "./NewsIcon.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const NewsIcon = ({
  articleImg,
  title,
  brandTitle,
  date,
  description,
  viewCnt,
  href
}) => (
  <a href={`https://www.musinsa.com${href}`} className={cx("newsIcon")}>
    <div className={cx("newsIconThumbnail")}>
      <img src={articleImg} alt="newsIconThumbnail" />
    </div>
    <div className={cx("newsIconInfos")}>
      <div className={cx("newsIconTitle")}>{title}</div>
      <div className={cx("newsIconSubInfo")}>
        <div className={cx("newsIconBrandTitle")}>{brandTitle}</div>
        <div className={cx("newsIconDate")}>{date}</div>
        <div className={cx("newsIconViewCnt")}>{viewCnt}</div>
      </div>
      <div className={cx("newsIconDescription")}>{description}</div>
    </div>
  </a>
);

export default NewsIcon;
