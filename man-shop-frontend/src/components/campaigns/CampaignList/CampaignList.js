import React from "react";
import styles from "./CampaignList.scss";
import classNames from "classnames/bind";
import CampaignIcon from "components/campaigns/CampaignIcon";
import Masonry from "react-masonry-component";

const cx = classNames.bind(styles);

const CampaignList = ({ list }) => {
  const campaignList = list.map((campaign, i) => {
    return (
      <CampaignIcon key={i} href={campaign.href} imgSrc={campaign.imgSrc} />
    );
  });
  return (
    <div className={cx("campaignListWrapper")}>
      <Masonry options={{ gutter: 16 }}>{campaignList}</Masonry>
    </div>
  );
};

export default CampaignList;
