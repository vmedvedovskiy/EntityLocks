namespace EntityLocks.Web.Controllers
{
    using EntityLocks.Common;
    using EntityLocks.DAL.Repositories;
    using EntityLocks.Domain;
    using EntityLocks.Web.Base;
    using EntityLocks.Web.Helpers;
    using EntityLocks.Web.Models;
    using System;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Web.Http;

    public class LoginController : BaseEntityController<User, UserModel>
    {
        public override HttpResponseMessage Post([FromBody]UserModel model)
        {
            if (this.repository.IsExists(model.GetEntity()))
            {
                // Update user model with real DB id
                var newModel = new UserModel((this.repository as UserRepository).Load(model.Login));

                var responce = new HttpResponseMessage();
                responce.StatusCode = HttpStatusCode.OK;
                var cookie = AuthorizationHelper.CreateAuthenticationCookie(newModel, this.Request.RequestUri.Host);
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
            var token = AuthorizationHelper.GetSessionToken(this.Request); 
            if (string.IsNullOrEmpty(token))
            {
                return new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }
            else
            {
                UserModel user;
                if (SessionTokenManager.Instance.Tokens.TryGetValue(token, out user))
                {
                    return this.Request.CreateResponse(HttpStatusCode.OK, new { userName = user.Login });
                }
                else
                {
                    return new HttpResponseMessage(HttpStatusCode.Unauthorized); 
                }
            }
        }

        [HttpGet]
        public HttpResponseMessage Logout()
        {
            var cookie = this.Request.Headers.GetCookies(Strings.SessionTokenName).SingleOrDefault();
            var responce = this.Request.CreateResponse(HttpStatusCode.OK);

            if (cookie != null)
            {
                cookie.Expires = DateTime.Now.AddYears(-1);
                var token = cookie.Cookies
                    .Where(x => x.Name.CompareTo(Strings.SessionTokenName) == 0)
                    .SingleOrDefault();

                SessionTokenManager.Instance.Tokens.Remove(token.Value);
                token.Value = String.Empty;
                token.Values.Clear();

                responce.Headers.AddCookies(new CookieHeaderValue[] { cookie });
            }

            return responce;
        }
    }
}