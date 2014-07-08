famous-meteor-demo
==================
#ReactiveTemplate (Use for Famous)
Basic:
*1) Tao template
Trong file html, tao 1 template:
      <template name= "name-template">
      	//noi dung template
      </template>
*2) Use template
Trong file main.js:
Dau tien, gui yeu cau de lay doi tuong ReactiveTemplate bang function require():
      var ReactiveTemplate    = require('famodev/ReactiveTemplate');

Tiep theo, add template vao doi tuong ReactiveTemplate thay the cho content:
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
      
Co the truyen du lieu vao template bang Session.

Example:
Tao file example.html:
    <template name= "example">
    	Firstname: {{ firstname }}
    	<br/>
    	Lastname: {{ lastname }}
    </template>
    
trong file main.js add tempplate example:
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
    });
    
Tao file axample.js:
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


   
