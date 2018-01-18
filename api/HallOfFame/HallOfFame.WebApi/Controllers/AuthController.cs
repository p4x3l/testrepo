using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HallOfFame.WebApi.Contracts;
using HallOfFame.WebApi.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HallOfFame.WebApi.Controllers
{
    [Authorize]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private IUserService _userService;

        private ITokenService _tokenService;

        public AuthController(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("token")]
        public async Task<IActionResult> GenerateToken([FromBody] AuthorizeUserModel user)
        {
            var userId = await _tokenService.IsValidUserAndPasswordCombination(user.Email, user.Password);
            if (userId != null)
                return new ObjectResult(_tokenService.GenerateToken(userId, user.Email));
            return BadRequest();
        }

        [HttpPut("password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel user)
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;

            if (user.Id != claimsIdentity.Name)
            {
                return BadRequest();
            }

            await _userService.ChangePassword(user.Id, user.Password);
            return Ok();
        }
    }
}