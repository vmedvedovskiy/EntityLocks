namespace EntityLocks.Web.Controllers
{
    using EntityLocks.Common;
    using EntityLocks.Domain;
    using EntityLocks.Web.Base;
    using EntityLocks.Web.Models;
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Security.Cryptography;
    using System.Text;
    using System.Web.Http;

    public class UserController : BaseEntityController<User, UserModel>
    {
        public override HttpResponseMessage Post([FromBody]UserModel model)
        {
            if(this.repository.IsExists(model.GetEntity()))
            {
                return this.Request.CreateErrorResponse(HttpStatusCode.Conflict, Strings.UserAlreadyExists);
            }

            var responce = base.Post(model);
            var cookie = this.CreateAuthenticationCookie(model);
            responce.Headers.AddCookies(new CookieHeaderValue[] { cookie });
            return responce;
        }

        public HttpResponseMessage Login([FromBody]UserModel model)
        {
            if (this.repository.IsExists(model.GetEntity()))
            {
                var responce = base.Post(model);
                var cookie = this.CreateAuthenticationCookie(model);
                responce.Headers.AddCookies(new CookieHeaderValue[] { cookie });
                return responce;
            }
            else
            {
                return this.Request.CreateErrorResponse(HttpStatusCode.Forbidden, Strings.NoUserInDatabase);
            }
        }

        private CookieHeaderValue CreateAuthenticationCookie(UserModel model)
        {
            var sessionToken = UserController.CreateSessionToken(model);
            var cookie = new CookieHeaderValue(Strings.SessionTokenName, sessionToken);
            cookie.Expires = DateTimeOffset.Now.AddDays(1);
            cookie.Domain = Request.RequestUri.Host;
            cookie.Path = "/";
            return cookie;
        }

        private static string CreateSessionToken(UserModel model)
        {
            var hasher = SHA256.Create();
            var sessionToken = hasher.ComputeHash(Encoding.Default.GetBytes(model.Login + model.Password));
            return Encoding.Default.GetString(sessionToken);
        }
    }
}