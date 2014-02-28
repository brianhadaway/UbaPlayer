/*! UbaPlayer - v2.0.2 -  * https://brianhadaway.github.io/UbaPlayer
 * Copyright (c)  2014  Brian Hadaway; Licensed MIT */(function($, window, document, undefined) {
    var UbaPlayer = function(elem, options) {
        this.$elem = $(elem);
        this.$elem.data('instance', this);
        this.init(options);
    };

    UbaPlayer.prototype = {
        defaults: {
            audioButtonClass: 'ubaplayer-button',
            autoPlay: null,
            codecs: [{
                name: 'OGG',
                codec: 'audio/ogg; codecs="vorbis"'
            }, {
                name: 'MP3',
                codec: 'audio/mpeg'
            }],
            continuous: false,
            controlsClass: 'ubaplayer-controls',
            extension: null,
            fallbackExtension: '.mp3',
            fallbackFunctions: {
                error: null,
                pause: null,
                play: null,
                resume: null
            },
            flashAudioPlayerPath: 'swf/player.swf',
            flashExtension: '.mp3',
            flashObjectID: 'ubaplayer-flash',
            loadingClass: 'ubaplayer-loading',
            loop: false,
            playerContainer: 'ubaplayer-container',
            playingClass: 'ubaplayer-playing',
            swfobjectPath: 'js/swfobject.js',
            volume: 0.5,
        },

        isPlaying: false,
        isFlash: false,
        isFallback: false,

        init: function(options) {
            var scope = this,
                i = 0,
                ilen;
            //set defaults
            this.options = $.extend(true, {}, this.defaults, (options || {}));
            this.loadProxy = $.proxy(this.onLoaded, this);
            this.errorProxy = $.proxy(this.onError, this);
            this.endProxy = $.proxy(this.onEnded, this);
            this.$buttons = $("." + this.options.audioButtonClass);

            ilen = this.options.codecs.length;

            //listen for clicks on the controls
            $("." + this.options.controlsClass).on("click", function(event) {
                scope.updateTrackState(event);
                return false;
            });

            for (; i < ilen; i++) {
                var type = this.options.codecs[i];
                if (this.canPlay(type)) {
                    this.options.extension = [".", type.name.toLowerCase()].join("");
                    break;
                }
            }

            if (!this.options.extension || this.isFlash) {
                this.isFlash = true;
                this.options.extension = this.options.flashExtension;
            }

            if (this.isFlash) {
                this.$elem.html("<div id='" + this.options.playerContainer + "'/>");
                $.getScript(this.options.swfobjectPath, $.proxy(function() {
                    swfobject.embedSWF(this.options.flashAudioPlayerPath, this.options.playerContainer, "0", "0", "9.0.0", "swf/expressInstall.swf", false, false, {
                        id: this.options.flashObjectID
                    }, $.proxy(this.swfLoaded, this));
                }, this));
            } else {
                if (this.options.autoPlay) {
                    this.play(this.options.autoPlay);
                }
            }
        },

        pause: function() {
            if (this.isFallback) {
                if (typeof this.options.fallbackFunctions.pause == "function") {
                    this.options.fallbackFunctions.pause();
                }
            } else if (this.isFlash) {
                this.audio.pauseFlash();
            } else {
                this.audio.pause();
            }

            this.$tgt.removeClass(this.options.playingClass);
            this.isPlaying = false;
        },

        play: function(element) {
            this.$tgt = typeof element === 'undefined' ? $('.' + this.options.audioButtonClass).eq(0) : element;
            this.currentTrack = this.getFileNameWithoutExtension(this.$tgt.attr("href"));
            this.isPlaying = true;
            this.$tgt.addClass(this.options.loadingClass);
            this.$buttons.removeClass(this.options.playingClass);

            if (this.isFallback) {
                if (typeof this.options.fallbackFunctions.play == "function") {
                    this.options.fallbackFunctions.play(this.currentTrack + this.options.fallbackExtension);
                }
            } else if (this.isFlash) {
                if (this.audio) {
                    this.removeListeners(window);
                }
                this.audio = document.getElementById(this.options.flashObjectID);
                this.addListeners(window);
                this.audio.playFlash(this.currentTrack + this.options.extension);
            } else {
                if (this.audio) {
                    this.audio.pause();
                    this.removeListeners(this.audio);
                }
                this.audio = new Audio("");
                this.addListeners(this.audio);
                this.audio.id = "audio";
                this.audio.loop = this.options.loop ? "loop" : "";
                this.audio.volume = this.options.volume;
                this.audio.src = this.currentTrack + this.options.extension;
                this.audio.play();
            }
        },

        playing: function() {
            return this.isPlaying;
        },

        resume: function() {
            if (this.isFallback) {
                if (typeof this.options.fallbackFunctions.resume == "function") {
                    this.options.fallbackFunctions.resume();
                }
            } else if (this.isFlash) {
                this.audio.playFlash();
            } else {
                this.audio.play();
            }
            this.$tgt.addClass(this.options.playingClass);
            this.isPlaying = true;
        },

        updateTrackState: function(evt) {
            this.$tgt = $(evt.target);
            if (!this.$tgt.hasClass(this.options.audioButtonClass)) {
                return;
            }
            if (!this.audio || (this.audio && this.currentTrack !== this.getFileNameWithoutExtension(this.$tgt.attr("href")))) {
                this.play(this.$tgt);
            } else if (!this.isPlaying) {
                this.resume();
            } else {
                this.pause();
            }
        },

        addListeners: function(elem) {
            var el = $(elem);
            el.on('canplay', this.loadProxy);
            el.on('error', this.errorProxy);
            el.on('ended', this.endProxy);
        },

        removeListeners: function(elem) {
            var el = $(elem);
            el.off('canplay', this.loadProxy);
            el.off('error', this.errorProxy);
            el.off('ended', this.endProxy);
        },

        onLoaded: function() {
            this.$buttons.removeClass(this.options.loadingClass);
            this.$tgt.addClass(this.options.playingClass);

            this.audio.play();
        },

        onError: function() {
            this.$buttons.removeClass(this.options.loadingClass);
            if (this.isFlash) {
                this.removeListeners(window);
            } else {
                this.removeListeners(this.audio);
            }
        },

        onEnded: function() {
            this.isPlaying = false;
            this.$tgt.removeClass(this.options.playingClass);
            this.currentTrack = "";
            if (this.isFlash) {
                this.removeListeners(window);
            } else {
                this.removeListeners(this.audio);
            }

            if (this.options.continuous) {
                var $next = this.$tgt.next().length ? this.$tgt.next() : $(this.options.audioButtonClass).eq(0);
                this.play($next);
            }

        },

        canPlay: function(type) {
            if (!document.createElement("audio").canPlayType) {
                return false;
            } else {
                return document.createElement("audio").canPlayType(type.codec).match(/maybe|probably/i) ? true : false;
            }
        },

        swfLoaded: function(e) {
            if (!e.success) {
                this.isFlash = false;
                this.isFallback = true;

                if (typeof this.options.fallbackFunctions.error == "function") {
                    this.options.fallbackFunctions.error();
                }
            }

            if (this.options.autoPlay) {
                setTimeout(function() {
                    this.play(this.options.autoPlay);
                }, 500);
            }
        },

        getFileNameWithoutExtension: function(fileName) {
            //this function take a full file name and returns an extensionless file name
            //ex. entering foo.mp3 returns foo
            //ex. entering foo returns foo (no change)
            var fileNamePieces = fileName.split('.');
            fileNamePieces.pop();
            return fileNamePieces.join(".");
        }
    };

    $.fn.ubaPlayer = function(options, args) {
        if (typeof options === 'string') {
            return this.each(function() {
                $(this).data('instance')[options](args);
            });
        } else {
            return this.each(function() {
                new UbaPlayer(this, options);
            });
        }
    };

})(jQuery, window, document);