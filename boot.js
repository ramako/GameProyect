
var PlataformasScroller = PlataformasScroller || {};
PlataformasScroller.Boot = function(){};
PlataformasScroller.Boot.prototype = {
    preload: function () {
    this.load.image('preloadbar', 'assets/images/preloader-bar.png'); 
    this.state.start('Preload');
    }
    
};