/**
 * Created by simon on 24/03/18.
 */
betty2App.component('btBodyBtn',{
  templateUrl:'app/components/btBodyBtn/btBodyBtn.html',
  bindings:{
    btIco: '<',
    btBtnClasses: '<',
    btDisabled: '<',
    btSubmitForm: '<',
    btContent: '<',
    btAction: '&'
  },
  controller:function($timeout){
    var zeCtrl = this;
    this.icoResult = this.btIco;
    this.$onChanges = function(changes) {
      if (changes.btIco){
        var oldValue = changes.btIco.previousValue;
        var newValue = changes.btIco.currentValue
        zeCtrl.icoResult = oldValue+" bt-ico-hide";
        $timeout(function(){
          zeCtrl.icoResult = newValue;
        },200)
      }
    };
  }
});