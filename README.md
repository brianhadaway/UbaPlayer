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
    <li class="audioButton" href="libs/media/FiftyYears">Fifty Years</li>
    <li class="audioButton" href="libs/media/AwMan">Aw Man</li>
    <li class="audioButton" href="libs/media/ItsAThang">It's a Thang...</li>
    <li class="audioButton" href="libs/media/ItsCool">It's Cool</li>
    <li class="audioButton" href="libs/media/ItWasAGoodThang">It Was a Good Thang</li>
    <li class="audioButton" href="libs/media/Laugh">Laugh</li>
    <li class="audioButton" href="libs/media/MmmHmm">Mmm Hmm</li>
    <li class="audioButton" href="libs/media/MmmHmmLow">Mmm Hmm (Low)</li>
    <li class="audioButton" href="libs/media/Naw">Naw</li>
    <li class="audioButton" href="libs/media/ThatsGood">That's Good</li>
    <li class="audioButton" href="libs/media/Tomorrow">Tomorrow</li>
    <li class="audioButton" href="libs/media/Well">Well</li>
    <li class="audioButton" href="libs/media/What">What?!?</li> 
</ul>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Brian Hadaway  
Licensed under the MIT, GPL licenses.
