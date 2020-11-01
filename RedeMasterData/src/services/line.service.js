const LineRepository = require('../repositories/line.repository');
const Line = require('../models/line.model');

var repo = new LineRepository();

class LineService {
    constructor() {}

    lineCreate(line, callback) {
        repo.save(line, callback)
    };
}

module.exports = LineService;    