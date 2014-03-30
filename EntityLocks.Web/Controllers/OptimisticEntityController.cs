

namespace EntityLocks.Web.Controllers
{
    using EntityLocks.Domain;
    using EntityLocks.Web.Base;
    using EntityLocks.Web.Models;
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Mvc;

    public class OptimisticEntityController : BaseEntityController<OptimisticEntity, OptimisticEntityModel>
    {
        public override void Put(string id, [FromBody]OptimisticEntityModel value)
        {
            var existing = this.repository.Load(new Guid(id));
            if (existing.Version > value.Version)
            {
                throw new HttpResponseException(HttpStatusCode.Conflict);
            }
            else
            {
                base.Put(id, value);
            }
        }
    }
}