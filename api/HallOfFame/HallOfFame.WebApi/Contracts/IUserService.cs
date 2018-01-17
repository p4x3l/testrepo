using HallOfFame.WebApi.Models;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HallOfFame.WebApi.Contracts
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAll();

        Task<User> Get(string id);

        Task<AuthUser> GetAuthUser(string email);

        Task ChangePassword(string id, string password);

        bool VerifyPassword(string plainText, string hashValue);
    }
}
