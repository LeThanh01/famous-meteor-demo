famous-meteor-demo
==================
#ReactiveTemplate (Use for Famous)
Basic:<br/>
*1) Tao template<br/>
Trong file html, tao 1 template:<br/>

      <template name= "name-template">
      	//noi dung template
      </template>
      
*2) Use template<br/>
Trong file main.js:<br/>
Dau tien, gui yeu cau de lay doi tuong ReactiveTemplate bang function require():<br/>

      var ReactiveTemplate    = require('famodev/ReactiveTemplate');

Tiep theo, add template vao doi tuong ReactiveTemplate thay the cho content:<br/>

      var reactiveTemplate    = new ReactiveTemplate({
          size: [witdh,height],
          template: Template.nameTemplate,
          properties: {},
          data: function(){
              return {
                  //du lieu truyen vao template
              }
          }
      });
      
Co the truyen du lieu vao template bang Session.<br/>

Example:<br/>

Tao file example.html:<br/>

		<template name='example'>
				Firstname: {{ firstname }}
				<br/>
				Lastname: {{ lastname }}
		</template>
		
<br/>    
trong file main.js add template example:<br/>

    define(function(require, exports, module){
        var Engine              = require('famous/core/Engine');
        var Surface             = require('famous/core/Surface');
        var ReactiveTemplate    = require('famodev/ReactiveTemplate');


        var mainContext = Engine.createContext();
        
        var reactiveTemplate = new ReactiveTemplate({
            size: [200, 200],
            template: Template.example,
            properties: {
                color: 'white',
                textAlign: 'center',
                lineHeight: '200px',
                backgroundColor: 'red',
            },
            data: function(){
                return {
                    firstname: 'Le',
                    lastname: 'Thanh'
                }
            }
        });
        
        mainContext.add(reactiveTemplate);
    });
    
Tao file axample.js:<br/>

    Template.demoOne.helpers({
    	firstname: function(){
            return Session.get('firstname');
    	},
    	lastname: function(){
    		return Session.get('lastname');
    	}
    });
    Session.set('firstname', 'Nguyen');
    Session.set('lastname', 'Bang');


#ReactiveSurface (Use for Famous)
