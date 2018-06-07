/**
 * Created by simon on 24/03/18.
 */
betty2App.component('btLogoTeam',{
  templateUrl:'js/components/btLogoTeam/btLogoTeam.html',
  bindings:{
    btTeam: '<',
    btSize: '@'
  },
  controller:function(){
    var ctrl = this;
    if (!ctrl.btSize) {
      ctrl.btSize = 40;
    }

    ctrl.imgUrl = null;
    if (ctrl.btTeam.sm__nationalTeam) {
      ctrl.imgUrl = "./img/flags/" + ctrl.btTeam.sm__id + ".png"
    }

  }
});