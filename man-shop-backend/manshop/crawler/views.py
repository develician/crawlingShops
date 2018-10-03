import requests
from bs4 import BeautifulSoup as bs
import json
import os
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


def getMusinsaNews():
    musinsa_html = bs(requests.get("https://www.musinsa.com/").text, "html.parser")
    musinsa_news = musinsa_html.find(
        "div", {"class": "content-wrapper wrapper tab news"}
    )
    musinsa_news_article_list = musinsa_news.find_all("li", {"class": "listItem"})
    articles = []
    for article in musinsa_news_article_list:
        news_article = {}
        data_original = (
            "https:"
            + (
                article.find("div", {"class": "articleImg"})
                .find("a")
                .find("img")
                .get("data-original")
            ).split(".0")[0]
        )
        news_article["articleImg"] = data_original
        article_info = article.find("div", {"class": "articleInfo info"})
        news_article["title"] = str.strip(
            article_info.find("a").find("p", {"class": "title"}).text
        )
        news_article["date"] = article_info.find(
            "span", {"class": "date division"}
        ).text
        news_article["viewCnt"] = (
            article_info.find("span", {"class": "view"})
            .find("span", {"class": "viewCnt"})
            .text
        )
        news_article["brandTitle"] = (
            article_info.find("span", {"class": "getBrandTitle"})
            .find("b")
            .find("a")
            .find("span", {"class": "brand"})
            .text
        )
        news_article["description"] = str.strip(
            article_info.find("div", {"class": "description"}).find("a").find("p").text
        )
        news_article["href"] = article_info.find("a").get("href")
        articles.append(news_article)
    return articles


def getMusinsaCampaigns():
    musinsa_html = bs(
        requests.get("https://store.musinsa.com/app/campaign/main/67").text,
        "html.parser",
    )
    campaign_wrapper = musinsa_html.find("div", {"class": "center-area wrap-campaign"})
    box_campaign_list = campaign_wrapper.find("div", {"class": "box-campaign-list"})
    masonry = box_campaign_list.find("ul")
    # print(masonry)
    masonry_li_list = masonry.find_all("li")

    bricks = []

    for brick in masonry_li_list:
        my_brick = {}
        my_brick["href"] = brick.find("a").get("href")
        my_brick["imgSrc"] = "https:" + brick.find("img").get("src")
        bricks.append(my_brick)
    return bricks


def getMusinsaItems(url):
    musinsa_html = bs(requests.get(url).text, "html.parser")
    title_page = musinsa_html.find("div", {"class": "title-page"})
    title = str.strip(title_page.text)
    list_box = musinsa_html.find("div", {"class": "list-box box"})
    list_box_ul = list_box.find("ul", {"id": "searchList"})
    list_box_items = list_box_ul.find_all("li", {"class": "li_box"})

    items = []
    for item in list_box_items:
        my_item = {}

        li_inner = item.find("div", {"class": "li_inner"})
        list_img = li_inner.find("div", {"class": "list_img"})
        img = list_img.find("a").find("img")
        if img.get("data-original") == None:
            my_item["imgSrc"] = "https:" + img.get("src")
        else:
            my_item["imgSrc"] = "https:" + img.get("data-original")

        my_item["href"] = list_img.find("a").get("href")

        item_info = li_inner.find("div", {"class": "article_info campaign_goods_info"})
        item_title = item_info.find("p", {"class": "item_title"}).find("a").text
        item_sub_title = str.strip(
            item_info.find("p", {"class": "list_info"}).find("a").text
        )

        my_item["title"] = item_title
        my_item["sub_title"] = item_sub_title

        price = item_info.find("div", {"class": "price"})
        
        if price.find('div', {'class': 'normal_price'}).find('del') != None:
            my_item['normal_price'] = price.find('div', {'class': 'normal_price'}).find('del').text
            my_item['discounted_price'] = str.strip(price.find('div', {'class': 'normal_price'}).text)
            my_item['discount_percent'] = price.find("div", {"class": "discount_price"}).find("span").text
        else:
            my_item['normal_price'] = str.strip(price.find('div', {'class': 'normal_price'}).text)


        items.append(my_item)
    return items


class MusinsaView(APIView):
    def get(self, request, format=None):
        articles = getMusinsaNews()
        campaigns = getMusinsaCampaigns()
        return Response({"news_articles": articles, "campaigns": campaigns})


class MusinsaDetail(APIView):
    def get(self, request, *args, **kwargs):
        url = request.GET["url"]
        items = getMusinsaItems(url)
        return Response({"items": items})
