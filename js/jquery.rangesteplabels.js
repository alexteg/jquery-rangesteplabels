/**
 * jQuery Range Slider Step Labels v0.1.0
 * https://github.com/alexteg/jquery-rangesteplabels
 *
 * License:	MIT license
 * Author:	Alexander Teglund
 */

;(function ( $, window, document, undefined ) {
	'use strict';

	// Create the objDefaultOptions once
	var strPluginName = "rangesteplabels",
		objDefaultOptions = {
			sidepadding	: 12,
			position	: 'top' // top or bottom
		};

	function Plugin(objElement, objOptions) {
		this.$element = $(objElement);

		this.objOptions = $.extend( {}, objDefaultOptions, objOptions) ;

		this._objDefaultOptions = objDefaultOptions;
		this._strPluginName = strPluginName;

		this.init();
	}

	Plugin.prototype.init = function() {
		this.floatMin	= parseFloat(this.$element.attr('min'));
		this.floatMax	= parseFloat(this.$element.attr('max'));
		this.floatStep	= parseFloat(this.$element.attr('step'));
		this.floatSteps	= (this.floatMax - this.floatMin) / this.floatStep;

		this.createStepLabels();

		var that = this;

		$(window).on('resize', function() {
			that.createStepLabels();
		});
	};

	Plugin.prototype.createStepLabels = function() {
		this.updateSliderWidth();

		if(typeof this.$stepslist != 'undefined') {
			this.$stepslist.remove();
		}

		// Assemble list of steps
		this.$stepslist = $('<ol>', {
			addClass: 'rangesteplabels'
		});
		for (var i = 0; i <= this.floatSteps; i++) {
			var $stepPlaceholder = $('<li style="left: '+((i * this.floatStepsSpacingPx + this.objOptions.sidepadding / 2) / (this.intRangeWidthPx + this.objOptions.sidepadding) * 100)+'%;">'+(i * this.floatStep)+'</li>');
			this.$stepslist.append($stepPlaceholder);
		};

		if(this.$element.parent().hasClass('rangeslider')) {
			var $sliderElement = this.$element.parent();
		} else {
			var $sliderElement = this.$element;
		}

		switch(this._objDefaultOptions.position) {
			case 'bottom':
				this.$stepslist.addClass('rangesteplabels-bottom');
				$sliderElement.after(this.$stepslist);
				break;
			default:
				this.$stepslist.addClass('rangesteplabels-top');
				$sliderElement.before(this.$stepslist);
				break;
		}

		this.centerLabels();
	};

	Plugin.prototype.updateSliderWidth = function() {
		var boolSliderVisible = this.$element.is(':visible');

		if(!boolSliderVisible) {
			this.showRangeSlider();
		}

		this.intRangeWidthPx		= this.$element.outerWidth() - this.objOptions.sidepadding;
		this.floatStepsSpacingPx	= this.intRangeWidthPx / this.floatSteps;

		if(!boolSliderVisible) {
			this.hideRangeSlider();
		}
	};

	Plugin.prototype.centerLabels = function() {
		// Center step labels
		this.$stepslist.children().each(function() {
			var intOuterWidth = $(this).outerWidth();
			$(this).css('margin-left', (intOuterWidth / 2 * -1)+'px');
		});
	};

	Plugin.prototype.showRangeSlider = function() {
		this.$element.show().css({
			visibility: 'visible',
			width: '100%'
		});
	};

	Plugin.prototype.hideRangeSlider = function() {
		this.$element.hide().css({
			visibility: 'hidden',
			width: '1px'
		});
	};

	$.fn[strPluginName] = function ( objOptions ) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + strPluginName)) {
				$.data(this, "plugin_" + strPluginName,	new Plugin( this, objOptions ));
			}
		});
	};

})( jQuery, window, document );
