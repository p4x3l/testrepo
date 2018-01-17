using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HallOfFame.WebApi.Models
{
    [BsonIgnoreExtraElements]
    public class AuthUser
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
    }
}
