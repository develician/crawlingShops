import React from "react";
import styles from "./LoadMoreButton.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const LoadMoreButton = ({ onClick }) => (
  <div className={cx("loadMoreButtonWrapper")}>
    <div className={cx("loadMoreButton")} onClick={onClick}>
      더 보기
    </div>
  </div>
);

export default LoadMoreButton;
