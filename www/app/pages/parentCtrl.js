betty2App.controller('ParentCtrl', function (BtLoading, $scope, $rootScope, BtNavigate, BettyLeagueApi, ShowdownApi, BtMessages, $state) {
    var parentCtrl = this;

    $rootScope.fbCredentials = {};

    $rootScope.viewAnimClass = 'goTop';
    $rootScope.showMessages = false;
    $rootScope.messages = [];
    $rootScope.showFormMessages = false;
    $rootScope.activeinputs = "";

    $rootScope.currentPart = '';
    $rootScope.$state = $state;
    $rootScope.isCurrent = function(partName){
        return $state.current.name.indexOf(partName)!==-1;
    }

    parentCtrl.activeHeaderBtns = [
        false,
        false,
        false,
        false
    ];

    parentCtrl.goPrivateLeagues = function () {
        BtNavigate.stateChange('goTop' ,'privateleagues', {
            'animDirection' : 'fade'
        });
    };

    parentCtrl.goBettyWorld = function () {
        BtLoading.startLoad();
        BettyLeagueApi.getBettyWorld(function (bettyWorld) {
            //find worldbettyLeague
            //go to world bettyleague
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

        }, function (messages) {
            BtMessages.show(messages, null, function () {
                BtLoading.endLoad();
            })
        });
    };

    parentCtrl.withHeadLogo = false;
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
});