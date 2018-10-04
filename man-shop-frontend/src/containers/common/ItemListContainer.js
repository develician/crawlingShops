import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import Loader from "components/common/Loader";
import ItemsList from "components/items/ItemsList";
import ItemTitle from "components/items/ItemTitle";
import ItemListWrapper from "components/items/ItemListWrapper";
import LoadMoreButton from "../../components/common/LoadMoreButton/LoadMoreButton";

export class ItemListContainer extends Component {
  state = {
    items: [],
    page: null,
    url: null,
    lastPage: false,
    title: ""
  };

  componentDidMount() {
    document.documentElement.scrollTop = 0;

    const { location } = this.props;
    // const { url } = queryString.parse(location.search);
    // console.log(location.search.split("?url=")[1]);
    const url = location.search.split("?url=")[1];
    this.setState({
      url
    });
    this.getItems(url);
  }
  // http://localhost:3000/musinsa/items?url=https://store.musinsa.com/app/campaign/goods/67?page=1&sort=pop&class_no=3&list_kind=
  getItems = async url => {
    try {
      const response = await axios.get(`/api/musinsa/detail?url=${url}`);
      // const response = await axios.get(`/api/musinsa/detail/${url}/`);
      const { items, page, title } = response.data;
      if (items.length < 120) {
        this.setState({
          lastPage: true
        });
      }
      this.setState({
        items,
        page,
        title
      });
    } catch (e) {
      console.log(e);
    }
  };

  loadMoreItems = async url => {
    try {
      const response = await axios.get(`/api/musinsa/detail?url=${url}`);
      const { items, page } = response.data;
      if (items.length < 120) {
        this.setState({
          lastPage: true
        });
      }
      this.setState({
        items: this.state.items.concat(items),
        page,
        url
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleClickLoadMore = () => {
    const { url, page } = this.state;
    const divider = "page=";
    const leftUrl = url.split(divider)[0];
    const rightUrl = url.split(divider)[1];

    const splittedRightUrl = rightUrl.split(`${page}&`)[1];

    const nextPage = parseInt(page, 10) + 1;

    const nextUrl = `${leftUrl}${divider}${nextPage}&${splittedRightUrl}`;

    this.loadMoreItems(nextUrl);

    // console.log(leftUrl);
    // console.log(rightUrl);
    // console.log(splittedRightUrl);
    // console.log(nextUrl);
  };

  render() {
    const { items, page, lastPage, title } = this.state;
    const { handleClickLoadMore } = this;
    if (items.length === 0) {
      return <Loader />;
    }
    return (
      <ItemListWrapper>
        <ItemTitle title={title} />
        <ItemsList list={items} />
        {page && !lastPage && <LoadMoreButton onClick={handleClickLoadMore} />}
      </ItemListWrapper>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(ItemListContainer);
