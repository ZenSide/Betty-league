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
    btAction: '&',
    btType: '@'
  },
  controller:function($timeout){
    var zeCtrl = this;
    if (!zeCtrl.btType) {
      zeCtrl.btType = 'button';
    }
    this.icoResult = this.btIco;
    this.btActionTimed = function() {
      if (zeCtrl.btAction()) {
        zeCtrl.btDisabled = true;
        $timeout(function(){
          zeCtrl.btAction();
        }, 300);
        $timeout(function(){
          zeCtrl.btDisabled = false;
        }, 350);
        return
      }
    };
    this.$onChanges = function(changes) {
      if (changes.btIco){
        var oldValue = changes.btIco.previousValue;
        var newValue = changes.btIco.currentValue;
        $timeout(function(){
          zeCtrl.icoResult = oldValue+" bt-ico-hide";
        },75);
        $timeout(function(){
          zeCtrl.icoResult = newValue;
        },75);
        return
      }
    };
  }
});