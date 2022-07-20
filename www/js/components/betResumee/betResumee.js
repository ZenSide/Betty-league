/**
 * Created by simon on 24/03/18.
 */
betty2App.component('betResumee',{
  templateUrl:'js/components/betResumee/betResumee.html?v=%CACHE_BUSTING_VERSION%',
  bindings:{
    modifierClasses: '@',
    showdown: '<',
    bet: '<',
    type: '@',
    modifierCoin: '@'
  },
  controller:['BetApi', 'ShowdownApi', function(BetApi, ShowdownApi){
    var ctrl = this;

    var getbetResume = function (showdown, bet) {
      showdown = showdown ? showdown : ctrl.showdown;
      bet = bet ? bet : ctrl.bet;

      var resume = BetApi.getMyBetResume(showdown, bet, ShowdownApi.getShowdownStatus(showdown));

      return resume;
    };

    ctrl.betResume = getbetResume();

    this.$onChanges = function(changes) {
      if (changes.showdown || changes.bet){
        ctrl.betResume = getbetResume();
      }
    };
  }]
});
