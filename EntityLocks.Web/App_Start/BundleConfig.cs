namespace EntityLocks.Web
{
    using System.Web.Optimization;

    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/libs/jquery-1.10.2.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/libs/bootstrap.min.js",
                "~/Scripts/libs/respond.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/libs").Include(
                "~/Scripts/libs/agility.min.js",
                "~/Scripts/libs/history.js",
                "~/Scripts/libs/sha256.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                 "~/Content/bootstrap.min.css",
                 "~/Content/Site.css"));
        }
    }
}
