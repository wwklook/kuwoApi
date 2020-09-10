import requests

headers = {
    'Cookie': 'kw_token=V2O1SAZLN2K',
    'csrf': 'V2O1SAZLN2K'
}


def get_album(aid, pn=1):
    url = 'http://www.kuwo.cn/api/www/album/albumInfo?albumId={}&pn={}&rn=30'.format(
        aid, pn)
    data = requests.get(url, headers=headers).json()["data"]
    return {'data': data}


def get_search(word, pn=1):
    import urllib
    url = 'http://www.kuwo.cn/api/www/search/searchMusicBykeyWord?key={}&pn={}&rn=30'.format(
        word, pn)
    header = {
        'cookie': 'kw_token=41UWWSCCNWF',
        'csrf': '41UWWSCCNWF',
        'Referer': 'http://www.kuwo.cn/search/list?key=' + urllib.parse.quote(word)
    }
    data = requests.get(url, headers=header).json()["data"]
    return {'total': data["total"], 'songlist': data["list"]}


def get_singers(pn=1):
    url = 'http://www.kuwo.cn/api/www/artist/artistInfo?category=0&prefix=&pn={}&rn=100'.format(
        pn)
    data = requests.get(url, headers=headers).json()["data"]
    # id name pic300 musicNum
    return {'total': data["total"], 'artistList': data["artistList"]}


def get_singerInfo(aid):
    url = 'http://www.kuwo.cn/api/www/artist/artist?artistid=' + aid
    data = requests.get(url, headers=headers).json()["data"]
    return data


def get_singerMusic(aid, pn=1):
    url = 'http://www.kuwo.cn/api/www/artist/artistMusic?artistid={}&pn={}&rn=30'.format(
        aid, pn)
    data = requests.get(url, headers=headers).json()["data"]
    return {'total': data["total"], 'songList': data["list"]}


def get_singerMv(aid, pn=1):
    url = 'http://www.kuwo.cn/api/www/artist/artistMv?artistid={}&pn={}&rn=28'.format(
        aid, pn)
    data = requests.get(url, headers=headers).json()["data"]
    return {"total": data["total"], "mvlist": data["mvlist"]}


def get_singerAlbum(aid, pn=1):
    url = 'http://www.kuwo.cn/api/www/artist/artistAlbum?artistid={}&pn={}&rn=28'.format(
        aid, pn)
    data = requests.get(url, headers=headers).json()["data"]
    return {"total": data["total"], "albumList": data["albumList"]}

def get_mvs(pn=1):
    url = 'http://www.kuwo.cn/api/www/music/mvList?pid=236682871&pn={}&rn=30'.format(
        pn)
    data = requests.get(url, headers=headers).json()["data"]
    return {"total": data["total"], "mvlist": data["mvlist"]}


def get_rank(bid):
    """
    酷我飙升榜： 93
    酷我新歌榜： 17
    酷我热歌榜： 16
    极品电音榜： 242
    国风音乐榜： 278
    酷我热评榜： 284
    Vlog背景乐榜： 264
    华语榜： 104
    欧美榜： 22
    日语榜： 183
    日本公信榜（Oricon）： 15
    轻音乐： 283
    """
    url = 'http://www.kuwo.cn/api/www/bang/bang/musicList?bangId={}&pn=1&rn=100'.format(
        bid)
    data = requests.get(url, headers=headers).json()["data"]
    return {'data': data["musicList"]}


def get_comment(sid, pn=1):
    import urllib
    url = 'http://www.kuwo.cn/comment?type=get_comment&f=web&page={}&rows=30&digest=15&sid={}&uid=0'.format(
        pn, sid)
    json = requests.get(url, headers=headers).json()
    for i in json["rows"]:
        i["u_name"] = urllib.parse.unquote(i["u_name"])
    return {'total': json["total"], 'rows':json["rows"]}


def get_hot_comment(sid, pn=1):
    import urllib
    url = 'http://www.kuwo.cn/comment?type=get_rec_comment&f=web&page={}&rows=30&digest=15&sid={}&uid=0'.format(
        pn, sid)
    json = requests.get(url, headers=headers).json()
    for i in json["rows"]:
        i["u_name"] = urllib.parse.unquote(i["u_name"])
    return {'total': json["total"], 'rows':json["rows"]}


def get_music_url(rid, br):
    url = "http://www.kuwo.cn/url?format=mp3&rid={}&response=url&type=convert_url3&br={}".format(
        rid, br)
    return requests.get(url).json()["url"]


def get_mv_url(rid):
    url = "http://www.kuwo.cn/url?format=mp4&rid={}&response=url&type=convert_url3".format(
        rid)
    return requests.get(url).json()["url"]


def get_songinfoandlrc(mid):
    music_url = get_music_url(mid, "320kmp3")
    try:
        url = 'http://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=' + mid
        data = requests.get(url, headers=headers).json()["data"]
    except Exception:
        songinfo = requests.get('http://www.kuwo.cn/api/www/music/musicInfo?mid='+mid, headers=headers).json()["data"]
        data = {"lrclist": "暂无歌词", 'songinfo': songinfo}
    return {'lrc': data["lrclist"], 'songinfo': data["songinfo"], 'url': music_url}


def get_rcm(pn, order="hot"):
    # order : new | hot
    url = 'http://www.kuwo.cn/api/pc/classify/playlist/getRcmPlayList?pn={}&rn=30&order={}'.format(
        pn, order)
    data = requests.get(url, headers=headers).json()["data"]
    return {"total": data["total"], "data": data["data"]}


def get_rcm_list(pid, pn=1):
    url = 'http://www.kuwo.cn/api/www/playlist/playListInfo?pid={}&pn={}&rn=30'.format(
        pid, pn)
    data = requests.get(url, headers=headers).json()["data"]
    return {"data": data}


def download(url):
    return requests.get(url).content
