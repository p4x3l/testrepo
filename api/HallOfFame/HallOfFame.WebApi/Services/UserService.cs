using AutoMapper;
using HallOfFame.WebApi.Contracts;
using HallOfFame.WebApi.DbContext;
using HallOfFame.WebApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HallOfFame.WebApi.Services
{
    public class UserService: IUserService
    {
        private readonly UserContext _context = null;
        private readonly IMapper _mapper;

        public UserService(IOptions<Settings> settings, IMapper mapper)
        {
            _context = new UserContext(settings);
            _mapper = mapper;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            try
            {
                var users = await _context.Users
                        .Find(_ => true).ToListAsync();
                return _mapper.Map<IEnumerable<User>>(users);
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

        public async Task<User> Get(string id)
        {
            var filter = Builders<UserView>.Filter.Eq("_id", new ObjectId(id));

            try
            {
                var user = await _context.Users
                                .Find(filter)
                                .FirstOrDefaultAsync();

                return _mapper.Map<User>(user);
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

        public async Task ChangePassword(string id, string password)
        {
            var mongoId = new ObjectId(id);
            var hashedPassword = HashService.ComputeHash(password, null, null);
            var filter = Builders<UserView>.Filter.Eq(s => s.Id, mongoId);
            var update = Builders<UserView>.Update
                            .Set(s => s.Password, hashedPassword);

            try
            {
                UpdateResult actionResult
                    = await _context.Users.UpdateOneAsync(filter, update);

                if (!(actionResult.IsAcknowledged && actionResult.ModifiedCount > 0))
                {
                    throw new Exception("Failed to update resource");
                }
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

        public bool VerifyPassword(string plainText, string hashValue)
        {
            return hashValue.Length == 0 || HashService.VerifyHash(plainText, null, hashValue);
        }

        public async Task<AuthUser> GetAuthUser(string email)
        {
            var filter = Builders<UserView>.Filter.Eq("email", email);

            try
            {
                var user = await _context.Users
                                .Find(filter)
                                .FirstOrDefaultAsync();

                return _mapper.Map<AuthUser>(user);
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }          
        }
    }
}
