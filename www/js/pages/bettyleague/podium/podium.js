betty2App.controller('PodiumCtrl', ['ranking', 'previousShowDownId', '$scope', '$stateParams', 'BtNavigate', 'BtLoading', 'animation', function (ranking, previousShowDownId, $scope, $stateParams, BtNavigate, BtLoading, animation) {
    var podiumCtrl = this;

  podiumCtrl.winnerName = ranking.ranking[0].pseudo;
  podiumCtrl.secondName = ranking.ranking[1].pseudo;
  podiumCtrl.thirdName = ranking.ranking[2].pseudo;

    BtLoading.endLoad();
    var footerStatus = {};
    footerStatus.leftBt = {
      btShow : !!previousShowDownId,
      btPosition: "left",
      btClasses: "bt-action--medium",
      btButtonClasses: "bt-action__btn--blue",
      btIco : "fas fa-backward",
      btLabel:'',
      btDisabled: false,
      btSubmitForm: null,
      action:function(){
        BtLoading.startLoad();
        BtNavigate.stateChange('goLeft' ,'bettyleague.showdown.step0', {
          'bettyLeagueId' : $stateParams.bettyLeagueId,
          'showdownId' : previousShowDownId,
          'animDirection' : '2right'
        });
      }
    };
    footerStatus.middleBt = {
    };
    footerStatus.rightBt = {
    };

    $scope.parentCtrl.footerStatus = footerStatus;
}]);
