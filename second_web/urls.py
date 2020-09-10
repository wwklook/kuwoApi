"""second_web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from kuwoApi import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home),
    path('get_singer_top', views.get_singer_top),           # 获取 歌手排行
    path('get_singerMusic', views.get_singerMusic),         # 获取 歌手歌曲列表
    path('get_singerAlbum', views.get_singerAlbum),         # 获取 歌手专辑列表
    path('get_singerInfo', views.get_singerInfo),           # 获取 歌手信息和简介
    path('get_singerMv', views.get_singerMv),               # 获取 歌手MV列表
    path('get_rank', views.get_rank),                       # 获取 歌曲排行榜
    path('get_songinfoandlrc', views.get_songinfoandlrc),   # 获取 歌曲信息和歌词
    path('get_search', views.get_search),                   # 获取 搜索列表
    path('get_comment', views.get_comment),                 # 获取 评论列表
    path('get_mvs', views.get_mvs),                         # 获取 MV列表
    path('get_mv_url', views.get_mv_url),                   # 获取 MV地址
    path('download', views.download),
    path('get_music_url', views.get_music_url),             # 获取 音乐地址
    path('get_rcm', views.get_rcm),                         # 获取 最热歌单列表
    path('get_rcm_list', views.get_rcm_list),               # 获取 歌单歌曲列表
    path('get_album', views.get_album),                     # 获取 专辑列表
]
