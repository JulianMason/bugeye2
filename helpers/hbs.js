const moment = require('moment')


module.exports = {
    formatDate: function(date, format) {
        return moment(date).format(format)
    },
    ifEquals: function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    eq: function( a, b ){
        var next =  arguments[arguments.length-1];
        return (a === b) ? next.fn(this) : next.inverse(this);
    },
    select: function (selected, options) {
        return options
          .fn(this)
          .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
          )
          .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
          )
    }
}