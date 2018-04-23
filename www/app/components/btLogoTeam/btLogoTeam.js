/**
 * Created by simon on 24/03/18.
 */
betty2App.component('btLogoTeam',{
  templateUrl:'app/components/btLogoTeam/btLogoTeam.html',
  bindings:{
    btTeam: '<',
    btSize: '@'
  },
  controller:function(){
    var ctrl = this;
    if (!ctrl.btSize) {
      ctrl.btSize = 40;
    }
  }
});