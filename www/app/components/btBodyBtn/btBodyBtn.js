/**
 * Created by simon on 24/03/18.
 */
betty2App.component('btBodyBtn',{
  templateUrl:'app/components/btBodyBtn/btBodyBtn.html',
  bindings:{
    ico: '<',
    btContent: '=',
    btContext: '=',
    btActive: '<',
    btAction: '&',
    btDisabled: '<',
    btSubmitForm: '<'
  },
  controller:function($timeout){
    var zeCtrl = this;
    this.btActiveClasse = "";
    this.btDisabledClasse = "";
    this.icoResult = this.ico;
    if (this.btActive) this.btActiveClasse = "active" ;
    if (this.btDisabled) this.btDisabledClasse = "disabled" ;
    this.$onChanges = function(changes) {
      if (changes.btActive) changes.btActive.currentValue ? this.btActiveClasse = "active" : this.btActiveClasse = "";
      if (changes.btDisabled) changes.btDisabled.currentValue ? this.btDisabledClasse = "disabled" : this.btDisabledClasse = "";
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
});