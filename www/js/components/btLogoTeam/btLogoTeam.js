/**
 * Created by simon on 24/03/18.
 */
betty2App.component('btLogoTeam',{
  templateUrl:'js/components/btLogoTeam/btLogoTeam.html',
  bindings:{
    btTeam: '<',
    btSize: '@'
  },
  controller:['USE_REAL_LOGOS', function(USE_REAL_LOGOS){
    var ctrl = this;
    if (!ctrl.btSize) {
      ctrl.btSize = 40;
    }

    ctrl.imgUrl = null;

    if (USE_REAL_LOGOS && ctrl.btTeam.sm__logoPath) {
      ctrl.imgUrl = ctrl.btTeam.sm__logoPath;
    }

    if (!USE_REAL_LOGOS && ctrl.btTeam.sm__nationalTeam) {
      ctrl.imgUrl = "./img/flags/" + ctrl.btTeam.sm__id + ".png"
    }
  }]
});
