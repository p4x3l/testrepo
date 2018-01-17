using HallOfFame.WebApi.Contracts;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace HallOfFame.WebApi.Services
{
    public class TokenService : ITokenService
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration, IUserService userService)
        {
            _userService = userService;
            _configuration = configuration;
        }

        public string GenerateToken(string id, string email)
        {
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name, id),
                new Claim(ClaimTypes.Email, email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration["JwtIssuer"],
                _configuration["JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<string> IsValidUserAndPasswordCombination(string username, string password)
        {
            var user = await _userService.GetAuthUser(username);

            if (user == null)
            {
                return null;
            }

            return username == user.Email && _userService.VerifyPassword(password, user.Password) ? user.Id : null;
        }
    }
}
