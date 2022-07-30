betty2App.controller('ParentCtrl', ['BtLoading', '$rootScope', 'BtNavigate', 'BettyLeagueApi', 'ShowdownApi', 'BtMessages', '$state', 'UserApi',
    function (BtLoading, $rootScope, BtNavigate, BettyLeagueApi, ShowdownApi, BtMessages, $state, UserApi) {
    var parentCtrl = this;

    $rootScope.fbCredentials = {};

    $rootScope.viewAnimClass = 'goTop';
    $rootScope.animLevel = 0;

    $rootScope.showMessages = false;
    $rootScope.messages = [];
    $rootScope.showFormMessages = false;
    $rootScope.activeinputs = "";

    $rootScope.currentPart = '';
    $rootScope.$state = $state;
    $rootScope.isCurrent = function(index){
        return parentCtrl.activeHeaderBtns[index];
    }

    $rootScope.isMobileApp = ionic.Platform.isWebView();

    parentCtrl.activeHeaderBtns = [
        false,
        false,
        false,
        false,
        false
    ];

    parentCtrl.goPrivateLeagues = function () {
        BtLoading.startLoad();
        BtNavigate.stateChange('goBottom' ,'privateleagues', {
            'animDirection' : 'fade'
        }, true);
    };

    parentCtrl.goAccount = function () {
        BtNavigate.stateChange('goBottom' ,'account', {
            'animDirection' : 'fade'
        });
    };

    parentCtrl.goHome = function () {
        BtNavigate.stateChange('goBottom' ,'home', {
            'animDirection' : 'fade'
        });
    };

    parentCtrl.goBettyWorld = function () {
        BtLoading.startLoad();


        BettyLeagueApi.getBettyWorld(function (bettyWorld) {
            //find worldbettyLeague
            //go to world bettyleague

            if (BettyLeagueApi.isBettyLeagueFinished(bettyWorld)) {
              BtNavigate.stateChange('goTop' ,'bettyleague.podium', {
                'bettyLeagueId' : bettyWorld.id,
                'animDirection' : 'fade'
              }, true);
            } else {
              //go to the next unbet showdown
              ShowdownApi.getNextOpenShowDown(bettyWorld.id, function (showdown) {
                BtNavigate.stateChange('goTop' ,'bettyleague.showdown.step0', {
                  'bettyLeagueId' : bettyWorld.id,
                  'showdownId' : showdown.id,
                  'animDirection' : 'fade'
                }, true);
              }, function (messages) {
                BtMessages.show(messages, null, function () {
                  BtLoading.endLoad();
                })
              });
            }


        }, function (messages) {
            BtMessages.show(messages, null, function () {
                BtLoading.endLoad();
            })
        });
    };
    parentCtrl.footerStatus = {
        leftBt : {
            btShow : false,
        },
        middleBt : {
            btShow : false,
        },
        rightBt : {
            btShow : false,
        }
    };

    parentCtrl.showDetailCotesModal = false;
    parentCtrl.detailCotesModalData = {};
    parentCtrl.detailCotesModalOnClose = function () {
        parentCtrl.detailCotesModalData = {};
        parentCtrl.showDetailCotesModal = false;
    }

    parentCtrl.logout = function () {
        UserApi.logout();
    }
}]);
