import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import Loader from "components/common/Loader";
import ItemsList from "components/items/ItemsList";
import ItemTitle from "components/items/ItemTitle";
import ItemListWrapper from "components/items/ItemListWrapper";

export class ItemListContainer extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    const { location } = this.props;
    const { url } = queryString.parse(location.search);
    this.getItems(url);
  }

  getItems = async url => {
    try {
      const response = await axios.get(`/api/musinsa/detail?url=${url}`);
      const { items } = response.data;
      this.setState({
        items
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { items } = this.state;
    if (items.length === 0) {
      return <Loader />;
    }
    return (
      <ItemListWrapper>
        <ItemTitle title={items[0].title} />
        <ItemsList list={items} />
      </ItemListWrapper>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(ItemListContainer);
