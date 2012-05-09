(function($){
	var defaults = {
		audioButtonClass: "audioButton",  			//class applied to DOM elements used as buttons
		autoPlay: null,	
		codecs: [{name:"OGG", codec: 'audio/ogg; codecs="vorbis"'}, {name:"MP3", codec: 'audio/mpeg'}],
		continuous: false,
		extension: null,							//file extension used by flash version of audio player
		flashAudioPlayerPath: "lib/swf/player.swf",		//path to flash version of audio player
		flashExtension: ".mp3",
		flashObjectID: "audioPlayer",				//id of flash object
		loadingClass: "loading",					//class applied to buttons while media loads
		loop: false,
		playerContainer: "player",					//id of DOM element that contains audio element (or is replaced by flash)
		playingClass: "playing",					//class applied to buttons while media plays
		swfobjectPath: "lib/js/swfobject.js",		//path to swfobject.js used to embed flash movie in page
		volume: 0.5									//playback volume - float (0 - 1.0)
	},
	currentTrack,								//reference to the current(or last played) track
	isPlaying = false,							//track play state of track
	isFlash = false,							//force player into flash mode for testing
	audio,										//audio element or id of embedded flash player									
	$buttons,
	$tgt,
	$el,
	playTrack,
	resumeTrack,
	pauseTrack,
	methods = {
		play: function(element){
			$tgt = element;
			currentTrack = $tgt.attr("href");
			isPlaying = true;
			$tgt.addClass(defaults.loadingClass);
			$buttons.removeClass(defaults.playingClass);
			
			if(isFlash){
				if(audio) {
					_methods.removeListeners(window);
				}
				audio = document.getElementById(defaults.flashObjectID);
				_methods.addListeners(window);
				audio.playFlash(currentTrack + defaults.extension);
			} else {
				if(audio) {
					audio.pause();
					_methods.removeListeners(audio);
				}
			    audio = new Audio("");
				_methods.addListeners(audio);
			    audio.id = "audio";
				audio.loop = defaults.loop ? "loop" : "";
				audio.volume = defaults.volume;
			    audio.src = currentTrack + defaults.extension;
				audio.play();
			}
		},
		
		pause: function(){
			if(isFlash){
				audio.pauseFlash();
			} else {
				audio.pause();
			}
			
			$tgt.removeClass(defaults.playingClass);
			isPlaying = false;
		},
		
		resume: function(){
			if(isFlash){
				audio.playFlash();
			} else {
				audio.play();
			}
			$tgt.addClass(defaults.playingClass);
			isPlaying = true;
		},
		
		playing: function(){
			return isPlaying;
		}
	},
	 _methods = {
		init: function( options ){
			var types;
			$.extend(defaults, options);
			$el = this;
			$(".controls").bind("click",function(event){
				_methods.updateTrackState(event);
			});
			$buttons = $("."+defaults.audioButtonClass);
			
			types = defaults.codecs;
			for(var i = 0, ilen = types.length; i < ilen; i++){
				var type = types[i];
				if(_methods.canPlay(type)){
					defaults.extension = [".", type.name.toLowerCase()].join("");
					break;
				}
			}
			
			if(!defaults.extension || isFlash){
				isFlash = true;
				defaults.extension = defaults.flashExtension;
			}
			
			if(isFlash){
				$el.html("<div id='" + defaults.playerContainer + "'/>");
				$.getScript(defaults.swfobjectPath,function(){
					swfobject.embedSWF(defaults.flashAudioPlayerPath, defaults.playerContainer, "0", "0", "9.0.0", "swf/expressInstall.swf", false, false, {id:defaults.flashObjectID}, _methods.swfLoaded);
				});
			} else {
				if(defaults.autoPlay){
					methods.play(defaults.autoPlay);
				}
			}
		},
		
		updateTrackState: function( evt ){
			$tgt = $(evt.target);
			if(!$tgt.hasClass("audioButton"))return;
		    if(!audio || (audio && currentTrack !== $tgt.attr("href"))){
				methods.play($tgt);
			} else if(!isPlaying) {
				methods.resume();
			} else {
				methods.pause();
			}
		},
		
		addListeners: function(elem) {
			$(elem).bind({"canplay" : _methods.onLoaded,
						  "error" : _methods.onError,
						  "ended" : _methods.onEnded});
		},

		removeListeners: function(elem) {
			$(elem).unbind({"canplay" : _methods.onLoaded,
							"error" : _methods.onError,
							"ended" : _methods.onEnded});
		},
		
		onLoaded: function () {
			$buttons.removeClass(defaults.loadingClass);
			$tgt.addClass(defaults.playingClass);
			
			audio.play();
		},
		
		onError: function () {
			$buttons.removeClass(defaults.loadingClass);
			if(isFlash){
				_methods.removeListeners(window);
			} else {
				_methods.removeListeners(audio);
			}
		},

		onEnded: function () {
			isPlaying = false;
			$tgt.removeClass(defaults.playingClass);
			currentTrack = "";
			if(isFlash){
				_methods.removeListeners(window);
			} else {
				_methods.removeListeners(audio);
			}
			
			if(defaults.continuous){
				var $next = $tgt.next().length ? $tgt.next() : $(defaults.audioButtonClass).eq(0);
				methods.play($next);
			}
			
		},
		
		canPlay: function(type) {
			if(!document.createElement("audio").canPlayType){
				return false;
			} else {
				return document.createElement("audio").canPlayType(type.codec).match(/maybe|probably/i) ? true : false;
			}
		},
		
		swfLoaded: function(){
			if(defaults.autoPlay){
				setTimeout(function(){methods.play(defaults.autoPlay);}, 500);
			}
		}
	};
	
	$.fn.ubaPlayer = function(method){
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if ( typeof method === "object" || ! method ) {
			return _methods.init.apply( this, arguments );
	    } else {
			$.error( "Method " +  method + " does not exist on jquery.ubaPlayer" );
	    }
	};
	
})(jQuery);