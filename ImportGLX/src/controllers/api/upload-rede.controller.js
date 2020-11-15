const config = require('config')
const xml2js = require('xml2js')
const fs = require('fs')
const axios = require('axios');

const vehicleTypeDTO = require('../../dto/vehicleType.dto')
const NodeDTO = require('../../dto/node.dto')
const RouteDTO = require('../../dto/route.dto')
const LineDTO = require('../../dto/line.dto')

var updList = []

exports.start = async function (fileName) {
    const filepath = `${__dirname}/../../${config.get('glx-files.upload-dir')}/${fileName}`
    const parser = new xml2js.Parser();

    fs.readFile(filepath, function (err, data) {
        parser.parseString(data, function (err, result) {

            if (err) {
                console.log(err)
                return err
            }

            console.log('File Parsed successfully');
            processGLX(result)
        });
    });
}

processGLX = async function (data) {
    const networks = data.GlDocumentInfo.world[0].GlDocument[0].GlDocumentNetwork[0].Network

    var vehicleTypes = networks[0].VehicleTypes[0].VehicleType.map(v => vehicleTypeDTO(v.$))
    vehicleTypes = await sendAllEntities(config.get("endpoints.redeMasterData.vehicleType"), vehicleTypes)

    var nodes = networks[0].Nodes[0].Node.map(v => NodeDTO(v.$))
    nodes = await sendAllEntities(config.get("endpoints.redeMasterData.node"), nodes)

    var routes = networks[0].Paths[0].Path.map(v => RouteDTO(v, nodes))
    routes = await sendAllEntities(config.get("endpoints.redeMasterData.route"), routes)

    var lines = networks[0].Lines[0].Line.map(v => LineDTO(v, routes))
    lines = await sendAllEntities(config.get("endpoints.redeMasterData.line"), lines)
}

sendAllEntities = async function (endpoint, entityList) {

    for (let index = 0; index < entityList.length; index++) {
        const entity = entityList[index]
        const entityResponse = await axios.post(endpoint, entity.data)
        entityList[index].system_id = entityResponse.data._id
        entityList[index].status = "OK"
    }

    return entityList
}
