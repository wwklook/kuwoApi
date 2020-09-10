window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

window.onload = function() {
  var audio = document.querySelector("audio");
  var video = document.querySelector("video");
  var slider = document.getElementById("slider");
  var time = document.getElementById("time");
  var last = document.getElementById("last");
  var p = document.getElementById("play");
  var next = document.getElementById("next");
  var like = document.getElementById("like");
  var comment = document.getElementById("comment");
  var comment_list = document.getElementById("comment_list");
  var context = document.getElementById("context");
  var play_list = document.getElementById("play_list");
  var p_list = document.getElementById("p_list");
  var p_ul = document.querySelector(".p_ul");
  var load = document.getElementById("load");
  var loop = document.getElementById("loop");
  var vol = document.getElementById("volume");
  var vol_s = document.getElementById("vol_slider");
  var img = document.getElementById("img");
  var sartist = document.getElementById("sartist");
  var sname = document.getElementById("sname");
  var back = document.getElementById("back");
  var cover = document.getElementById("cover");
  var lrc = document.getElementById("lrc");
  var ps = document.querySelectorAll(".ps");
  var search = document.querySelector(".search");

  var mv_ctrl = document.querySelector(".mv_ctrl");
  var full_screen = document.querySelector("#full_screen");
  var full_browser = document.querySelector("#full_browser");
  var mv_vol = document.querySelector("#mv_volume");
  var speed = document.querySelector("#speed");
  var mv_play = document.querySelector("#mv_play");
  var mv_next = document.querySelector("#mv_next");
  var mv_vol_s = document.querySelector("#mv_vol_slider");
  var mv_slider = document.querySelector("#mv_slider");
  var mv_time = document.getElementById("mv_time");
  var mvClickSlider = false;

  var search_list = document.querySelector(".search_list");
  var song_info = document.querySelector(".song_info");
  var rank_list = document.querySelectorAll(".rank");

  var singer_top = document.querySelector("#singer_top");
  var singer_rank = document.querySelector(".singer_rank");
  var singer_info = document.querySelector("#singer_info");
  var artist_info = document.querySelector("#artist_info");
  var mv = document.querySelector("#mv");
  var mvs = document.querySelector(".mvs");
  var mvs_page = document.querySelector(".mvs_page");
  var rcm = document.querySelector("#rcm");
  var rcms = document.querySelector(".rcms");
  var rcm_page = document.querySelector(".rcm_page");
  var album_page = document.querySelector(".album_page");
  var album_img = document.querySelector(".album_img");
  var album_name = document.querySelector(".album_name");
  var album_artist = document.querySelector(".album_artist");
  var album_intro = document.querySelector(".album_intro");
  var lang = document.querySelector(".lang");
  var album_time = document.querySelector(".album_time");
  var spread = document.querySelector(".spread");

  var where = "song_info";
  var isClickSlider = false;
  var isLike = false;
  var isplayshow = false;
  var ishasmv = [];
  var p_mvid = [];

  var looped = "list_loop";
  var sound = 1;
  var current_num = 0;

  var bangid = ['93', '16', '242', '264', '104', '183', '15', '283'];
  var history = [];
  var p_html = "";

  var aid_list = [];
  var rid_list = [];
  var albumid_list = [];
  var artistid_list = [];
  var mvid = [];
  var mvIndex = 0;
  var like_id = [];

  var current_album = [];
  var playList = [];
  var playIndex = 0;
  var current_artist = [];

  var objlist = {
    "search_list": search_list,
    "song_info": song_info,
    "singer_info": singer_info,
    "singer_rank": singer_rank,
    "mvs": mvs,
    "mvs_page": mvs_page,
    "rcms": rcms,
    "rcm_page": rcm_page,
    "album_page": album_page,
    "cover": cover,
    "context": context,
  }

  var lrclist = [];
  audio.volume = 0.85;
  showcanvas();

  Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) {
        return i;
      };
    }
    return -1;
  };
  Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };

  for (let i = 0; i < rank_list.length; i++) {
    rank_list[i].addEventListener("click", function() {
      hide(objlist[where]);
      show(song_info);
      where = "song_info";
      history.push(where);
      video.pause();
      let bid = bangid[i];
      let xhr = new XMLHttpRequest();
      xhr.open('post', 'get_rank', true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let res = eval('(' + xhr.responseText + ')')["data"];
          showlist(res);
        }
      };
      xhr.send('bid=' + bid);
    });
  }

  rcm.addEventListener("click", function() {
    hide(objlist[where]);
    show(rcms);
    where = "rcms";
    history.push(where);
    video.pause();
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'get_rcm', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let res = eval('(' + xhr.responseText + ')');
        let data = res.data;
        let html = "<ul>";
        let pid = [];
        for (let i = 0; i < data.length; i++) {
          html += '<li><img class="rcms_img" src="' + data[i].img + '"><img class="rcms_play" src="/static/play.png"><p><span class="rcms_name">' + data[i].name + '</span></p><p><span class="listencnt">▷' + data[i].listencnt + '</span></p></li>'
          pid.push(data[i].id)
        }
        html += "</ul>"
        rcms.innerHTML = html;
        let img = rcms.querySelectorAll(".rcms_img");
        let play = rcms.querySelectorAll(".rcms_play");
        let name = rcms.querySelectorAll(".rcms_name");
        for (let j = 0; j < img.length; j++) {
          img[j].addEventListener("click", function() {
            show_rcm(pid[j])
          })
          name[j].addEventListener("click", function() {
            show_rcm(pid[j])
          })
          play[j].addEventListener("click", function() {
            show_rcm(pid[j])
          })
          img[j].addEventListener("mousemove", function() {
            show(play[j]);
          })
          play[j].addEventListener("mousemove", function() {
            show(play[j]);
          })
          img[j].addEventListener("mouseleave", function() {
            hide(play[j]);
          })
        }

      }
    };
    xhr.send('pn=' + 1);
  })
  search.addEventListener("keypress", function(e) {
    let word = search.value;
    if (e.keyCode === 13 && word !== "") {
      hide(objlist[where]);
      show(song_info);
      where = "song_info";
      history.push(where);
      video.pause();
      let xhr = new XMLHttpRequest();
      xhr.open('post', 'get_search', true)
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let res = eval('(' + xhr.responseText + ')');
          showlist(res.songlist);
        }
      }
      xhr.send('word=' + word);
    }
  });
  spread.addEventListener("click", function() {
    if (spread.innerText === "展开") {
      spread.innerText = "收起";
      album_intro.style.height = "auto";
    } else {
      spread.innerText = "展开";
      album_intro.style.height = "33px";
    }
  });
  mv.addEventListener("click", function() {
    if (where !== "mvs") {
      hide(objlist[where]);
      show(mvs);
      where = "mvs";
      history.push(where);
      video.pause();
      let xhr = new XMLHttpRequest();
      xhr.open('post', 'get_mvs', true)
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let res = eval('(' + xhr.responseText + ')');
          let mvlist = res.mvlist;
          let html = "<ul>";
          mvid = [];
          artistid_list = [];
          for (let i = 0; i < mvlist.length; i++) {
            html += '<li><img class="mvs_img" src="' + mvlist[i].pic + '"><img class="mvs_play" src="/static/play.png"><div class="mvs_info"><span class="mvs_cnt">▷' + mvlist[i].mvPlayCnt + '</span><span class="mvs_time">' + mvlist[i].songTimeMinutes + '</span></div><p><span class="mvs_title">' + mvlist[i].name + '</span></p><p><span class="mvs_name">' + mvlist[i].artist + '</span></p></li>';
            mvid.push(mvlist[i].id);
            artistid_list.push(mvlist[i].artistid);
          }
          html += "</ul>";
          mvs.innerHTML = html;
          let img = mvs.querySelectorAll(".mvs_img");
          let song = mvs.querySelectorAll(".mvs_title");
          let artist = mvs.querySelectorAll(".mvs_name");
          let mvs_play = mvs.querySelectorAll(".mvs_play");
          for (let j = 0; j < img.length; j++) {
            img[j].addEventListener("click", function() {
              mv_player(j)
            });
            song[j].addEventListener("click", function() {
              mv_player(j)
            });
            mvs_play[j].addEventListener("click", function() {
              mv_player(j)
            });
            img[j].addEventListener("mousemove", function() {
              show(mvs_play[j])
            });
            mvs_play[j].addEventListener("mousemove", function() {
              show(mvs_play[j])
            });
            img[j].addEventListener("mouseleave", function() {
              hide(mvs_play[j])
            });
            tosinger(artist[j], artistid_list[j]);
          }
        }
      }
      xhr.send("pn=1")
    }
  });
  video.addEventListener("timeupdate", function() {
    mv_time.innerText = toTime(video.currentTime) + "/" + toTime(video.duration);
    if (mvClickSlider == false) {
      mv_slider.value = video.currentTime / video.duration * 1000;
      mv_slider.style.backgroundSize = mv_slider.value / 10 + "% 100%";
    }
  });
  video.addEventListener("mousemove", function() {
    mv_ctrl.style.display = "block";
    animate(mv_ctrl, { "opacity": 0.8 }, function() {
      delay(mv_ctrl);
    })
  });
  video.addEventListener("mouseleave", function() {
    delay(mv_ctrl);
  });
  video.addEventListener("ended", function() {
    if (mvIndex < mvid.length - 1) {
      mv_player(mvIndex + 1);
    } else {
      mv_player(0);
    }
  });
  video.addEventListener("click", function() {
    playmv();
  });
  mv_slider.addEventListener("change", function() {
    video.currentTime = mv_slider.value * video.duration / 1000;
    mvClickSlider = false
  });
  mv_slider.addEventListener("input", function() {
    mvClickSlider = true;
    mv_slider.style.backgroundSize = mv_slider.value / 10 + "% 100%";
  });
  mv_vol.addEventListener("click", function() {
    if (video.muted) {
      video.muted = false;
      mv_vol_s.value = sound;
      video.volume = mv_vol_s.value;
      mv_vol.src = "/static/volume.png";
    } else {
      sound = video.volume
      video.muted = true;
      mv_vol_s.value = 0
      mv_vol.src = "/static/mv_muted.png";
    }
  });
  mv_vol_s.addEventListener("input", function() {
    video.volume = mv_vol_s.value;
    mv_vol_s.style.backgroundSize = mv_vol_s.value * 100 + "% 100%";
    if (mv_vol_s.value === 0) {
      video.muted = true;
      mv_vol.src = "/static/mv_muted.png";
    }
  });
  mv_ctrl.addEventListener("mousemove", function() {
    mv_ctrl.style.display = "block";
    animate(mv_ctrl, { "opacity": 0.8 })
  });
  mv_play.addEventListener("click", function() {
    playmv();
  });
  full_screen.addEventListener("click", function() {
    video.webkitEnterFullScreen();
  });
  full_browser.addEventListener("click", function() {
    video.className = "full_browser";
    mv_ctrl.style.width = "100%";
    mv_ctrl.style.margin = "-64px 0";
    mv_slider.style.width = "100%";
  });
  speed.addEventListener("click", function() {
    if (speed.innerText === "1X") {
      speed.innerText = "1.5X";
      video.playbackRate = "1.5";
    } else if (speed.innerText === "1.5X") {
      speed.innerText = "2X";
      video.playbackRate = "2";
    } else if (speed.innerText === "2X") {
      speed.innerText = "0.5X";
      video.playbackRate = "0.5";
    } else {
      speed.innerText = "1X";
      video.playbackRate = "1";
    }
  });
  mv_next.addEventListener("click", function() {
    if (mvIndex < mvid.length - 1) {
      mv_player(mvIndex + 1);
    } else {
      mv_player(0);
    }
  });
  singer_top.addEventListener("click", function() {
    if (where !== "singer_rank") {
      hide(objlist[where]);
      show(singer_rank);
      where = "singer_rank"
      history.push(where);
      video.pause();
      let xhr = new XMLHttpRequest();
      xhr.open('post', 'get_singer_top', true)
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let res = eval('(' + xhr.responseText + ')');
          let total = res.total;
          let artistList = res.artistList;
          let html = '';
          aid_list = [];
          for (let i = 0; i < artistList.length; i++) {
            html += '<div class="top10"><img src="' + artistList[i]['pic120'] + '"><br><span>' + artistList[i]['name'] + '</span><p>' + artistList[i]['musicNum'] + '首歌曲</p></div>'
            aid_list.push(artistList[i].id)
          }
          singer_rank.innerHTML = html;
          let img = singer_rank.querySelectorAll('.top10 img')
          let span = singer_rank.querySelectorAll('.top10 span')
          for (let j = 0; j < img.length; j++) {
            tosinger(img[j], aid_list[j]);
            tosinger(span[j], aid_list[j]);
          }
        }
      };
      xhr.send();
    }
  });
  audio.addEventListener("timeupdate", function() {
    let num = lrclist.length - 1;
    time.innerText = toTime(audio.currentTime) + "/" + toTime(audio.duration);
    for (i = 0; i < lrclist.length; i++) {
      if (audio.currentTime <= lrclist[i]["time"]) {
        num = i;
        break;
      }
    }
    if (num !== current_num && cover.style.display === "block") {
      let current = cover.querySelectorAll(".current")
      for (let i = 0; i < current.length; i++) {
        current[i].classList.remove("current")
      };
      ps[num + 4].classList.add("current");
      animate(lrc, { "scrollTop": num * 36 });
      current_num = num
    }
    if (isClickSlider == false) {
      slider.value = audio.currentTime / audio.duration * 400;
      slider.style.backgroundSize = slider.value / 4 + "% 100%";
    }
  });
  audio.addEventListener("ended", function() {
    if (loop.title === "列表循环") {
      nextmusic();
    } else if (loop.title === "单曲循环") {
      audio.currentTime = 0;
    } else {
      player(Math.floor(Math.random() * playList.length))
    }

  });
  audio.addEventListener("loadstart", function() {
    time.innerText = "00:00/00:00";
    let html = "<p></p><p></p><p></p><p></p><p></p>";
    for (i = 0; i < lrclist.length; i++) {
      html += "<p class='ps'>" + lrclist[i]["lineLyric"] + "</p>";
    }
    html += "<p></p><p></p><p></p><p></p><p></p><p></p>";
    lrc.innerHTML = html;
    ps = document.querySelectorAll("#lrc p");
    ps[5].classList.add("current");
  });
  audio.addEventListener("loadedmetadata", function() {
    time.innerText = toTime(audio.currentTime) + "/" + toTime(audio.duration);
    audio.currentTime = 0;
    loadcomment();
  });
  p.addEventListener("click", function() {
    playmusic()
  });
  slider.addEventListener("change", function() {
    audio.currentTime = slider.value * audio.duration / 400;
    isClickSlider = false
  });
  slider.addEventListener("input", function() {
    isClickSlider = true;
    slider.style.backgroundSize = slider.value / 4 + "% 100%";
  });
  vol.addEventListener("click", function() {
    if (audio.muted) {
      audio.muted = false;
      vol_s.value = sound;
      audio.volume = vol_s.value;
      vol.src = "/static/volume.png";
    } else {
      sound = audio.volume
      audio.muted = true;
      vol_s.value = 0
      vol.src = "/static/muted.png";
    }
  });
  vol_s.addEventListener("input", function() {
    audio.volume = vol_s.value;
    if (vol_s.value === 0) {
      audio.muted = true;
      vol.src = "/static/muted.png";
    }
  });
  img.addEventListener("click", function() {
    if (where !== "cover") {
      hide(objlist[where]);
      show(cover);
      where = "cover";
      history.push(where);
    }
  });
  back.addEventListener("click", function() {
    if (history.length > 1) {
      hide(objlist[history.pop(-1)]);
      let his = history[history.length - 1];
      show(objlist[his]);
      where = his;
    }
  });
  load.addEventListener("click", function() {
    if (audio.src !== "") {
      download(audio.src, sname.innerText)
    }
  });
  like.addEventListener("click", function() {
    if (!isLike) {
      like.src = "/static/_like.png";
      isLike = true;
    } else {
      like.src = "/static/like.png";
      isLike = false;
    }
  });
  next.addEventListener("click", function() {
    nextmusic();
  });
  last.addEventListener("click", function() {
    if (!playList.length) {
      return
    }
    pause = audio.paused
    if (playIndex > 0) {
      player(playIndex - 1);
    } else {
      player(playList.length - 1);
    }
    if (!pause) {
      audio.play();
    }
  });
  loop.addEventListener("click", function() {
    if (looped === "list_loop") {
      loop.src = "/static/loop.png";
      loop.title = "单曲循环";
      looped = "loop";
    } else if (looped === "loop") {
      loop.src = "/static/random.png";
      loop.title = "随机播放";
      looped = "random";
    } else {
      loop.src = "/static/list_loop.png";
      loop.title = "列表播放";
      looped = "list_loop";
    }
  });
  comment.addEventListener("click", function() {
    hide(objlist[where]);
    show(context);
    loadcomment();
    where = "context";
    history.push(where);
  });
  play_list.addEventListener("click", function() {
    if (!isplayshow) {
      show(p_list);
      isplayshow = true;
    } else {
      hide(p_list);
      isplayshow = false;
    }
  });

  function show_rcm(pid) {
    hide(objlist[where]);
    show(rcm_page);
    where = "rcm_page";
    history.push(where);
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'get_rcm_list', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let data = eval('(' + xhr.responseText + ')').data;
        let musiclist = data.musicList;
        rcm_page.querySelector(".rp_img").src = data.img300;
        rcm_page.querySelector(".rp_name").innerText = data.name;
        rcm_page.querySelector(".rp_uname img").src = data.uPic;
        rcm_page.querySelector(".rp_uname span").innerText = data.userName;
        rcm_page.querySelector(".rp_info").innerText = data.info;
        let html = "<ul>";
        mvid = [];
        rid_list = [];
        albumid_list = [];
        artistid_list = [];
        for (let j = 0; j < musiclist.length; j++) {
          let hasmv = "";
          if (musiclist[j].hasmv) {
            hasmv = '<img class="mv" title="播放MV" src="/static/MV.png">';
            mvid.push(musiclist[j].rid)
          }
          html += '<li><div class="song_num"><span>' + (j + 1) + '</span><img class="photo" src="' + (musiclist[j].pic120 || "https://h5static.kuwo.cn/upload/image/4f768883f75b17a426c95b93692d98bec7d3ee9240f77f5ea68fc63870fdb050.png") + '">' + hasmv + '</div><div class="song_name"><span class="cur">' + musiclist[j].name + '</span></div><div class="song_singer"><span class="cur">' + musiclist[j].artist + '</span></div><div class="song_album"><span class="cur">' + musiclist[j].album + '</span></div><div class="song_time">' + musiclist[j].songTimeMinutes + '</div><div class="ctrl"><input class="cplay" title="播放" type="image" src="/static/player.png" /><input class="cadd" title="加入播放列表" type="image" src="/static/add.png" /><input class="clike" title="收藏" type="image" src="/static/like.png" /><input class="cload" title="下载" type="image" src="/static/load.png" /></div></li>';
          rid_list.push(musiclist[j].rid);
          albumid_list.push(musiclist[j].albumid);
          artistid_list.push(musiclist[j].artistid);
        }
        html += "</ul>";
        rcm_page.querySelector(".singer_list").innerHTML = html;
        addevent(rcm_page.querySelector(".singer_list"));
      }
    }
    xhr.send("pid=" + pid + "&pn=1")
  }

  function showlist(res) {
    let html = '<ul>';
    rid_list = [];
    albumid_list = [];
    artistid_list = [];
    mvid = [];
    ishasmv = [];
    for (let i = 0; i < res.length; i++) {
      let hasmv = "";
      ishasmv.push(res[i].hasmv);
      if (res[i].hasmv) {
        hasmv = '<img class="mv" title="播放MV" src="/static/MV.png">';
        mvid.push(res[i].rid)
      }
      p_mvid = mvid;
      html += '<li><div class="song_num"><span>' + (i + 1) + '</span><img class="photo" src="' + (res[i].pic120 || "https://h5static.kuwo.cn/upload/image/4f768883f75b17a426c95b93692d98bec7d3ee9240f77f5ea68fc63870fdb050.png") + '">' + hasmv + '</div><div class="song_name"><span class="cur">' + res[i].name + '</span></div><div class="song_singer"><span class="cur">' + res[i].artist + '</span></div><div class="song_album"><span class="cur">' + res[i].album + '</span></div><div class="song_time">' + res[i].songTimeMinutes + '</div><div class="ctrl"><input class="cplay" title="播放" type="image" src="/static/player.png" /><input class="cadd" title="加入播放列表" type="image" src="/static/add.png" /><input class="clike" title="收藏" type="image" src="/static/like.png" /><input class="cload" title="下载" type="image" src="/static/load.png" /></div></li>';
      rid_list.push(res[i].rid);
      albumid_list.push(res[i].albumid);
      artistid_list.push(res[i].artistid);
    }
    html += '</ul>';
    search_list.innerHTML = html;
    addevent(search_list);
  }

  function addevent(obj) {
    let cplay = obj.querySelectorAll('.cplay');
    let cadd = obj.querySelectorAll('.cadd');
    let cload = obj.querySelectorAll('.cload');
    let clike = obj.querySelectorAll('.clike');
    let song_singer = obj.querySelectorAll('.song_singer span');
    let song_name = obj.querySelectorAll('.song_name span');
    let song_album = obj.querySelectorAll('.song_album span');
    let mv = obj.querySelectorAll('.mv');
    for (let j = 0; j < cplay.length; j++) {
      cplay[j].addEventListener('click', function() {
        playList = rid_list;
        current_album = albumid_list;
        current_artist = artistid_list;
        p_html = "";
        for (let i = 0; i < cplay.length; i++) {
          showplist(song_name[i], song_singer[i], ishasmv[i], rid_list[i]);
        }
        player(j)
      });
      song_name[j].addEventListener('click', function() {
        playList = rid_list;
        current_album = albumid_list;
        current_artist = artistid_list;
        p_html = "";
        for (let i = 0; i < cplay.length; i++) {
          showplist(song_name[i], song_singer[i], ishasmv[i], rid_list[i]);
        }
        player(j)
      });
      cadd[j].addEventListener('click', function() {
        playList.push(rid_list[j]);
        p_mvid.push(rid_list[j]);
        current_album.push(albumid_list[j]);
        current_artist.push(artistid_list[j]);
        p_html = p_ul.innerHTML;
        showplist(song_name[j], song_singer[j], ishasmv[i], rid_list[j]);
      });
      cload[j].addEventListener('click', function() {
        let rid = rid_list[j]
        let xhr = new XMLHttpRequest();
        xhr.open('post', 'get_music_url', true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let url = xhr.response;
            download(url, song_name[j].innerText)
          }
        };
        xhr.send('rid=' + rid);
      })
      clike[j].addEventListener('click', function() {
        if (like_id.indexOf(rid_list[j]) === -1) {
          clike[j].src = "/static/_like.png";
          like_id.push(rid_list);
        } else {
          clike[j].src = "/static/like.png";
          like_id.remove(rid_list);
        }
      })
      tosinger(song_singer[j], artistid_list[j])
      toalbum(song_album[j], albumid_list[j])
    }
    for (let i = 0; i < mv.length; i++) {
      mv[i].addEventListener('click', function() {
        mv_player(i)
      });
    }
  }

  function player(index, fn = false) {
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'get_songinfoandlrc', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let res = eval('(' + xhr.responseText + ')');
        let songinfo = res.songinfo;
        let url = res.url;
        lrclist = res.lrc || [{ "lineLyric": "暂无歌词", "time": "00:00" }];
        p_ul.querySelectorAll("li")[playIndex].classList.remove("p_current");
        if (fn) { fn() }
        p_ul.querySelectorAll("li")[index].classList.add("p_current");
        playIndex = index;
        sname.title = songinfo.songName;
        sname.innerText = songinfo.songName;
        sartist.title = songinfo.artist;
        sartist.innerText = ' - ' + songinfo.artist;
        tosinger(sartist, current_artist[index])
        cover.querySelector('#cover_song').innerText = songinfo.songName;
        cover.querySelector('#cover_name').innerText = songinfo.artist;
        cover.querySelector('#cover_album').innerText = songinfo.album;
        cover.querySelector('.cover_img').src = songinfo.pic;
        tosinger(cover.querySelector("#cover_name"), current_artist[index]);

        img.src = songinfo.pic;
        p.src = "/static/pause.png";
        audio.src = url;
        audio.play();
      }
    }
    xhr.send("rid=" + playList[index])
  }

  function nextmusic() {
    if (!playList.length) {
      return
    }
    pause = audio.paused;
    if (playIndex < playList.length - 1) {
      player(playIndex + 1);
    } else {
      player(0);
    }
    if (!pause) {
      audio.play();
    }
  }

  function toalbum(obj, aid) {
    obj.addEventListener("click", function() {
      hide(objlist[where]);
      show(album_page);
      where = "album_page";
      history.push(where);
      video.pause();
      let xhr = new XMLHttpRequest();
      xhr.open('post', 'get_album', true)
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let res = eval('(' + xhr.responseText + ')')["data"];
          let musicList = res.musicList;
          album_img.src = res.pic;
          album_name.innerText = res.album;
          album_artist.innerText = res.artist;
          album_intro.innerText = res.albuminfo;
          album_time.innerText = res.releaseDate;
          lang.innerText = res.lang;
          let html = '<ul>'
          rid_list = [];
          albumid_list = [];
          artistid_list = [];
          mvid = []
          for (let j = 0; j < musicList.length; j++) {
            let hasmv = "";
            if (musicList[j].hasmv) {
              hasmv = '<img class="mv" title="播放MV" src="/static/MV.png">';
              mvid.push(musicList[j].rid)
            }
            html += '<li><div class="song_num"><span>' + (j + 1) + '</span><img class="photo" src="' + (musicList[j].pic120 || "https://h5static.kuwo.cn/upload/image/4f768883f75b17a426c95b93692d98bec7d3ee9240f77f5ea68fc63870fdb050.png") + '">' + hasmv + '</div><div class="song_name"><span class="cur">' + musicList[j].name + '</span></div><div class="song_singer"><span class="cur">' + musicList[j].artist + '</span></div><div class="song_album"><span class="cur">' + musicList[j].album + '</span></div><div class="song_time">' + musicList[j].songTimeMinutes + '</div><div class="ctrl"><input class="cplay" title="播放" type="image" src="/static/player.png" /><input class="cadd" title="加入播放列表" type="image" src="/static/add.png" /><input class="clike" title="收藏" type="image" src="/static/like.png" /><input class="cload" title="下载" type="image" src="/static/load.png" /></div></li>';
            rid_list.push(musicList[j].rid);
            albumid_list.push(musicList[j].albumid);
            artistid_list.push(musicList[j].artistid);
          }
          html += '</ul>';
          album_page.querySelector(".singer_list").innerHTML = html;
          addevent(album_page.querySelector(".singer_list"));
          tosinger(album_artist, res.artistid)
          if (album_intro.scrollHeight > 33) {
            spread.style.display = "block";

          } else {
            spread.style.display = "none";
          }
        }
      }
      xhr.send("aid=" + aid + "&pn=1")
    })
  }

  function mv_player(index) {
    mvIndex = index;
    hide(objlist[where]);
    show(mvs_page);
    where = "mvs_page";
    history.push(where);
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'get_mv_url', true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let url = xhr.response;
        video.src = url;
        video.play();
        if (!audio.paused) { playmusic() };
      }
    }
    xhr.send("rid=" + mvid[index])
  }

  function tosinger(obj, aid) {
    obj.addEventListener("click", function() {
      hide(objlist[where]);
      show(singer_info);
      where = "singer_info";
      history.push(where);
      video.pause();
      let xhr = new XMLHttpRequest();
      xhr.open('post', 'get_singerMusic', true)
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let res = eval('(' + xhr.responseText + ')');
          let songList = res.songList;
          let total = res.total;
          artist_info.querySelector("img").src = res.pic300;
          artist_info.querySelector(".singer_pname").innerHTML = res.name;
          let span = artist_info.querySelectorAll("span");
          span[0].innerText = "单曲 : " + res.musicNum;
          span[1].innerText = "专辑 : " + res.albumNum;
          span[2].innerText = "MV : " + res.mvNum;
          span[3].innerText = "粉丝 : " + res.artistFans;
          let html = '<ul>'
          rid_list = [];
          albumid_list = [];
          artistid_list = [];
          mvid = []
          for (let j = 0; j < songList.length; j++) {
            let hasmv = "";
            if (songList[j].hasmv) {
              hasmv = '<img class="mv" title="播放MV" src="/static/MV.png">';
              mvid.push(songList[j].rid)
            }
            html += '<li><div class="song_num"><span>' + (j + 1) + '</span><img class="photo" src="' + (songList[j].pic120 || "https://h5static.kuwo.cn/upload/image/4f768883f75b17a426c95b93692d98bec7d3ee9240f77f5ea68fc63870fdb050.png") + '">' + hasmv + '</div><div class="song_name"><span class="cur">' + songList[j].name + '</span></div><div class="song_singer"><span class="cur">' + songList[j].artist + '</span></div><div class="song_album"><span class="cur">' + songList[j].album + '</span></div><div class="song_time">' + songList[j].songTimeMinutes + '</div><div class="ctrl"><input class="cplay" title="播放" type="image" src="/static/player.png" /><input class="cadd" title="加入播放列表" type="image" src="/static/add.png" /><input class="clike" title="收藏" type="image" src="/static/like.png" /><input class="cload" title="下载" type="image" src="/static/load.png" /></div></li>';
            rid_list.push(songList[j].rid);
            albumid_list.push(songList[j].albumid);
            artistid_list.push(songList[j].artistid);
          }
          html += '</ul>';
          singer_info.querySelector(".singer_list").innerHTML = html;
          addevent(singer_info.querySelector(".singer_list"));
        }
      }
      xhr.send("aid=" + aid);
    });
  }

  function playmusic() {
    if (!playList.length) {
      return
    }
    if (audio.paused) {
      audio.play();
      video.pause();
      p.src = "/static/pause.png";
      mv_play.src = "/static/mv_play.png";
    } else {
      audio.pause();
      p.src = "/static/play.png";
    }
  }

  function playmv() {
    if (video.paused) {
      video.play();
      audio.pause();
      p.src = "/static/play.png";
      mv_play.src = "/static/mv_pause.png";
    } else {
      video.pause();
      mv_play.src = "/static/mv_play.png";
    }
  }

  function download(url, filename) {
    let xhr = new XMLHttpRequest();
    xhr.open('post', "download", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const a = document.createElement('a');
        //const blob = new Blob([xhr.response]);
        a.download = filename + '.mp3';
        a.href = url; //URL.createObjectURL(blob);
        console.log(a);
        a.click();
        //URL.revokeObjectURL(blob);
      }
    }
    xhr.send("url=" + url);
  }

  function loadcomment() {
    let sid = playList[playIndex];
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'get_comment', true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let res = eval('(' + xhr.responseText + ')')["rows"];
        let html = "";
        context.querySelector("span").innerText = res.length + "条";
        for (let i = 0; i < res.length; i++) {
          let pic = res[i]["u_pic"];
          if (pic === "http://thirdqq.qlogo.cn/g?b=oidb") {
            pic = "";
          }
          html += '<li><img class="u_img" src=' + pic + ' https://h5static.kuwo.cn/upload/image/4f768883f75b17a426c95b93692d98bec7d3ee9240f77f5ea68fc63870fdb050.png><div class="u_name">' + res[i]["u_name"] + '</div><div class="u_text">' + res[i]["msg"] + '</div><div class="u_time">' + res[i]["time"] + '</div></li>'
        }
        comment_list.innerHTML = html;
      }
    }
    xhr.send("sid=" + sid)
  }

  function showplist(name, artist, mv, mid) {
    let hasmv = "";
    if (mv) {
      hasmv = '<input class="mv" type="image" title="播放MV" src="/static/MV.png">';
      p_mvid.push(mid);
    }
    p_html += '<li><span class="song_name"><span> ' + name.innerText + '</span></span><span class="song_singer"><span> - ' + artist.innerText + ' </span></span><br/><input class="cplay" title="播放" type="image" src="/static/player.png" /><input class="clike" title="收藏" type="image" src="/static/like.png" /><input class="cload" title="下载" type="image" src="/static/load.png" /><input class="del" title="删除" type="image" src="/static/del.png" />' + hasmv + '<div class="cadd"></div><div class="song_album"><span></span></div></li>'
    p_ul.innerHTML = p_html;
    p_event(p_list);
    delevent(p_list);

  }

  function p_event(obj) {
    let cplay = obj.querySelectorAll('.cplay');
    let cload = obj.querySelectorAll('.cload');
    let clike = obj.querySelectorAll('.clike');
    let song_singer = obj.querySelectorAll('.song_singer span');
    let song_name = obj.querySelectorAll('.song_name span');
    let mv = obj.querySelectorAll('.mv');
    for (let j = 0; j < cplay.length; j++) {
      cplay[j].onclick = function() {
        p_html = "";
        player(j);
      }
      cload[j].onclick = function() {
        let rid = rid_list[j]
        let xhr = new XMLHttpRequest();
        xhr.open('post', 'get_music_url', true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let url = xhr.response;
            download(url, song_name[j].innerText)
          }
        };
        xhr.send('rid=' + rid);
      }
      clike[j].onclick = function() {
        if (like_id.indexOf(rid_list[j]) === -1) {
          clike[j].src = "/static/_like.png";
          like_id.push(rid_list);
        } else {
          clike[j].src = "/static/like.png";
          like_id.remove(rid_list);
        }
      }
      tosinger(song_singer[j], artistid_list[j])
      for (let i = 0; i < mv.length; i++) {
        mv[i].onclick = function() {
          mv_player(i)
        }
      }
    }
  }

  function delevent(obj) {
    let dele = obj.querySelectorAll('.del');
    for (let j = 0; j < dele.length; j++) {
      dele[j].onclick = function() {
        console.log(j, playList.length, playIndex);
        p_mvid.remove(playList[j]);
        playList.splice(j, 1);
        current_artist.splice(j, 1);
        current_album.splice(j, 1);
        ishasmv.splice(j, 1);
        if (!playList.length) {
          audio.src = "";
          audio.pause();
          obj.querySelectorAll("li")[j].remove();
          return
        }
        if (playIndex === j) {
          pause = audio.paused;
          if (playIndex < playList.length) {
            console.log(playIndex);
            player(playIndex, function() {
              obj.querySelectorAll("li")[j].remove();
              p_event(p_list);
              delevent(p_list);
            })
          } else {
            player(0, function() {
              obj.querySelectorAll("li")[j].remove();
              p_event(p_list);
              delevent(p_list);
            });
          }
          if (!pause) {
            audio.play();
          }
        } else if (playIndex > j) {
          playIndex -= 1;
          obj.querySelectorAll("li")[j].remove();
          p_event(p_list);
          delevent(p_list);
        } else {
          obj.querySelectorAll("li")[j].remove();
          p_event(p_list);
          delevent(p_list);
        }
      }
    }
  }

  function showcanvas() {
    var ctx = new AudioContext();
    var analyser = ctx.createAnalyser();
    var audioSrc = ctx.createMediaElementSource(audio);
    audioSrc.connect(analyser);
    analyser.connect(ctx.destination);
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    var canvas = document.getElementById('canvas'),
      cwidth = canvas.width,
      cheight = canvas.height - 2,
      meterWidth = 10, //width of the meters in the spectrum
      gap = 2, //gap between meters
      capHeight = 2,
      capStyle = '#fff',
      meterNum = 1100 / (10 + 2), //count of the meters
      capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
    ctx = canvas.getContext('2d'),
      gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(1, '#0f0');
    gradient.addColorStop(0.5, '#ff0');
    gradient.addColorStop(0, '#f00');

    function renderFrame() {
      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      var step = Math.round(array.length / meterNum); //sample limited data from the total array
      ctx.clearRect(0, 0, cwidth, cheight);
      for (var i = 0; i < meterNum; i++) {
        var value = array[i * step];
        if (capYPositionArray.length < Math.round(meterNum)) {
          capYPositionArray.push(value);
        };
        ctx.fillStyle = capStyle;
        //draw the cap, with transition effect
        if (value < capYPositionArray[i]) {
          ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
        } else {
          ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
          capYPositionArray[i] = value;
        };
        ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
        ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
      }
      requestAnimationFrame(renderFrame);
    }
    renderFrame();
  }
}

function toTime(x) {
  let m = parseInt(x / 60); // 分
  let s = parseInt(x % 60); // 秒
  if (m < 10) {
    m = "0" + m;
  };
  if (s < 10) {
    s = "0" + s;
  };
  return m + ":" + s
}

function hide(obj) {
  animate(obj, { "opacity": 0 }, function() {
    obj.style.display = "none";
  });
}

function show(obj, fn = false) {
  obj.style.display = "block";
  animate(obj, { "opacity": 1 }, fn);
}

function delay(obj) {
  clearInterval(obj.time2);
  let num = 0;
  obj.time2 = setInterval(function() {
    console.log(num);
    if (num === 1) {
      clearInterval(obj.time2);
      hide(obj);
    } else {
      num += 1
    }
  }, 1000);
}

function animate(obj, json, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    var flag = true;
    for (var k in json) {
      if (k === "opacity") {
        var leader = getComputedStyle(obj, null)[k] * 100;
        var tag = json[k] * 100;
        var step = (tag - leader) / 15;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
        obj.style[k] = leader / 100;
      } else if (k === "scrollTop") {
        var leader = obj[k];
        var tag = json[k];
        var step = (tag - leader) / 15;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
        obj[k] = leader;
      } else {
        var leader = parseInt(getComputedStyle(obj, null)[k]) || 0;
        var tag = json[k];
        var step = (tag - leader) / 15;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
        obj.style[k] = leader + "px";
      }
      if (leader !== tag) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(obj.timer);
      if (fn) {
        fn();
      }
    }
  }, 15);
}