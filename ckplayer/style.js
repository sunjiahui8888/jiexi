﻿var adtime=0;var videos=new Array();var timeline=new Array(0);var nowVideoLocation=0;var playerNum=0;var totalTime=0;var currentVideoTime=0;var i=0;var targetTime=0;var targetPlayer=0;var loadNextSource=false;var playtime=0;var vodhtml='<div class="player"><div class="play"></div><div class="vod"><video class="video"></video><video class="video" style="display:none"></video></div><div class="cmd"><div class="left tvp_button tvp_play"><button type="button" title="播放暂停"><span class="tvp_btn_value">播放</span></button></div><div class="centent tvp_time_rail"><span class="tvp_time_total"><span class="tvp_time_loaded" style="width:0"></span></span> <span class="tvp_time_panel"><span class="time1">00:00</span>/<span class="time2">00:00</span></span></div><div class="right tvp_button tvp_fullscreen_button"><button type="button" title="全屏切换"><span class="tvp_quan">全屏</span></button></div><span class="tvp_time_handel_hint" style="display:none"></span></div></div>';var ydiskvod={init:function(urlarr){if(urlarr instanceof Array){videos=urlarr;}else{videos[0]=urlarr;}$('document').ready(function(){initTimeline();$('.tvp_button,.play').click(function(){if($('.video')[playerNum].paused){$('.video')[playerNum].play();$('.play').hide();$('.tvp_button').removeClass('tvp_play').addClass('tvp_pause');}else{$('.video')[playerNum].pause();$('.play').show();$('.tvp_button').addClass('tvp_play').removeClass('tvp_pause');}});$('.tvp_time_total').click(function(){var w=parseFloat($(this).css('width'));var l=$(this).offset().left;var e=event||window.event;var p=e.pageX;var pro=(p-l)/w*100+'%';$('.tvp_time_loaded').css('width',pro);var time=totalTime*(p-l)/w;setToTime(time)});$('.tvp_fullscreen_button').click(function(){$('.video')[playerNum].webkitEnterFullscreen();$('.video')[playerNum].mozRequestFullScreen();return false})})}};function initHandler(){timeline[i]=$('.video')[1].duration;totalTime+=timeline[i];if(i<videos.length-1){$('.video')[1].src=videos[++i]}else{$('.video')[1].src='';$('.video')[1].removeEventListener('loadedmetadata',initHandler,true)}}function currentTimeHandler(){currentVideoTime=$('.video')[playerNum].currentTime;if(timeline[nowVideoLocation]-currentVideoTime<20&&!loadNextSource){loadNextVideo(nowVideoLocation+1);loadNextSource=true}var currentVideoTime2=Number(playtime)+Number(currentVideoTime);$('.time1').html(timetostr(currentVideoTime2));$('.time2').html(timetostr(totalTime));var wid=currentVideoTime2/totalTime*100+'%';$('.tvp_time_loaded').css('width',wid);$('.video')[playerNum].controls=false;}function initTimeline(){$('.video')[1].preload='auto';$('.video')[1].src=videos[i];$('.video')[0].src=videos[i];$('.video')[1].addEventListener('loadedmetadata',initHandler,true);$('.video')[0].addEventListener('timeupdate',currentTimeHandler,true);$('.video')[0].addEventListener('ended',switchNextVideo,true)}function loadNextVideo(nextLocation){var nextPlayer=Number(!playerNum);if(nextLocation<videos.length){$('.video')[nextPlayer].preload='auto';$('.video')[nextPlayer].src=videos[nextLocation]}}function setToTime(time){var videoChapter;var nextPlayer=Number(!playerNum);if(time>=totalTime){videoChapter=videos.length-1;time=totalTime}else{for(videoChapter=0;videoChapter<videos.length-1;videoChapter++){if(time-timeline[videoChapter]<0){break}else{time-=timeline[videoChapter]}}}if(videoChapter==nowVideoLocation){$('.video')[playerNum].currentTime=time}else{loadNextVideo(videoChapter);targetTime=time;targetPlayer=nextPlayer;$('.video')[targetPlayer].addEventListener('durationchange',jumpToTime,true);switchToVideo();nowVideoLocation=videoChapter}}function jumpToTime(){$('.video')[targetPlayer].currentTime=targetTime;$('.video')[targetPlayer].removeEventListener('durationchange',jumpToTime,true)}function switchNextVideo(){var nextPlayer=Number(!playerNum);loadNextSource=false;if(nowVideoLocation<videos.length-1){$('.video:eq('+nextPlayer+')').css('display','');$('.video:eq('+playerNum+')').css('display','none');$('.video')[playerNum].pause();$('.video')[playerNum].removeEventListener('timeupdate',currentTimeHandler,true);$('.video')[playerNum].removeEventListener('ended',switchNextVideo,true);$('.video')[playerNum].src='';$('.video')[nextPlayer].addEventListener('timeupdate',currentTimeHandler,true);$('.video')[nextPlayer].addEventListener('ended',switchNextVideo,true);$('.video')[nextPlayer].play();nowVideoLocation++;playerNum=nextPlayer;playtime = Number(playtime) + Number(currentVideoTime);}else{$('.video')[playerNum].removeEventListener('ended',switchNextVideo,true)}}function switchToVideo(){var nextPlayer=Number(!playerNum);loadNextSource=false;$('.video:eq('+nextPlayer+')').css('display','');$('.video:eq('+playerNum+')').css('display','none');$('.video')[playerNum].pause();$('.video')[playerNum].removeEventListener('timeupdate',currentTimeHandler,true);$('.video')[playerNum].removeEventListener('ended',switchToVideo,true);$('.video')[playerNum].src='';$('.video')[nextPlayer].addEventListener('timeupdate',currentTimeHandler,true);$('.video')[nextPlayer].addEventListener('ended',switchToVideo,true);$('.video')[nextPlayer].play();playerNum=nextPlayer;playtime=Number(playtime)+Number(currentVideoTime)}function timetostr(time){var s=parseInt(time%60);if(s<10){s='0'+s}var m=parseInt(time/60);if(m<10){m='0'+m}return m+':'+s}function error(){if(WMXZ_WANG.isiPad){if($('.video')[playerNum].error != null && typeof($('.video')[playerNum].error.code) != undefined && $('.video')[playerNum].error.code==4){play_up()}}else{CKobject.getObjectById('ckplayer_a1').addListener('error','play_up')}}function get_msg(msg){$('#loading').hide();$('#a1').hide();$('#error').html(msg).show();}function playad(){if(WMXZ_WANG.ads){WMXZ_WANG.play = 1;if(WMXZ_WANG.isiPad){WMXZ_WANG.play = 0;}$('#loading').hide();var ads = WMXZ_WANG.ads.split('|');var adhtml = '<a href="'+ads[1]+'" target="_blank"><img src="'+ads[0]+'"></a><span>【播放等待<b>'+ads[2]+'</b>秒后开始】</span>';$('#ads').html(adhtml).show();var img = new Image();img.src = ads[0];img.onload = function(){var w = $('#ads').width();if(img.width>w){$('#ads img').css('width',w);$('#ads img').css('left',0);var h = $('#ads img').height();$('#ads img').css('margin-top','-'+h/2+'px');}else{$('#ads img').css('margin-left','-'+parseInt(img.width)/2+'px');$('#ads img').css('margin-top','-'+parseInt(img.height)/2+'px');}};adtime = ads[2];var adds = setInterval(function(){adtime--;if(adtime<1){if(WMXZ_WANG.isiPad){$('.video')[playerNum].play();}$('#ads').hide();$('#a1').show();clearInterval(adds);}else{$('#ads b').html(adtime);$('#ads').show();$('#a1').hide();}},1000);}}function player(up){if(up==0){playad();}$.post("api.php", {"url": WMXZ_WANG.url,"up": up},function(data){if(data['msg'] == 'ok' && data['url']){if(data['ext']=='post'){posts(data['url']);}else{vod_player(data);}}else{vod_err(data['msg']);}},"json");}function play_up(){WMXZ_WANG.errid++;if(WMXZ_WANG.errid < 3){player(1);}else{get_msg('无名小站');}}function posts(url){$.getJSON(url+"&callback=?",function(json) {if(json.data){$.post("api.php", {"url": WMXZ_WANG.url,"up": WMXZ_WANG.update,"data": json.data},function(data){if(data['msg'] == 'ok' && data['url']){vod_player(data);}else{vod_err(data['msg']);}});}else{vod_err('');}});}function vod_player(data){var autoplay = WMXZ_WANG.play==1?'autoplay="autoplay"':'';if(data['ext']=='link'){$('#a1').html('<iframe width="100%" height="100%" allowTransparency="true" frameborder="0" scrolling="no" src="'+data['url']+'"></iframe>');}else if(data['ext']=='h5_fd'){$('#a1').html(vodhtml);WMXZ_WANG.isiPad = true;ydiskvod.init(data['url']);var h=parseFloat($('body').css('height'));$('.video').css('height',(h-40));setInterval('error()',1000);}else if(WMXZ_WANG.isiPad || data['ext']=='h5'){$('#a1').html('<video class="video" src="'+data['url']+'" controls="controls" '+autoplay+' style="margin-bottom:0px;"></video>');WMXZ_WANG.isiPad = true;setInterval('error()',1000);}else{if(data['ext']=='m3u8' || data['ext']=='m3u8_list'){var flashvars={f:WMXZ_WANG.webpath+'ckplayer/m3u8.swf',a:data['url'],c:0,s:4,lv:0,p:1,v:100,loaded:'error'}}else if(data['ext']=='mp4'){var flashvars={f:data['url'],c:0,s:0,p:WMXZ_WANG.play,v:100,h:3,loaded:'error'};}else if(data['ext']=='xml'){var flashvars={f:data['url'],c:0,s:2,p:WMXZ_WANG.play,v:100,h:3,loaded:'error'};}var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};CKobject.embedSWF(WMXZ_WANG.webpath+'ckplayer/ckplayer.swf','a1','ckplayer_a1','100%','100%',flashvars,params);}$('#loading').hide();$('#a1').show();}function vod_err(msg){if(msg==null){get_msg('无名小站');}else{get_msg(msg);}} $(document).ready(function() { $('.WMXZ-WANG').click(function() { $('.panel').slideToggle('slow'); }); }); document.oncontextmenu=function(){ return false; }