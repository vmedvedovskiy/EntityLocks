

namespace EntityLocks.Web.Controllers
{
    using EntityLocks.Domain;
    using EntityLocks.Web.Base;
    using EntityLocks.Web.Models;

    public class OptimisticEntityController : BaseEntityController<OptimisticEntity, OptimisticEntityModel>
    {
        public OptimisticEntityController()
            : base()
        { }
    }
}