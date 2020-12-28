using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace ViagemMasterData.Infraestructure
{
    public class HttpRequests
    {
        public HttpRequests() { }

        public async Task<bool> GetEntityForIdAsync(string entityName, string id)
        {
            var httpClient = HttpClientFactory.Create();
            var url = "http://localhost:3003/api/" + entityName + "/" + id;

            HttpResponseMessage httpResponseMessage = await httpClient.GetAsync(url);

            return httpResponseMessage.StatusCode == HttpStatusCode.OK;
        }

    }
}
