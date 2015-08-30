'use strict';

var App = (function () {
    var displayData = function () {

        Elements.addButton.on('click', function () {
            $('#errors').removeClass();
            $('#errors').empty();
            if(Elements.table != ''){
            }
            var companyName = Elements.input.val();
            if (companyName == null || companyName == "") {
                Functions.warningEmpty();
                return false;
            }

            Functions.getData(companyName, function (data) {
                // console.log(data);
                Functions.addTable();
            });
        });

    }//end of displayData

    return {
        displayData: displayData
    }

})();

