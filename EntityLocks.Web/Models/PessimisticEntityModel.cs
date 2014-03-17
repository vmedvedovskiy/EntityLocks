namespace EntityLocks.Web.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class PessimisticEntityModel
    {
        public string Name { get; set; }

        public DateTime CreateDate { get; set; }

        public string AdditionalInfo { get; set; }

        public UserInfoViewModel Holder { get; set; }
    }
}