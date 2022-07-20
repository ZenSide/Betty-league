/**
 * Created by simon on 24/03/18.
 */
betty2App.component('btModalOdds',{
  templateUrl:'js/components/btModalOdds/btModalOdds.html?v=%CACHE_BUSTING_VERSION%',
  bindings:{
    btData:"<",
    btShow:"<",
    btOnClose:"&"
  },
  controller:['$scope', 'BtLoading', 'BetApi', function($scope, BtLoading, BetApi){
    var ctrl = this;

    console.log(ctrl.btData);

    ctrl.title = 'SHOWDOWN.MODAL_ODD_DETAIL.TITLE';

    ctrl.close = function () {
      ctrl.btShow = false;
      ctrl.btOnClose();
    };

    this.$onChanges = function() {
      if (!ctrl.btData.betResume || ctrl.btData.betResume.potentiel) {
        ctrl.realWinner = null;
      } else {
        ctrl.realWinner = BetApi.getSmFixtureWinner(
            ctrl.btData.showdown.smFixture,
            ctrl.btData.showdown.smFixture.sm__scores__localteamScore,
            ctrl.btData.showdown.smFixture.sm__scores__visitorteamScore
        );
      }

      ctrl.homeWinBets = [];
      ctrl.awayWinBets = [];
      ctrl.drawBets = [];
      angular.forEach(ctrl.btData.scoreOdds, function (scoreOdd) {
        var winner = BetApi.getSmFixtureWinner(ctrl.btData.showdown.smFixture, scoreOdd.homeScore, scoreOdd.awayScore);
        console.log(winner);
        angular.forEach(scoreOdd.bets, function (bet) {
          switch (bet.winner) {
            case 'home':
              ctrl.homeWinBets.push(bet);
              break;
            case 'away':
              ctrl.awayWinBets.push(bet);
              break;
            case 'draw':
              ctrl.drawBets.push(bet);
              break;
          }
        })
      });
      console.log(ctrl.awayWinBets);
    };

  }]
});
