const _ = require('lodash');


module.exports.queryCleaner = function (query) {
    const cleanQuery = _.omit(query, 'sort', 'sortmode')

    let rgxQuery = Object.fromEntries(
        Object.entries(cleanQuery)
            .map(([key, val]) => [key, { $regex: val, $options: "i" }])
    );

    return rgxQuery
}

module.exports.sortString = function (query) {

    let sort = {}

    if (query.sort) {
        const field2Sort = query.sort || ""
        if (query.sortmode) {
            sortMode = (query.sortmode.toUpperCase() == 'DESC') ? -1 : 1
        } else {
            sortMode = ""
        }
        sort = { [field2Sort]: sortMode }
    }

    return sort
}