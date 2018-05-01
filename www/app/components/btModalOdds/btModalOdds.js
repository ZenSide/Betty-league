/**
 * Created by simon on 24/03/18.
 */
betty2App.component('btModalOdds',{
  templateUrl:'app/components/btModalOdds/btModalOdds.html',
  bindings:{
    btData:"<",
    btShow:"<",
    btOnClose:"&"
  },
  controller:function($scope, BtLoading){
    var ctrl = this;

    ctrl.title = 'SHOWDOWN.MODAL_ODD_DETAIL.TITLE';

    ctrl.close = function () {
      ctrl.btShow = false;
      ctrl.btOnClose();
    };

    $scope.$on('$destroy', function () {
    })
  }
});