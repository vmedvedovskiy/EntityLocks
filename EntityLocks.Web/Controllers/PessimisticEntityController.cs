namespace EntityLocks.Web.Controllers
{
    using EntityLocks.Common;
    using EntityLocks.Domain;
    using EntityLocks.Web.Authorization;
    using EntityLocks.Web.Base;
    using EntityLocks.Web.Helpers;
    using EntityLocks.Web.Models;
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    [CookieAuthorizationAttribute(Strings.SessionTokenName)]
    public class PessimisticEntityController : BaseEntityController<PessimisticEntity, PessimisticEntityModel>
    {
        public override HttpResponseMessage Put(string id, PessimisticEntityModel value)
        {
            // reset lock
            value.Holder = null;
            return base.Put(id, value);
        }

        public override HttpResponseMessage Get(Guid id)
        {
            var loaded = this.repository.Load(id);
            if (loaded.Holder != null)
            {
                return this.Request.CreateResponse(HttpStatusCode.Conflict, new {
                    message = string.Format(Strings.LockedEntity, loaded.Holder.Login),
                    lockedBy = loaded.Holder.Login
                });
            }
            else
            {
                
                // save lock for entity in database
                var token = AuthorizationHelper.GetSessionToken(this.Request);
                var user = SessionTokenManager.Instance.Tokens[token];
                loaded.Holder = user.GetEntity();
                var model = new PessimisticEntityModel(loaded);
                this.repository.Save(loaded);
                return this.Request.CreateResponse<PessimisticEntityModel>(HttpStatusCode.OK, model); ;
            }
        }
    }
}