const config = require('config')
const xml2js = require('xml2js')
const fs = require('fs')

const vehicleTypeDTO = require('../../dto/vehicleType.dto')
const NodeDTO = require('../../dto/node.dto')
const RouteDTO = require('../../dto/route.dto')
const LineDTO = require('../../dto/line.dto')

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
    const networks = data.GlDocumentInfo.world[0].GlDocument[0].GlDocumentNetwork[0].Network
    const vehicleTypes = networks[0].VehicleTypes[0].VehicleType.map(v => vehicleTypeDTO(v.$));
    const nodes = networks[0].Nodes[0].Node.map(v => NodeDTO(v.$));
    const routes = networks[0].Paths[0].Path.map(v=> RouteDTO(v, nodes))
    const lines = networks[0].Lines[0].Line.map(v=> LineDTO(v, routes))

    
}