using System;
using System.Collections.Generic;

namespace ViagemMasterData.DTOs.RedeMasterDataDTOs
{
    public class RouteDTO
    {
        public string _id { get; set; }
        public int distance { get; set; }
        public int duration { get; set; }
        public List<RouteNodesDTO> routeNodes { get; set; }
    }

    public class RouteNodesDTO
    {
        public NodeDTO nodeId { get; set; }
        public int distance { get; set; }
        public int duration { get; set; }
    }

    public class NodeDTO
    {
        public string _id { get; set; }
    }
}
