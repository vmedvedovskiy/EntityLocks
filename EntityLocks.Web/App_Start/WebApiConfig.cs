﻿namespace EntityLocks.Web
{
    using Newtonsoft.Json.Serialization;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Routing;

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.MapHttpAttributeRoutes();


            config.Routes.MapHttpRoute(
                name: "LoginApi",
                routeTemplate: "api/login/{action}",
                defaults: new { action = RouteParameter.Optional, controller = "login" }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
