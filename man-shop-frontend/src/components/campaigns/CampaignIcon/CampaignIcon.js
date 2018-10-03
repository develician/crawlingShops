import React from "react";
import styles from "./CampaignIcon.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const CampaignIcon = ({ href, imgSrc }) => (
  <Link
    to={`/musinsa/items?url=https://store.musinsa.com${href}`}
    className={cx("campaignIcon")}
    style={{ backgroundImage: `url(${imgSrc})` }}
  >
    {/* <img src={imgSrc} /> */}
  </Link>
);

export default CampaignIcon;
