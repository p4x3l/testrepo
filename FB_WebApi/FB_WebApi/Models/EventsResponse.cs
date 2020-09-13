using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FB_WebApi.Models
{
    public class EventsResponse
    {
        public int events_received { get; set; }
        public IEnumerable<object> messages { get; set; }
        public string fbtrace_id { get; set; }
    }
}
