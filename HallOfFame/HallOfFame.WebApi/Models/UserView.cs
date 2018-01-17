using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HallOfFame.WebApi.Models
{
    [BsonIgnoreExtraElements]
    public class UserView
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("firstname")]
        public string FirstName { get; set; }

        [BsonElement("lastname")]
        public string LastName { get; set; }

        [BsonElement("role")]
        public int Role { get; set; }

        [BsonElement("elite_prospect_id")]
        public int EliteProspectId { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("password")]
        public string Password { get; set; }
    }
}
