using System.Collections.Generic;

namespace FB_WebApi.Models
{
    public class CustomData
    {
        public string ContentName { get; set; }
        public IEnumerable<string> ContentIds { get; set; }
        public string Currency { get; set; }
        public decimal Value { get; set; }
    }
}
