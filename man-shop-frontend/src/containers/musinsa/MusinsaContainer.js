import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import NewsList from "components/articles/NewsList";
import Loader from "components/common/Loader";
import CampaignList from "components/campaigns/CampaignList";
import ShopWrapper from "components/common/ShopWrapper";
import ShopMenuBar from "components/common/ShopMenuBar";
import { shops } from "lib/shops";

export class MusinsaContainer extends Component {
  state = {
    newsArticles: [],
    campaigns: [],
    loading: false,
    menu: "",
    initialNewsUrl: "https://www.musinsa.com/index.php?m=news&p=1",
    page: 1,
    lastPage: false,
    initialLoading: true
  };

  componentDidMount() {
    const { getMusinsaNewsList } = this;
    getMusinsaNewsList();
    const musinsa = shops.filter((shop, i) => {
      return shop.name === "Musinsa";
    });

    const menuInfo = JSON.parse(localStorage.getItem("menuInfo"));

    if (menuInfo) {
      this.setState({
        menu: menuInfo.menu
      });
    } else {
      const firstMenu = musinsa[0].menus[0];

      this.setState({
        menu: firstMenu
      });
    }

    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.menu !== this.state.menu) {
      this.setState({
        page: 1
      });
    }
  }

  getMusinsaNewsList = async () => {
    const { initialNewsUrl } = this.state;
    try {
      const response = await axios.get("/api/musinsa/?url=" + initialNewsUrl);
      const { news_articles, campaigns } = response.data;
      this.setState({
        newsArticles: news_articles,
        campaigns,
        initialLoading: false
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleClickMenu = ({ menu }) => {
    this.setState({
      menu
    });
    localStorage.setItem(
      "menuInfo",
      JSON.stringify({
        name: "Musinsa",
        menu
      })
    );
  };

  loadMore = async url => {
    this.setState({
      loading: true
    });
    try {
      const response = await axios.get("/api/musinsa/?url=" + url);
      const { news_articles } = response.data;
      this.setState({
        newsArticles: this.state.newsArticles.concat(news_articles),
        page: this.state.page + 1,
        loading: false
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleScroll = () => {
    const { loadMore } = this;
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (scrollHeight - innerHeight - scrollTop < 250) {
      if (
        !this.state.loading &&
        !this.state.lastPage &&
        this.state.menu === "뉴스"
      ) {
        const nextPage = this.state.page + 1;
        const divider = "&p=";
        const nextUrl =
          this.state.initialNewsUrl.split(divider)[0] + divider + nextPage;
        loadMore(nextUrl);
      }
    }
  };

  render() {
    const {
      initialLoading,
      newsArticles,
      campaigns,
      menu,
      loading
    } = this.state;
    const { handleClickMenu } = this;
    if (initialLoading) {
      return <Loader />;
    }
    return (
      <ShopWrapper>
        <ShopMenuBar
          shopname="Musinsa"
          selectedMenu={menu}
          onClickMenu={handleClickMenu}
        />
        {menu === "뉴스" && <NewsList list={newsArticles} />}
        {menu === "팬츠" && <CampaignList list={campaigns} />}
        {loading && <Loader />}
      </ShopWrapper>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default MusinsaContainer;
