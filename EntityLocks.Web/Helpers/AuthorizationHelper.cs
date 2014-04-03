namespace EntityLocks.Web.Helpers
{
    using EntityLocks.Common;
    using EntityLocks.Web.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Security.Cryptography;
    using System.Text;
    using System.Web;

    internal class AuthorizationHelper
    {
        internal static string CreateSessionToken(UserModel model)
        {
            var hasher = SHA256.Create();
            var sessionToken = hasher.ComputeHash(Encoding.Default.GetBytes(model.Login + model.Password));
            return Encoding.Default.GetString(sessionToken);
        }


        internal static CookieHeaderValue CreateAuthenticationCookie(UserModel model, string cookieDomain)
        {
            var sessionToken = AuthorizationHelper.CreateSessionToken(model);
            SessionTokenManager.Instance.Tokens.Add(sessionToken, model);
            var cookie = new CookieHeaderValue(Strings.SessionTokenName, sessionToken);
            cookie.Expires = DateTimeOffset.Now.AddDays(1);
            cookie.Domain = cookieDomain;
            cookie.Path = "/";
            return cookie;
        }

        internal static string GetAuthenticationToken(HttpRequestMessage request)
        {
            var sessionTokenCookies = request.Headers.GetCookies(Strings.SessionTokenName).FirstOrDefault();
            string sessionToken = string.Empty;
            if (sessionTokenCookies != null)
            {
                sessionToken = sessionTokenCookies[Strings.SessionTokenName].Value;
            }

            return sessionToken;
        }
    }
}