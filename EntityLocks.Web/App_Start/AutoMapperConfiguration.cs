
namespace EntityLocks.Web.App_Start
{
    using AutoMapper;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using EntityLocks.Domain;
    using EntityLocks.Web.Models;


    public class AutoMapperConfiguration
    {
        public static void Configure()
        {
            Mapper.CreateMap<OptimisticEntity, OptimisticEntityModel>();
            Mapper.CreateMap<OptimisticEntityModel, OptimisticEntity>();

            Mapper.CreateMap<PessimisticEntity, PessimisticEntityModel>();
            Mapper.CreateMap<PessimisticEntityModel, PessimisticEntity>();

            Mapper.CreateMap<User, UserModel>();
            Mapper.CreateMap<UserModel, User>();

        }
    }
}