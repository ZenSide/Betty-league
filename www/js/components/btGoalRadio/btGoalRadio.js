/**
 * Created by simon on 24/03/18.
 */
betty2App.component('btGoalRadio',{
  templateUrl:'js/components/btGoalRadio/btGoalRadio.html',
  bindings:{
    btModel: "="
  },
  controller:function(){
    var $ctrl = this;

    $ctrl.buttons = [0, 1, 2, 3, "+"];

    $ctrl.select = function (val) {
      $ctrl.btModel = val;
      return
    };

    $ctrl.plus = function () {
      var buttonsTmp = [];
      angular.forEach($ctrl.buttons, function(value) {
        if (value == 0) {
          buttonsTmp.push("-");
        } else if (value == "-") {
          buttonsTmp.push("-");
        } else if (value == "+") {
          buttonsTmp.push("+");
        } else {
          buttonsTmp.push(value + 3);
        }
      });
      $ctrl.buttons = buttonsTmp;
      return
    };

    $ctrl.minus = function () {
      var buttonsTmp = [];
      var i=0;
      angular.forEach($ctrl.buttons, function(value) {
        if (value == 4) {
          buttonsTmp[i-1] = 0;
          buttonsTmp.push(value - 3);
        } else if (value == "-") {
          buttonsTmp.push("-");
        } else if (value == "+") {
          buttonsTmp.push("+");
        } else {
          buttonsTmp.push(value - 3);
        }
        i++;
      });
      $ctrl.buttons = buttonsTmp;
      return
    };

    this.$onChanges = function(changes) {
    };
  }
});