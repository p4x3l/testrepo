using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FB_WebApi.Models
{
    public class Contact
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime? BirthDay { get; set; }

        public string MobilePhone { get; set; }

        public string Email { get; set; }

        public string City { get; set; }

        public string ZipCode { get; set; }

        public string Country { get; set; }
    }
}
