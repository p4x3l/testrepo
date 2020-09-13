using FB_WebApi.Models;
using System.Threading.Tasks;

namespace FB_WebApi.Services
{
    public interface IFacebookService
    {
        public Task<string> GenerateNewToken();

        public Task<EventsResponse> CreateFacebookEvent(Contact contact, InvoiceItem invoiceItem);
    }
}
