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
    const processedData = {
        vehicleTypes: {data: undefined, processed: false},
        nodes: {data: undefined, processed: false},
        routes: {data: undefined, processed: false},
        lines: {data: undefined, processed: false},
        errors: null
    }

    try {
        processedData.vehicleTypes.data = networks[0].VehicleTypes[0].VehicleType.map(v => vehicleTypeDTO(v.$))
        processedData.vehicleTypes.processed = true
        processedData.vehicleTypes.data = await sendAllEntities(config.get("endpoints.redeMasterData.vehicleType"), processedData.vehicleTypes.data)

        processedData.nodes.data = networks[0].Nodes[0].Node.map(v => NodeDTO(v.$))
        processedData.nodes.processed = true
        processedData.nodes.data = await sendAllEntities(config.get("endpoints.redeMasterData.node"), processedData.nodes.data)

        processedData.routes.data = networks[0].Paths[0].Path.map(v => RouteDTO(v, processedData.nodes.data))
        processedData.routes.processed = true
        processedData.routes.data = await sendAllEntities(config.get("endpoints.redeMasterData.route"), processedData.routes.data)

        processedData.lines.data = networks[0].Lines[0].Line.map(v => LineDTO(v, processedData.routes.data))
        processedData.lines.processed = true
        processedData.lines.data = await sendAllEntities(config.get("endpoints.redeMasterData.line"), processedData.lines.data)
    }
    catch (e) {
        console.log(e)
        processedData.errors = e
        if(!processedData.vehicleTypes.processed) processedData.vehicleTypes.data = networks[0].VehicleTypes[0].VehicleType.map(v => vehicleTypeDTO(v.$))
        if(!processedData.nodes.processed) processedData.nodes.data = networks[0].Nodes[0].Node.map(v => NodeDTO(v.$))
        if(!processedData.routes.processed) processedData.routes.data = networks[0].Paths[0].Path.map(v => RouteDTO(v, processedData.nodes.data))
        if(!processedData.lines.processed) processedData.lines.data = networks[0].Lines[0].Line.map(v => LineDTO(v, processedData.routes.data))
    }

    
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
