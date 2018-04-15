/**
 * Created by simon on 24/03/18.
 */
betty2App.component('btCountDown',{
  templateUrl:'app/components/btCountDown/btCountDown.html',
  bindings:{
    btStartDate:"<",
    btEndAction:"&"
  },
  controller:function($scope){
    var ctrl = this;
    var btStartDate = new Date(ctrl.btStartDate);
    var now = new Date().getTime();
    var countDownDate = btStartDate.getTime();
    var distance = countDownDate - now;
    ctrl.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    ctrl.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    ctrl.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    ctrl.seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var x = setInterval(function() {
      var now = new Date().getTime();
      // Get todays date and time

      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      ctrl.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      ctrl.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      ctrl.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      ctrl.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      $scope.$apply();
      // If the count down is finished
      if (distance < 0) {
        ctrl.btEndAction();
      }
    }, 1000);
    $scope.$on('$destroy', function () {
      clearInterval(x);
    })
  }
});