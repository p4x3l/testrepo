using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using FB_WebApi.MockData;
using FB_WebApi.Models;
using FB_WebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FB_WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FacebookController : ControllerBase
    {
        private readonly IFacebookService _facebookService;
        public FacebookController(IFacebookService facebookService)
        {
            _facebookService = facebookService;
        }

        [HttpGet]
        public async Task<IActionResult> GetToken()
        {
            var token = await _facebookService.GenerateNewToken();

            return Ok(token);
        }

        [HttpPost]
        [Route("events/{contactId}")]
        public async Task<IActionResult> CreateEvent(Guid contactId, InvoiceItem invoiceItem)
        {
            var contact = MockContacts.GetMockContacts().FirstOrDefault(x => x.Id == contactId);

            if (contact == null)
            {
                return NotFound($"ContactId {contactId} not found");
            }

            var eventData = await _facebookService.CreateFacebookEvent(contact, invoiceItem);

            return Ok(new
            { 
                NrOfEvents = eventData.events_received,
                FbTraceId = eventData.fbtrace_id
            });
        }
    }
}
