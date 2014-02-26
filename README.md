jQuery Range Slider Step Labels
======================
Show labels for the steps in an input range slider. Compatible with rangeslider.js polyfill https://github.com/andreruffert/rangeslider.js

## Usage ##

#### HTML ####
```html
<link rel="stylesheet" type="text/css" href="css/rangesteplabels.css" />
<script type="text/javascript" src="js/jquery.rangesteplabels.js"></script>

<input type="range" name="rangeslider" min="0" max="5" step="1" value="0" />
```

#### JavaScript ####
```js
$('input[type="range"]').rangesteplabels();
```

#### Options ####
```js
$('input[type="range"]').rangesteplabels({
	sidepadding: 12, // Offset from the side to align first & last number
	position: 'top' // 'top' or 'bottom'
});
```