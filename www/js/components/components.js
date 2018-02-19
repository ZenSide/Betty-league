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
})

//PART TITLE
.component('btTitlePart',{
    templateUrl:'views/components/part-title.html',
    bindings:{
        content: '<'
    },
    controller:function(){

    }
})

//Text Input
.component('btInputText',{
    transclude: true,
    templateUrl:'views/components/input-text.html',
    bindings:{
        btPlaceholder: '<',
        btNgModel: '=',
        btName: '@',
        btType: '@',
        btSelectOrder: '@',
        btRequired: '<'
    },
    controller:function(){
    }
})

//footerbuttons
.component('btFooterBtn',{
    templateUrl:'views/components/footer-button.html',
    bindings:{
        btShow:"=",
        ico: '<',
        btPosition: '<',
        btSize: '=',
        btLabel: '=',
        btContext: '=',
        btActive: '<',
        btAction: '&',
        btDisabled: '<',
        btSubmitForm: '='
    },
    controller:function($timeout){
        var zeCtrl = this;
        this.btActiveClasse = "";
        this.btDisabledClasse = "";
        this.icoResult = this.ico;
        if (this.btActive) this.btActiveClasse = "bt-active" ;
        if (this.btDisabled) this.btDisabledClasse = "bt-disabled" ;
        this.$onChanges = function(changes) {
            if (changes.btActive) changes.btActive.currentValue ? this.btActiveClasse = "bt-active" : this.btActiveClasse = "";
            if (changes.btDisabled) changes.btDisabled.currentValue ? this.btDisabledClasse = "bt-disabled" : this.btDisabledClasse = "";
            if (changes.ico){
                var oldValue = changes.ico.previousValue;
                var newValue = changes.ico.currentValue
                zeCtrl.icoResult = oldValue+" bt-ico-hide";
                $timeout(function(){
                    zeCtrl.icoResult = newValue;
                },300)
            }
        };
    }
})

//DIRECTIVES
.directive('btFocus', function($ionicScrollDelegate) {
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
