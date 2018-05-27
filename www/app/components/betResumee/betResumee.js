/**
 * Created by simon on 24/03/18.
 */
betty2App.component('betResumee',{
  templateUrl:'app/components/betResumee/betResumee.html',
  bindings:{
    modifierClasses: '@',
    showdown: '<',
    bet: '<',
    type: '@',
    modifierCoin: '@'
  },
  controller:function(BetApi, ShowdownApi){
    var ctrl = this;
    ctrl.betResume = function (showdown, bet) {
      showdown = showdown ? showdown : ctrl.showdown;
      bet = bet ? bet : ctrl.bet;

      var resume = BetApi.getMyBetResume(showdown, bet, ShowdownApi.getShowdownStatus(showdown));
      console.log(resume);
      return resume;
    };
  }
});