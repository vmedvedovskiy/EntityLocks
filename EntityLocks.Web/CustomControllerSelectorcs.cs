namespace EntityLocks.Web
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Reflection;
    using System.Web.Http;
    using System.Web.Http.Controllers;
    using System.Web.Http.Dispatcher;

    public class CustomControllerSelector : DefaultHttpControllerSelector
    {
        private const string CONTROLLER_SUFFIX = "Controller";
        private static Dictionary<string, Type> _controllerTypes;

        private readonly HttpConfiguration _configuration;

        public CustomControllerSelector(HttpConfiguration configuration)
            : base(configuration)
        {
            this._configuration = configuration;

            if (_controllerTypes == null)
                _controllerTypes = LoadTypes();
        }

        private static Dictionary<string, Type> LoadTypes()
        {
            var assembly = Assembly.GetExecutingAssembly();

            // Reflect all types with the controller suffix.
            var types = assembly.GetTypes()
                .Where(t => !t.IsAbstract &&
                    t.Name.EndsWith(CONTROLLER_SUFFIX) &&
                    typeof(ApiController).IsAssignableFrom(t))
                .ToDictionary(t => t.FullName, t => t);

            return types;
        }

        public override HttpControllerDescriptor SelectController(HttpRequestMessage request)
        {
            return GetController(request) ?? base.SelectController(request);
        }

        private HttpControllerDescriptor GetController(HttpRequestMessage request)
        {
            HttpControllerDescriptor descriptor = null;
            string controllerName = base.GetControllerName(request);

            string fullName = string.Format(".{0}{1}", controllerName, CONTROLLER_SUFFIX);

            // Search for the controller.
            var type = _controllerTypes.Where(
                t => t.Key.EndsWith(fullName, StringComparison.OrdinalIgnoreCase))
                        .Select(t => t.Value).FirstOrDefault();

            if (type != null)
                descriptor = new HttpControllerDescriptor(_configuration, controllerName, type);

            return descriptor;
        }
    }
}