using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using ViagemMasterData.DTOs.RedeMasterDataDTOs;

namespace ViagemMasterData.Infraestructure
{
    public class HttpRequests
    {
        public HttpRequests() { }

        public async Task<bool> CheckEntityForIdAsync(string entityName, string id)
        {
            HttpClient httpClient = HttpClientFactory.Create();
            string url = "http://localhost:3003/api/" + entityName + "/" + id;

            HttpResponseMessage httpResponseMessage = await httpClient.GetAsync(url);

            return httpResponseMessage.StatusCode == HttpStatusCode.OK;
        }

        public async Task<RouteDTO> GetRouteForIdAsync(string id)
        {
            HttpClient httpClient = HttpClientFactory.Create();
            string url = "http://localhost:3003/api/routes/" + id;

            HttpResponseMessage httpResponse = await httpClient.GetAsync(url);

            if (httpResponse.IsSuccessStatusCode)
            {
                RouteDTO routeDTO = await httpResponse.Content.ReadAsAsync<RouteDTO>();

                return routeDTO;
            }

            return null;
        }

    }
}
