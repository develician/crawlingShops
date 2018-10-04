import requests
from bs4 import BeautifulSoup as bs
import json
import os
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


def getMusinsaNews(url):
    musinsa_html = bs(requests.get(url).text, "html.parser")
    main_content = musinsa_html.find("div", {"class": "main-content"})
    news_wrapper = main_content.find("div", {"class": "content-wrapper news"})
    news_section = news_wrapper.find("div", {"class": "section"})
    news_ul = news_section.find("ul")
    list_items = news_ul.find_all("li", {"class": "listItem"})
    articles = []
    for item in list_items:
        article = {}
        article_img = (
            item.find("div", {"class": "articleImg"}).find("a").find("img").get("src")
        )
        article["imgSrc"] = "https:" + article_img.split(".0")[0]
        article_info = item.find("div", {"class": "articleInfo info"})
        article["title"] = str.strip(
            article_info.find("p", {"class": "title"}).find("a").text
        )
        article["href"] = (
            article_info.find("p", {"class": "title"}).find("a").get("href")
        )
        article["date"] = (
            article_info.find("div", {"class": "info"})
            .find("span", {"class": "date division"})
            .text
        )
        article["viewCnt"] = (
            article_info.find("div", {"class": "info"})
            .find("span", {"class": "view"})
            .find("span", {"class": "viewCnt"})
            .text
        )
        brandName = article_info.find("div", {"class": "info"}).find("b", {"class": "rev-division"})
        
        if brandName != None:
            article["brandName"] = (
            article_info.find("div", {"class": "info"})
            .find("b", {"class": "rev-division"})
            .find("a")
            .find("span")
            .text
        )

        
        article["description"] = (
            article_info.find("div", {"class": "description"}).find("a").find("p").text
        )
        articles.append(article)
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
    page = None
    if "page=" in url:
        print("url checking", url)
        # print(url.split("page=")[0])
        # print(url.split("page=")[1])
        divider = "page="
        page = url.split(divider)[1].split("&")[0]
        print("page = ", page)
    else:
        page = 1
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

        if price.find("div", {"class": "normal_price"}).find("del") != None:
            my_item["normal_price"] = (
                price.find("div", {"class": "normal_price"}).find("del").text
            )
            my_item["discounted_price"] = str.strip(
                price.find("div", {"class": "normal_price"}).text
            )
            my_item["discount_percent"] = (
                price.find("div", {"class": "discount_price"}).find("span").text
            )
        else:
            my_item["normal_price"] = str.strip(
                price.find("div", {"class": "normal_price"}).text
            )

        items.append(my_item)
    return {"items": items, "page": page, "title": title}


class MusinsaView(APIView):
    def get(self, request, format=None):
        query_params = request.GET

        url = ""
        for key in query_params:
            if key == "url":
                url += query_params[key]
            else:
                url += "&" + key + "=" + query_params[key]

        if int(query_params["p"]) > 1:
            news_articles = getMusinsaNews(url)
            return Response({"news_articles": news_articles})

        news_articles = getMusinsaNews(url)
        campaigns = getMusinsaCampaigns()
        return Response({"news_articles": news_articles, "campaigns": campaigns})


class MusinsaDetail(APIView):
    def get(self, request, *args, **kwargs):
        query_params = request.GET
        divider = "&"
        url = ""
        for key in query_params:
            # print(query_params[key])
            if key == "url":
                url += query_params[key] + divider
            else:
                url += key + "=" + query_params[key] + divider
        # url = request.GET["url"]
        musinsaItemsResult = getMusinsaItems(url)
        return Response(
            {
                "items": musinsaItemsResult["items"],
                "page": musinsaItemsResult["page"],
                "title": musinsaItemsResult["title"],
            }
        )
        # return Response({"items": [], "page": 1})
