using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HallOfFame.WebApi.Contracts;
using HallOfFame.WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HallOfFame.WebApi.Controllers
{
    [Authorize]
    [Route("api/users")]
    public class UserController : Controller
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [ResponseCache(NoStore = true, Duration = 0)]
        [HttpGet("")]
        public async Task<IEnumerable<User>> GetAll()
        {
            var test = await _userService.GetAll();
            return test;
        }

        [ResponseCache(NoStore = true, Duration = 0)]
        [HttpGet("{id}")]
        public async Task<User> Get(string id)
        {
            var user = await _userService.Get(id);
            return user;
        }

        [ResponseCache(NoStore = true, Duration = 0)]
        [HttpGet("current")]
        public async Task<User> GetCurrentUser()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;

            var user = await _userService.Get(claimsIdentity.Name);
            return user;
        }
    }
}