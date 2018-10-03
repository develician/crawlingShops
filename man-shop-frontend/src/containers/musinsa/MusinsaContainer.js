import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import NewsList from "components/articles/NewsList";
import Loader from "components/common/Loader";
import CampaignList from "../../components/campaigns/CampaignList/CampaignList";
import ShopWrapper from "../../components/common/ShopWrapper/ShopWrapper";

export class MusinsaContainer extends Component {
  state = {
    newsArticles: [],
    campaigns: [],
    loading: true
  };

  componentDidMount() {
    const { getMusinsaNewsList } = this;
    getMusinsaNewsList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.newsArticles !== this.state.newsArticles) {
    }
  }

  getMusinsaNewsList = async () => {
    try {
      const response = await axios.get("/api/musinsa/");
      const { news_articles, campaigns } = response.data;
      this.setState({
        newsArticles: news_articles,
        campaigns,
        loading: false
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { loading, newsArticles, campaigns } = this.state;
    if (loading) {
      return <Loader />;
    }
    return (
      <ShopWrapper>
        <NewsList list={newsArticles} />
        <CampaignList list={campaigns} />
      </ShopWrapper>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default MusinsaContainer;
