'use strict';

//FLAG BUTTON
betty2App.component('btFlagBtn',{
    templateUrl:'views/components/btn-flag.html',
    bindings:{
        ico: '=',
        btRight: '<',
        btSref:'=',
        btShow:"="
    },
    controller:function(){
    }
});

//PART TITLE
betty2App.component('btTitlePart',{
    templateUrl:'views/components/part-title.html',
    bindings:{
        content: '<'
    },
    controller:function(){

    }
});

//Text Input


//footerbuttons


//DIRECTIVES
betty2App.directive('btFocus', function($ionicScrollDelegate) {
    return {
        restrict: 'A',
        link: function($scope,elem,attrs) {
            elem.bind('keydown', function(e) {
                var code = e.keyCode || e.which;
                if (code === 13) {
                    var previousOrder = attrs.btSelectOrder;
                    var nextOrder = parseInt(previousOrder, 10) + 1;
                    var nextEt = document.getElementById("inputOrder"+nextOrder);
                    if(nextEt){
                        e.preventDefault();
                        nextEt.focus();
                    }
                }
            });
        }
    }
});
