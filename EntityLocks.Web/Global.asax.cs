namespace EntityLocks.Web
{
    using EntityLocks.Web.App_Start;
    using System.Web;
    using System.Web.Http;
    using System.Web.Http.Dispatcher;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;

    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AutoMapperConfiguration.Configure();
            GlobalConfiguration.Configuration.Services.Replace(typeof(IHttpControllerSelector), new CustomControllerSelector(GlobalConfiguration.Configuration));
        }
    }
}
