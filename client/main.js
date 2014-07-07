Meteor.startup(function(){
    define(['famous/core/Engine', 'view01/AppView'], function(require, exports, module) {
        var Engine = require('famous/core/Engine');
                
        var AppView = require('view01/AppView');

        var mainContext = Engine.createContext();
      
        var appView = new AppView();
        
        mainContext.add(appView);
    });
})