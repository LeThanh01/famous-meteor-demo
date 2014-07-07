define('view01/AppView',['famous/core/View', 'famous/core/Surface', 'famous/core/Transform', 'famous/modifiers/StateModifier', 'view01/SlideshowView'],function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var SlideshowView = require('view01/SlideshowView');

    function AppView() {
        View.apply(this, arguments);

        var slideshowView = new SlideshowView();

        this.add(slideshowView);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {};

    module.exports = AppView;
});
