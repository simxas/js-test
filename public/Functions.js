'use strict';

var Functions = (function () {

    var getData = function (companyName, cb) {
        $.getJSON('Api/v2/Lookup/json', {input: companyName})
            .done(function ( data ) {
                if (data == '') {
                    warningNoData();
                }
                //loop through json object
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        //checking for duplicates
                        if ($.inArray(data[key].Symbol, Elements.tempArray) > -1) {
                            // warningDuplicate();
                            continue
                        } else {
                            $.getJSON('Api/v2/Quote/json', {symbol: data[key].Symbol}, function (quote) {
                                Elements.companies.push(quote);
                                if(Elements.companies.length == Elements.tempArray.length) {
                                    cb(Elements.companies);
                                }
                            });//end of getJson for quota
                            Elements.tempArray.push(data[key].Symbol);
                        }
                    }//end of if
                }//end of for
            })
            .fail(function (jqxhr, textStatus, error) {
                var err = error;
                serverError(err)
            })
    };

    var addTable = function () {
        var r = new Array(), j = 1;
        var number = 0;
        for (var key=0, size=Elements.companies.length; key<size; key++) {
            r[0] ='<tr><th>Name</th><th>Symbol</th><th>Last Price</th><th>Change</th><tr>';
            ++number;
            r[++j] ='<tr id="'+number+'"><td>';
            r[++j] = Elements.companies[key].Name;
            r[++j] = '</td><td>';
            r[++j] = Elements.companies[key].Symbol;
            r[++j] = '</td><td>';
            r[++j] = Elements.companies[key].LastPrice;
            if (Elements.companies[key].Change > 0) {
                r[++j] = '</td><td class="positive">';
                r[++j] = Elements.companies[key].Change;
                r[++j] = '</td><td class="deleteRow">';
                r[++j] = '<i class="fa fa-minus-circle fa-lg" onclick="Functions.deleteTableRow('+number+')"></i>';
            } else {
                r[++j] = '</td><td class="negative">';
                r[++j] = Elements.companies[key].Change;
                r[++j] = '</td><td class="deleteRow">';
                r[++j] = '<i class="fa fa-minus-circle fa-lg" onclick="Functions.deleteTableRow('+number+')"></i>';
            }

            r[++j] = '</td></tr>';
        }
        $('#dataTable').html(r.join(''));
    };

    var warningEmpty = function () {
        $('#errors').addClass( "warning" );
        $('#errors').text( "Please insert company name!" );
    };

    var warningDuplicate = function () {
        $('#errors').addClass( "warning" );
        $('#errors').text( "Company is already in the list!" );
    };

    var warningNoData = function () {
        $('#errors').addClass( "info" );
        $('#errors').text( "Such company not found, please try another company!" );
    };

    var serverError = function (error) {
        $('#errors').addClass( "error" );
        $('#errors').text(error);
    };

    var deleteTableRow = function (number) {
        $('#'+number+'').closest("tr").remove();
    };

    return {
        getData: getData,
        addTable: addTable,
        warningEmpty: warningEmpty,
        warningNoData: warningNoData,
        deleteTableRow: deleteTableRow,
        warningDuplicate: warningDuplicate
    };

})();