const _ = require('lodash');


module.exports.queryCleaner = function (query) {
    const cleanQuery = _.omit(query, 'sort', 'sortmode')

    let rgxQuery = null

    for (let key in cleanQuery) {
        rgxQuery = {rgxQuery, [key]: { $regex: cleanQuery[key], $options: "i" }}
    }

    return rgxQuery
}

module.exports.sortString = function (query) {
    const field2Sort = query.sort || ""
    let sortMode
    if (query.sortmode) {
        sortMode = (query.sortmode.toUpperCase() == 'DESC') ? -1 : 1
    } else {
        sortMode = ""
    }
    return { [field2Sort]: sortMode }
}