betty2App.controller('ParentCtrl', function ($scope, $rootScope, BtNavigate, BettyLeagueApi, ShowdownApi, BtMessages) {
    var parentCtrl = this;

    $rootScope.fbCredentials = {};

    $rootScope.viewAnimClass = 'goTop';
    $rootScope.showMessages = false;
    $rootScope.messages = [];
    $rootScope.showFormMessages = false;
    $rootScope.activeinputs = "";


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
        BettyLeagueApi.getBettyWorld(function (bettyWorld) {
            //find worldbettyLeague
            //go to world bettyleague
            //go to the next unbet showdown
            ShowdownApi.getNextOpenShowDown(bettyWorld.id, function (showdown) {
                BtNavigate.stateChange('goTop' ,'bettyleague.showdown.step0', {
                    'bettyLeagueId' : bettyWorld.id,
                    'showdownId' : showdown.id,
                    'animDirection' : 'fade'
                });
            }, function (messages) {
                BtMessages.show(messages, null, function () {
                    BtNavigate.stateChange(null, 'login');
                })
            }, true);

        }, function (messages) {
            BtMessages.show(messages, null, function () {
                BtNavigate.stateChange(null, 'login');
            })
        }, true);
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