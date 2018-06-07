/**
 * Created by simon on 24/03/18.
 */
betty2App.component('btTeamRadio',{
  templateUrl:'js/components/btTeamRadio/btTeamRadio.html',
  bindings:{
    btModel: "=",
    btHomeTeam: "<",
    btAwayTeam: "<"
  },
  controller:function(){
    var $ctrl = this;

    $ctrl.select = function (val) {
      $ctrl.btModel = val;
      return
    };
  }
});
