namespace EntityLocks.Web.Controllers
{
    using EntityLocks.Common;
    using EntityLocks.Domain;
    using EntityLocks.Web.Base;
    using EntityLocks.Web.Helpers;
    using EntityLocks.Web.Models;
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Web.Http;

    public class RegisterController : BaseEntityController<User, UserModel>
    {
        public override HttpResponseMessage Post([FromBody]UserModel model)
        {
            if (!this.repository.IsExists(model.GetEntity()))
            {
                var responce = new HttpResponseMessage();
                responce.StatusCode = HttpStatusCode.Created;
                var cookie = AuthorizationHelper.CreateAuthenticationToken(model, this.Request.RequestUri.Host);
                responce.Headers.AddCookies(new CookieHeaderValue[] { cookie });
                return responce;
            }
            else
            {
                return this.Request.CreateErrorResponse(HttpStatusCode.Forbidden, Strings.NoUserInDatabase);
            }
        }
    }
}