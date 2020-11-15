NodeDTO = function (glx_entry) {
    let node = {
        system_id: "",
        glx_id: glx_entry.key,
        data: {
            shortName: glx_entry.ShortName,
            name: glx_entry.Name,
            longitude: glx_entry.Longitude,
            latitude: glx_entry.Latitude,
            collectionNode: glx_entry.IsDepot,
            surrenderNode: glx_entry.IsReliefPoint
        },
        status: "Not Processed"
    };
    return node;
}

module.exports = NodeDTO;