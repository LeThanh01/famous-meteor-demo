Meteor.startup(function(){
    define(function(require, exports, module){
        var Engine           = require("famous/core/Engine");
        var View             = require('famous/core/View');
        var Surface          = require('famous/core/Surface');
        var Transform        = require('famous/core/Transform');
        var StateModifier    = require('famous/modifiers/StateModifier');
        var ImageSurface     = require('famous/surfaces/ImageSurface');
        var ContainerSurface = require('famous/surfaces/ContainerSurface');

        //SlideShowView
        var Lightbox = require('famous/views/Lightbox');
        var Easing   = require('famous/transitions/Easing');



        //SlideView
        function SlideView() {
            View.apply(this, arguments);

            this.rootModifier = new StateModifier({
                size: this.options.size
            });

            this.mainNode = this.add(this.rootModifier);

            _createBackground.call(this);
            _createFilm.call(this);
            _createPhoto.call(this);
        }

        SlideView.prototype = Object.create(View.prototype);
        SlideView.prototype.constructor = SlideView;


        SlideView.DEFAULT_OPTIONS = {
            size: [450, 500],
            filmBorder: 15,
            photoBorder: 3,
            //photoUrl: "images/79420.jpg"
        };

        function _createBackground() {
            var background = new Surface({
                properties: {
                    backgroundColor: '#FFFFF5',
                    boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
                }
            });

            this.mainNode.add(background);

            background.on('click', function() {            
                this._eventOutput.emit('click');
            }.bind(this));
        }

        function _createFilm() {
            this.options.filmSize = this.options.size[0] - 2 * this.options.filmBorder;

            var film = new Surface({
                size: [this.options.filmSize, this.options.filmSize],
                properties: {
                    backgroundColor: '#222',
                    zIndex: 1,
                    pointerEvents: 'none'
                }
            });

            var filmModifier = new StateModifier({
                origin: [0.5, 1.15],
                align: [0.5, 0],
                transform: Transform.translate(0, this.options.filmBorder, 1)
            });



            this.mainNode.add(filmModifier).add(film);
        }

        function _createPhoto() {
            var photoSize = this.options.filmSize - 2 * this.options.photoBorder;

            var photo = new ImageSurface({
                size: [photoSize, photoSize],
                content: this.options.photoUrl,
                properties: {
                    zIndex: 2,
                    pointerEvents: 'none'
                }
            });

            this.photoModifier = new StateModifier({
                origin: [0.5, 2.19],
                align: [0.5, 0],
                transform: Transform.translate(0, this.options.filmBorder + this.options.photoBorder, 2)
            });

            this.mainNode.add(this.photoModifier).add(photo);
        }


        //SlideshowView
        function SlideshowView() {
            View.apply(this, arguments);

            this.rootModifier = new StateModifier({
                size: this.options.size,
                origin: [0.5, 0],
                align: [0.5, 0]
            });

            this.mainNode = this.add(this.rootModifier);

            _createLightbox.call(this);
            _createSlides.call(this);
        }

        SlideshowView.prototype = Object.create(View.prototype);
        SlideshowView.prototype.constructor = SlideshowView;
        SlideshowView.prototype.showCurrentSlide = function() {
            var slide = this.slides[this.currentIndex];
            this.lightbox.show(slide);
        };
        SlideshowView.prototype.showNextSlide = function() {
            this.currentIndex++;
            if (this.currentIndex === this.slides.length) this.currentIndex = 0;
            this.showCurrentSlide();
        };

        SlideshowView.DEFAULT_OPTIONS = {
            size: [450, 500],
            data: undefined,
            lightboxOpts: {
                inOpacity: 1,
                outOpacity: 0,
                inOrigin: [0, 0],
                outOrigin: [0, 0],
                showOrigin: [0, 0],
                // Transform.thenMove() first applies a transform then a
                // translation based on [x, y, z]
                inTransform: Transform.thenMove(Transform.rotateX(0.9), [0, -300, 0]),
                outTransform: Transform.thenMove(Transform.rotateZ(0.7), [100, window.innerHeight, 0]),
                inTransition: { duration: 650, curve: 'easeOut' },
                outTransition: { duration: 500, curve: Easing.inCubic }
            }
       
        };

        function _createLightbox() {
            this.lightbox = new Lightbox(this.options.lightboxOpts);
            this.mainNode.add(this.lightbox);
        }

        function _createSlides() {
            this.slides = [];
            this.currentIndex = 0;

            for (var i = 0; i < this.options.data.length; i++) {
                var slide = new SlideView({
                    size: this.options.size,
                    photoUrl: this.options.data[i]
                });

                this.slides.push(slide);

                slide.on('click', this.showNextSlide.bind(this));
            }

            this.showCurrentSlide();
        }

        //AppView
        function AppView() {
            View.apply(this, arguments);
            
           
            _createCamera.call(this);
            _createSlideshow.call(this);
        }

        function _createSlideshow() {
            var slideshowView = new SlideshowView({
                size: [this.options.slideWidth, this.options.slideHeight],
                data: this.options.data
            });

            var slideshowModifier = new StateModifier({
                origin: [0.5, 0],
                align: [0.5, 0],
                transform: Transform.translate(0, this.options.slidePosition, 0)
            });
            var slideshowContainer = new ContainerSurface({
                properties: {
                    overflow: 'visible'
                }
            });

            this.add(slideshowModifier).add(slideshowContainer);
            slideshowContainer.add(slideshowView);
        }

        AppView.prototype = Object.create(View.prototype);
        AppView.prototype.constructor = AppView;        
        
        AppView.DEFAULT_OPTIONS = {
            data: [
                "images/123456.jpg",
                "images/79420.jpg",
                "images/96713.jpg",
            ],
            cameraWidth: 0.6 * window.innerHeight
        };
        AppView.DEFAULT_OPTIONS.slideWidth = 0.8 * AppView.DEFAULT_OPTIONS.cameraWidth;
        AppView.DEFAULT_OPTIONS.slideHeight = AppView.DEFAULT_OPTIONS.slideWidth + 40;
        AppView.DEFAULT_OPTIONS.slidePosition = 0.77 * AppView.DEFAULT_OPTIONS.cameraWidth;


        function _createCamera() {
            var camera = new ImageSurface({
                size: [this.options.cameraWidth, true],
                //content: 'img/camera.png',
                properties: {
                    width: '100%'
                }
            });

            var cameraModifier = new StateModifier({
                origin: [0.5, 0],
                align: [0.5, 0],
                transform: Transform.behind
            });

            this.add(cameraModifier).add(camera);
        }
        
        var mainContext = Engine.createContext();

        var appView = new AppView();

        mainContext.add(appView); 
        mainContext.setPerspective(1000);                    
        
    });
})