using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HallOfFame.WebApi.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int Role { get; set; }

        public string Email { get; set; }

        public int EliteProspectId { get; set; }
    }
}
