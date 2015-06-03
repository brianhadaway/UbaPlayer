# UbaPlayer 2.0.4

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
<!-- in the head tag -->
<link rel="stylesheet" href="css/styles.css" />

<!-- somewhere in the body tag -->
<div id="ubaplayer"></div>
<ul class="ubaplayer-controls">
    <li><a class="ubaplayer-button" href="media/foo.mp3">Foo</a></li>
</ul>

<!-- near closing body tag -->
<script src="js/jquery.min.js"></script>
<script src="js/jquery.ubaplayer.min.js"></script>
<script>
    $(function(){
        $("#ubaplayer").ubaPlayer();
    });
</script>
```

## Documentation

###Configuration Options & Their Defaults

```javascript
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
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.

_Also, please don't edit JS files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## Release History
[Release History](https://github.com/brianhadaway/UbaPlayer/releases)

## License
Copyright (c) 2014 Brian Hadaway
Licensed under the MIT license.
