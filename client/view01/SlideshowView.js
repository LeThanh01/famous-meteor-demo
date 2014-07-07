define('view01/SlideshowView', ['famous/core/View', 'famous/core/Surface', 'famous/core/Transform', 'famous/modifiers/StateModifier', 'view01/SlideView'], function(require, exports, module){
    var View        = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var SlideView     = require('view01/SlideView');

    function SlideshowView(){
    	View.apply(this, arguments);

    	var slideView = new SlideView();

    	this.add(slideView);
    }

    SlideshowView.prototype = Object.create(View.prototype);
    SlideshowView.prototype.constructor = SlideshowView;

    SlideshowView.DEFAULT_OPTIONS = {};

    module.exports = SlideshowView;
});