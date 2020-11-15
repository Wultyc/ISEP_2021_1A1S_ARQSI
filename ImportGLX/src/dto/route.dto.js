RouteDTO = function (glx_entry, nodeList) {
    let route = {
        system_id: "",
        glx_id: glx_entry.$.key,
        data: {
            isReinforcementRoute: false,
            isEmptyRoute: glx_entry.$.IsEmpty,
            routeNodes: glx_entry.PathNodes[0].PathNode.map(v => ({nodeId: nodeList.find((node) => node.glx_id == v.$.Node).system_id, distance: v.$.Distance || "0", duration: v.$.Duration || "0"}))
        },
        status: ""
    }

    return route;
}

module.exports = RouteDTO;