LineDTO = function (glx_entry, routeList) {
    const exampleRoute = routeList.find((route) => route.glx_id == glx_entry.LinePaths[0].LinePath[0].$.Path)
    let line = {
        system_id: "",
        glx_id: glx_entry.$.key,
        data: {
            code: "",
            name: glx_entry.$.Name,
            color: glx_entry.$.Color,
            beginNode: exampleRoute.data.routeNodes[0].nodeId,
            finalNode: exampleRoute.data.routeNodes[exampleRoute.data.routeNodes.length - 1].nodeId,
            route: glx_entry.LinePaths[0].LinePath.map(v => ({routeId:routeList.find((route) => route.glx_id == v.$.Path).system_id, orientation:v.$.Orientation})),
            tripulantType: "",
            vehicleType: ""
        },
        status: ""
    }
    return line;
};

module.exports = LineDTO;