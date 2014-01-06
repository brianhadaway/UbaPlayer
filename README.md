# UbaPlayer

The jQuery HTML5 Audio Player with Flash Fallback.

UbaPlayer is a simple jQuery plugin that plays audio natively in modern browsers and uses Flash where native playback is impossible. It is tested to work in the following browsers:
 * Mac (Chrome 10+, Safari 4+, Firefox 3.5+, Opera)
 * PC (Chrome 10+, Safari 4+, Firefox3.5+, Opera, IE6+)
 * iOS 3+ (Safari Mobile)
 * Android 2.2+ (Chrome, Firefox 4, Opera 11)

## Getting Started
Download the [production version][zip].

[zip]: https://github.com/brianhadaway/UbaPlayer/zipball/master

In your web page:

```html
<script src="libs/jquery/jquery.js"></script>
<script src="dist/jquery.ubaplayer.min.js"></script>
<link rel="stylesheet" href="libs/css/styles.css" />
<script>
    $(function(){
		//basic config
		$("#ubaPlayer").ubaPlayer();
    });
</script>

<div id="ubaPlayer"></div>
<ul class="controls">
    <li><a class="audioButton" href="libs/media/FiftyYears.mp3">Fifty Years</a></li>
    <li><a class="audioButton" href="libs/media/AwMan.mp3">Aw Man</a></li>
    <li><a class="audioButton" href="libs/media/ItsAThang.mp3">It's a Thang...</a></li>
    <li><a class="audioButton" href="libs/media/ItsCool.mp3">It's Cool</a></li>
    <li><a class="audioButton" href="libs/media/ItWasAGoodThang.mp3">It Was a Good Thang</a></li>
    <li><a class="audioButton" href="libs/media/Laugh.mp3">Laugh</a></li>
    <li><a class="audioButton" href="libs/media/MmmHmm.mp3">Mmm Hmm</a></li>
    <li><a class="audioButton" href="libs/media/MmmHmmLow.mp3">Mmm Hmm (Low)</a></li>
    <li><a class="audioButton" href="libs/media/Naw.mp3">Naw</a></li>
    <li><a class="audioButton" href="libs/media/ThatsGood.mp3">That's Good</a></li>
    <li><a class="audioButton" href="libs/media/Tomorrow.mp3">Tomorrow</a></li>
    <li><a class="audioButton" href="libs/media/Well.mp3">Well</a></li>
    <li><a class="audioButton" href="libs/media/What.mp3">What?!?</a></li>
</ul>
```

## Documentation

###Configuration Options & Their Defaults

* audioButtonClass:         "audioButton",
* autoPlay:                 null,
* codecs:                   [{name:"OGG", codec: 'audio/ogg; codecs="vorbis"'}, {name:"MP3", codec: 'audio/mpeg'}],
* continuous:               false,
* extension:                null,
* flashAudioPlayerPath:     "libs/swf/player.swf",
* flashExtension:           ".mp3",
* flashObjectID:            "audioPlayer",
* loadingClass:             "loading",
* loop:                     false,
* playerContainer:          "player",
* playingClass:             "playing",
* swfobjectPath:            "libs/swfobject/swfobject.js",
* volume:                   0.5,
* fallbackFunctions:        { play: null, pause: null, resume: null, error: null },
* fallbackExtension:        ".mid",

###Linking to Audio Files

In previous versions of UbaPlayer you had to link to a non existant versions of the audio files. Now, you can link to an existing audio file and UbaPlayer will _automagically_ figure out which version your browser should play. This isn't required but we recommend doing so to keep your HTML semantic and to follow the principles of progressive enhancement.

```html
<ul class="controls">
    <li><a class="audioButton" href="libs/media/foo.mp3">Foo</a></li>
</ul>
```

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## Release History
[Release History](https://github.com/brianhadaway/UbaPlayer/releases)

## License
Copyright (c) 2014 Brian Hadaway
Licensed under the MIT licenses.
