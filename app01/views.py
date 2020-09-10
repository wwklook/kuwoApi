from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from app01 import api
# Create your views here.


def home(request):
    if request.method == "GET":
        return render(request, 'music.html')
    else:
        word = request.POST.get('search')
        json = api.get_search(word)
        return render(request, 'music.html', {'json': json, 'len': len(json)})


def get_singer_top(request):
    if request.method == "GET":
        pn = request.GET.get('pn')
    else:
        pn = 1 # request.POST.get('pn')
    json = api.get_singers(pn)
    return JsonResponse(json)


def get_singerMusic(request):
    if request.method == "GET":
        aid = request.GET.get('aid')
        pn = request.GET.get('pn')
    else:
        aid = request.POST.get('aid')
        pn = 1 # request.POST.get('pn')
    json = api.get_singerMusic(aid, pn)
    return JsonResponse(json)

def get_singerAlbum(request):
    if request.method == "GET":
        aid = request.GET.get('aid')
        pn = request.GET.get('pn')
    else:
        aid = request.POST.get('aid')
        pn = 1 # request.POST.get('pn')
    json = api.get_singerAlbum(aid, pn)
    return JsonResponse(json)

def get_singerMv(request):
    if request.method == "GET":
        aid = request.GET.get('aid')
        pn = request.GET.get('pn')
    else:
        aid = request.POST.get('aid')
        pn = 1 # request.POST.get('pn')
    json = api.get_singerMv(aid, pn)
    return JsonResponse(json)

def get_singerInfo(request):
    if request.method == "GET":
        aid = request.GET.get('aid')
    else:
        aid = request.POST.get('aid')
    json = api.get_singerInfo(aid)
    return JsonResponse(json)

def get_rank(request):
    if request.method == "GET":
        bid = request.GET.get('bid')
    else:
        bid = request.POST.get('bid')
    json = api.get_rank(bid)
    return JsonResponse(json)


def get_songinfoandlrc(request):
    if request.method == "GET":
        rid = request.GET.get('rid')
    else:
        rid = request.POST.get('rid')
    json = api.get_songinfoandlrc(rid)
    return JsonResponse(json)

def get_search(request):
    if request.method == "GET":
        word = request.GET.get('word')
        pn = request.GET.get('pn')
    else:
        word = request.POST.get('word')
        pn = 1
    json = api.get_search(word, pn)
    return JsonResponse(json)

def get_comment(request):
    if request.method == "GET":
        sid = request.GET.get('sid')
        pn = request.GET.get('pn')
    else:
        sid = request.POST.get('sid')
        pn = 1
    json = api.get_hot_comment(sid, pn)
    return JsonResponse(json)

def get_mvs(request):
    if request.method == "GET":
        pn = request.GET.get('pn')
    else:
        pn = request.POST.get('pn')
    json = api.get_mvs(pn)
    return JsonResponse(json)

def get_mv_url(request):
    if request.method == "GET":
        rid  = request.GET.get('rid')
    else:
        rid  = request.POST.get('rid')
    url = api.get_mv_url(rid)
    return HttpResponse(url)

def download(request):
    if request.method == "POST":
        url = request.POST.get('url')
        content = api.download(url)
        return HttpResponse(content)

def get_music_url(request):
    if request.method == "GET":
        rid  = request.GET.get('rid')
    else:
        rid  = request.POST.get('rid')
    br = "320kmp3"
    url = api.get_music_url(rid, br)
    return HttpResponse(url)

def get_rcm(request):
    if request.method == "GET":
        pn = request.GET.get('pn')
    else:
        pn = request.POST.get('pn')
    json = api.get_rcm(pn)
    return JsonResponse(json)

def get_rcm_list(request):
    if request.method == "GET":
        pid = request.GET.get('pid')
        pn = request.GET.get('pn')
    else:
        pid = request.POST.get('pid')
        pn = request.POST.get('pn')
    json = api.get_rcm_list(pid, pn)
    return JsonResponse(json)

def get_album(request):
    if request.method == "GET":
        aid = request.GET.get('aid')
        pn = request.GET.get('pn')
    else:
        aid = request.POST.get('aid')
        pn = request.POST.get('pn')
    json = api.get_album(aid, pn)
    return JsonResponse(json)