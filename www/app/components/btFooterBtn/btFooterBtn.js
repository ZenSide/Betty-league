/**
 * Created by simon on 24/03/18.
 */
betty2App.component('btFooterBtn',{
  templateUrl:'app/components/btFooterBtn/btFooterBtn.html',
  bindings:{
    btShow:"=",
    ico: '<',
    btPosition: '<',
    btSize: '=',
    btLabel: '=',
    btColor: '<',
    btActive: '<',
    btAction: '&',
    btDisabled: '<',
    btSubmitForm: '='
  },
  controller:function($timeout){
    var zeCtrl = this;
    this.btActiveClasse = "";
    this.btDisabledClasse = "";
    this.btColorClasse = this.btColor;
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
      if (changes.btColor){
        zeCtrl.btColorClasse = changes.btColor.currentValue;
      }
    };
  }
});