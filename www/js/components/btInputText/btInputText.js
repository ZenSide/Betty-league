/**
 * Created by simon on 24/03/18.
 */
betty2App.component('btInputText',{
  transclude: true,
  templateUrl:'js/components/btInputText/btInputText.html',
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
});