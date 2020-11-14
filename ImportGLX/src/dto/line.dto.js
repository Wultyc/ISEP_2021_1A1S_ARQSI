LineDTO = function (glx_entry, routeList) {
    let line = {
        system_id: "",
        glx_id: glx_entry.$.key,
        data: {
            code: "",
            name: glx_entry.$.Name,
            beginNode: "",
            finalNode: "",
            route: glx_entry.LinePaths[0].LinePath.map(v => ({routeId:routeList.find((route) => route.glx_id == v.$.Path).system_id, orientation:v.$.Orientation})),
            tripulantType: "",
            vehicleType: ""
        },
        status: ""
    }
    return line;
};

module.exports = LineDTO;