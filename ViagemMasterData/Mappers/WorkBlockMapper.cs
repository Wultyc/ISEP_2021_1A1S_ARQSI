using System;
using System.Collections.Generic;
using ViagemMasterData.Domain.WorkBlocks;
using ViagemMasterData.DTOs.WorkBlockDTOs;


namespace ViagemMasterData.Mappers
{
    public class WorkBlockMapper
    {

        public WorkBlockMapper() { }

        public WorkBlockDTO GetWorkBlockDTOForWorkBlock(Schema.WorkBlock workBlock)
        {
            return new WorkBlockDTO(workBlock.Id.ToString().ToUpper(), workBlock.TripId, workBlock.VehicleServiceId, 
                workBlock.TripulantServiceId, workBlock.StartTime, workBlock.EndTime);
        }

        public Schema.WorkBlock GetWorkBlockForWorkBlockDTO(WorkBlockDTO workBlockDTO)
        {
            return new Schema.WorkBlock(workBlockDTO.Id, workBlockDTO.TripId, workBlockDTO.VehicleServiceId, "",
                workBlockDTO.StartTime, workBlockDTO.EndTime);
        }
        
        public List<WorkBlockDTO> GetWorkBlockDTOListForCreateTripWorkBlock(CreateWorkBlockDTO createWorkBlockDTO)
        {
            List <WorkBlockDTO> workBlockDTOList = new List<WorkBlockDTO>();

            for (int i = 0; i < createWorkBlockDTO.NumberOfWorkBlocks; i++)
            {
                workBlockDTOList.Add(new WorkBlockDTO(Guid.NewGuid().ToString().ToUpper(), createWorkBlockDTO.TripId,
                    createWorkBlockDTO.VehicleServiceId, null, 
                    createWorkBlockDTO.StartTime.Add(TimeSpan.FromMinutes(i * createWorkBlockDTO.Frequency)),
                    createWorkBlockDTO.StartTime.Add(TimeSpan.FromMinutes((i + 1) * createWorkBlockDTO.Frequency))));
            }

            return workBlockDTOList;
        }

        public WorkBlock GetWorkBlockDomainForWorkBlockDTO(WorkBlockDTO workBlockDTO)
        {
            return new WorkBlock(workBlockDTO.Id, workBlockDTO.TripId, workBlockDTO.VehicleServiceId, workBlockDTO.TripulantServiceId,
                workBlockDTO.StartTime, workBlockDTO.EndTime);
        }

    }
}
