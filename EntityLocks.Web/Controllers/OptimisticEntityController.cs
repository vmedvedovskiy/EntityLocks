

namespace EntityLocks.Web.Controllers
{
    using EntityLocks.Common;
    using EntityLocks.Domain;
    using EntityLocks.Web.Authorization;
    using EntityLocks.Web.Base;
    using EntityLocks.Web.Models;
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    [CookieAuthorizationAttribute(Strings.SessionTokenName)]
    public class OptimisticEntityController : BaseEntityController<OptimisticEntity, OptimisticEntityModel>
    {
        public override HttpResponseMessage Put(string id, [FromBody]OptimisticEntityModel value)
        {
            var existing = this.repository.Load(new Guid(id));
            if (existing.Version > value.Version)
            {
                return this.Request.CreateErrorResponse(HttpStatusCode.Conflict, Strings.ConflictSaving);
            }
            else
            {
                return base.Put(id, value);
            }
        }
    }
}