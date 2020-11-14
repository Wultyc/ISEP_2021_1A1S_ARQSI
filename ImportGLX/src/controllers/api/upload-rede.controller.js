const config = require('config')
const xml2js = require('xml2js')
const fs = require('fs')

exports.start = function (fileName) {
    const filepath = `${__dirname}/../../${config.get('glx-files.upload-dir')}/${fileName}`
    const parser = new xml2js.Parser();

    fs.readFile( filepath, function (err, data) {
        parser.parseString(data, function (err, result) {

            if(err){
                console.log(err)
                return err
            }

            console.log('File Parsed successfully');
            processGLX(result)
        });
    });
}

function processGLX(data) {
    const network = data.GlDocumentInfo.world[0].GlDocument[0].GlDocumentNetwork[0].Network[0]
    console.log(network)
}