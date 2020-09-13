using FB_WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FB_WebApi.MockData
{
    public static class MockContacts
    {
        public static IEnumerable<Contact> GetMockContacts()
        {
            return new List<Contact>
            {
                new Contact
                {
                    Id = Guid.Parse("62A057F0-9ACE-4B00-AF07-9BE874816944"),
                    FirstName = "Eva-Lotta",
                    LastName = "Bogren",
                    BirthDay = new DateTime(1982, 10, 19),
                    MobilePhone = "+",
                    Email = "eva-lotta.bogren@mailinator.com",
                    City = "Strömsund",
                    ZipCode = "833 92",
                    Country = "Sweden"
                },
                new Contact
                {
                    Id = Guid.Parse("6AA71705-B3B3-4024-899F-CB7F43FD0F82"),
                    FirstName = "Gabriella",
                    LastName = "Svedberg",
                    BirthDay = new DateTime(1998, 11, 12),
                    MobilePhone = "+",
                    Email = "gabriella.svedberg@sogetthis.com",
                    City = "Skara",
                    ZipCode = "532 36",
                    Country = "Sweden"
                },
                new Contact
                {
                    Id = Guid.Parse("C9CD48D7-E7EC-4D15-8827-477183321AAE"),
                    FirstName = "Fabian",
                    LastName = "Björnberg",
                    BirthDay = new DateTime(1973, 3, 14),
                    MobilePhone = "+",
                    Email = "fabian.bjornberg@sogetthis.com",
                    City = "Nybro",
                    ZipCode = "382 93",
                    Country = "Sweden"
                },
                new Contact
                {
                    Id = Guid.Parse("8443878F-23D2-4794-A521-5900500B243D"),
                    FirstName = "David",
                    LastName = "Bandemo",
                    BirthDay = new DateTime(1986, 8, 3),
                    MobilePhone = "+46768144242",
                    Email = "david.bandemo@voyado.con",
                    City = "Norrköping",
                    ZipCode = "603 57",
                    Country = "Sweden"
                },
                new Contact
                {
                    Id = Guid.Parse("6980B133-94CF-4A26-B0E3-950505CEA090"),
                    FirstName = "Daniel",
                    LastName = "Persson",
                    BirthDay = null,
                    MobilePhone = "+46702832438",
                    Email = "daniel.persson@voyado.com",
                    City = "Norrköping",
                    ZipCode = null,
                    Country = "Sweden"
                },
                new Contact
                {
                    Id = Guid.Parse("8064A838-6F45-4B97-9528-8DB3535F3DD0"),
                    FirstName = "Karin",
                    LastName = "Gardström",
                    BirthDay = null,
                    MobilePhone = "+46703600220",
                    Email = "karin.gardstrom@voyado.com",
                    City = null,
                    ZipCode = null,
                    Country = "Sweden"
                },
                new Contact
                {
                    Id = Guid.Parse("2D6BBE30-112E-42BD-8D83-6BB3854FB43F"),
                    FirstName = null,
                    LastName = null,
                    BirthDay = null,
                    MobilePhone = "+46705597525",
                    Email = null,
                    City = null,
                    ZipCode = null,
                    Country = null
                },
                new Contact
                {
                    Id = Guid.Parse("CF383D61-08CD-4572-AF8A-E941986C91EA"),
                    FirstName = null,
                    LastName = null,
                    BirthDay = null,
                    MobilePhone = null,
                    Email = "soren.sjogren@mailmetrash.com",
                    City = null,
                    ZipCode = null,
                    Country = null
                }
            };
        }
    }
}
