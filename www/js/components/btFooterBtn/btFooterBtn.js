/**
 * Created by simon on 24/03/18.
 */
betty2App.component('btFooterBtn',{
  templateUrl:'js/components/btFooterBtn/btFooterBtn.html',
  bindings:{
    btShow:"<",
    btPosition: '@',
    btClasses: '<',
    btButtonClasses: '<',
    btIco: '<',
    btLabel: '<',
    btDisabled: '<',
    btSubmitForm: '<',
    btAction: '&'
  },
  controller:['$timeout', function($timeout){
    var zeCtrl = this;
    this.icoResult = this.btIco;
    this.btActionTimed = function() {
        //zeCtrl.btDisabled = true;
        zeCtrl.btAction();

      //$timeout(function(){
      //    zeCtrl.btAction();
      //  }, 300);
      //  $timeout(function(){
      //    zeCtrl.btDisabled = false;
      //  }, 500);
        return
    };
    this.$onChanges = function(changes) {
      if (changes.btIco){
        var oldValue = changes.btIco.previousValue;
        var newValue = changes.btIco.currentValue
        zeCtrl.icoResult = oldValue+" bt-ico-hide";
        $timeout(function(){
          zeCtrl.icoResult = newValue;
        },200);
        return
      }
    };
  }]
});