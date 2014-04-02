namespace EntityLocks.Web.Controllers
{
    using EntityLocks.Common;
    using EntityLocks.DAL.Repositories;
    using EntityLocks.Domain;
    using EntityLocks.Web.Base;
    using EntityLocks.Web.Helpers;
    using EntityLocks.Web.Models;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Web.Http;
    using System.Linq;
    using System;

    public class LoginController : BaseEntityController<User, UserModel>
    {
        public override HttpResponseMessage Post([FromBody]UserModel model)
        {
            if (this.repository.IsExists(model.GetEntity()))
            {
                var responce = new HttpResponseMessage();
                responce.StatusCode = HttpStatusCode.OK;
                var cookie = AuthorizationHelper.CreateAuthenticationToken(model, this.Request.RequestUri.Host);
                responce.Headers.AddCookies(new CookieHeaderValue[] { cookie });
                return responce;
            }
            else
            {
                return this.Request.CreateErrorResponse(HttpStatusCode.Forbidden, Strings.NoUserInDatabase);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetUserInfo()
        {
            HttpResponseMessage responce = null;
            var token = AuthorizationHelper.GetAuthenticationToken(this.Request); 
            if (string.IsNullOrEmpty(token))
            {
                responce = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                return responce;
            }
            else
            {
                var user = (this.repository as UserRepository).GetLoginByToken(token);
                responce = this.Request.CreateResponse(HttpStatusCode.OK, new { userName = user });
                return responce;
            }
        }

        [HttpGet]
        public void Logout()
        {
            var cookie = this.Request.Headers.GetCookies(Strings.SessionTokenName).SingleOrDefault();
            if (cookie != null)
            {
                cookie.Expires = DateTime.Now.AddDays(-1);
                var responce = this.Request.CreateResponse(HttpStatusCode.OK);
                responce.Headers.AddCookies(new CookieHeaderValue[] { cookie });
                this.ResponseMessage(responce);
                return;
            }
        }
    }
}