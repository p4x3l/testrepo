using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HallOfFame.WebApi.Models
{
    public class ChangePasswordModel
    {
        public string Id { get; set; }

        public string Password { get; set; }
    }
}
