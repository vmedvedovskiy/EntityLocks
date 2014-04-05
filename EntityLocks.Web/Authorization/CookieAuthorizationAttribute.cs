namespace EntityLocks.Web.Authorization
{
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http.Controllers;
    using System.Web.Http.Filters;
    using System.Net.Http.Headers;
    using EntityLocks.Web.Helpers;

    public class CookieAuthorizationAttribute : AuthorizationFilterAttribute
    {
        private string tokenName;

        public CookieAuthorizationAttribute(string key)
        {
            this.tokenName = key;
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (string.IsNullOrEmpty(AuthorizationHelper.GetSessionToken(actionContext.Request)))
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                actionContext.Response.Headers.Add("Location", "login");
            }
        }
    }
}