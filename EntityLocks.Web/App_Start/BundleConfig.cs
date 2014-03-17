﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;

namespace EntityLocks.Web
{
    public class BundleConfig
    {
        // Дополнительные сведения об объединении см. по адресу: http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/libs/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                "~/Scripts/libs/knockout-{version}.js",
                "~/Scripts/libs/knockout.validation.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/app/boostrap/ajaxPrefilters.js",
                "~/Scripts/app/boostrap/app.bindings.js",
                "~/Scripts/app/boostrap/app.datamodel.js",
                "~/Scripts/app/boostrap/app.viewmodel.js",
                "~/Scripts/app/boostrap/home.viewmodel.js",
                "~/Scripts/app/boostrap/login.viewmodel.js",
                "~/Scripts/app/boostrap/register.viewmodel.js",
                "~/Scripts/app/boostrap/registerExternal.viewmodel.js",
                "~/Scripts/app/boostrap/manage.viewmodel.js",
                "~/Scripts/app/boostrap/userInfo.viewmodel.js",
                "~/Scripts/app/_run.js"));

            // Используйте версию Modernizr для разработчиков, чтобы учиться работать. Когда вы будете готовы перейти к работе,
            // используйте средство построения на сайте http://modernizr.com, чтобы выбрать только нужные тесты.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/libs/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/libs/bootstrap.min.js",
                "~/Scripts/libs/respond.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                 "~/Content/bootstrap.min.css",
                 "~/Content/Site.css"));
        }
    }
}