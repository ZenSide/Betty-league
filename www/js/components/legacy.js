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
