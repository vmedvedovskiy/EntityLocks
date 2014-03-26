

namespace EntityLocks.Web.Controllers
{
    using EntityLocks.Domain;
    using EntityLocks.Web.Base;
    using EntityLocks.Web.Models;
    using System.Collections.Generic;

    public class OptimisticEntityController : BaseEntityController<OptimisticEntity, OptimisticEntityModel>
    {
        // GET api/<controller>
        public override IEnumerable<OptimisticEntityModel> Get()
        {
            return new List<OptimisticEntityModel>()
            {
                new OptimisticEntityModel(new OptimisticEntity() 
                {
                    Notes = "cat",
                    ObjectsCount = 5,
                    Version = 1
                })
            };
        }

    }
}