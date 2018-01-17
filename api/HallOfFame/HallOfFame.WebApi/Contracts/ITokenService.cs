using System.Threading.Tasks;

namespace HallOfFame.WebApi.Contracts
{
    public interface ITokenService
    {
        Task<string> IsValidUserAndPasswordCombination(string username, string password);

        string GenerateToken(string id, string email);
    }
}
