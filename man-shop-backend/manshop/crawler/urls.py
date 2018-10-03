from django.contrib import admin
from django.urls import path
from .views import MusinsaView, MusinsaDetail

urlpatterns = [
    path("musinsa/", MusinsaView.as_view()),
    path("musinsa/detail/", MusinsaDetail.as_view()),
]
