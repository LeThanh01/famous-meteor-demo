define('view01/SlideView', ['famous/core/View', 'famous/core/Surface', 'famous/core/Transform', 'famous/modifiers/StateModifier'], function(require, exports, module){
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function SlideView(){
    	View.apply(this, arguments);

    	this.rootModifier = new StateModifier({
    		size: [450, 500]
    	});

    	this.mainNode = this.add(this.rootModifier);

    	var background = new Surface({
    		properties: {
    			backgroundColor: 'red',
    			boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
    		}
    	});

        this.mainNode.add(background);
    }

    SlideView.prototype = Object.create(View.prototype);
    SlideView.prototype.constructor = SlideView;

    SlideView.DEFAULT_OPTIONS = {};

    module.exports = SlideView;

});