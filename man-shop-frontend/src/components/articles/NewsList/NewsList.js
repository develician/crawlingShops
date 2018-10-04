import React from "react";
import styles from "./NewsList.scss";
import classNames from "classnames/bind";
import NewsIcon from "components/articles/NewsIcon";

const cx = classNames.bind(styles);

const NewsList = ({ list }) => {
  const newsList = list.map((news, i) => {
    return (
      <NewsIcon
        key={i}
        articleImg={news.imgSrc}
        title={news.title}
        brandTitle={news.brandName}
        date={news.date}
        description={news.description}
        href={news.href}
        viewCnt={news.viewCnt}
      />
    );
  });
  return <div className={cx("newsList")}>{newsList}</div>;
};

export default NewsList;
