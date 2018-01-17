using AutoMapper;
using HallOfFame.WebApi.Models;
using MongoDB.Bson;

namespace HallOfFame.WebApi.Mappers
{
    public class UserMap : Profile
    {
        public UserMap()
        {
            CreateMap<UserView, User>().ForMember(s => s.Id, opt => opt.MapFrom(src => src.Id.ToString()));

            CreateMap<UserView, AuthUser>().ForMember(s => s.Id, opt => opt.MapFrom(src => src.Id.ToString()));
        }
    }
}
