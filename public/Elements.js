'use strict';

var Elements = (function() {

    var input = $('.search-input');
    var addButton = $('.fa-plus-circle');
    var table = $('#dataTable');

    var tempArray = [];
    var companies = [];

    return {
        input: input,
        addButton: addButton,
        companies: companies,
        tempArray: tempArray,
        table: table
    }
})();