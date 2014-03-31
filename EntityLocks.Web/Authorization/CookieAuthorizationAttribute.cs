namespace EntityLocks.Web.Authorization
{
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http.Controllers;
    using System.Web.Http.Filters;
    using System.Net.Http.Headers;

    public class CookieAuthorizationAttribute : AuthorizationFilterAttribute
    {
        private string tokenName;

        public CookieAuthorizationAttribute(string key)
        {
            this.tokenName = key;
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            var sessionTokenCookies = actionContext.Request.Headers.GetCookies(this.tokenName).FirstOrDefault();
            string sessionToken = string.Empty;
            if (sessionTokenCookies != null)
            {
                sessionToken = sessionTokenCookies[this.tokenName].Value;
            }

            if (string.IsNullOrEmpty(sessionToken))
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }
        }
    }
}