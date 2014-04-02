namespace EntityLocks.Web
{
    using System.Web.Mvc;
    using System.Web.Routing;


    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "IndexOnly",
                url: "Home/{action}",
                defaults: new { controller = "Home", action = "Index" }
            );
            routes.MapRoute(
                "Default",
                "{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}