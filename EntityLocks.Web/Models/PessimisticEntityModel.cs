namespace EntityLocks.Web.Models
{
    using EntityLocks.Domain;
    using EntityLocks.Web.Base;
    using Newtonsoft.Json;
    using System;

    public class PessimisticEntityModel : BaseEntityModel<PessimisticEntity>
    {
        public PessimisticEntityModel(PessimisticEntity entity)
            : base(entity)
        { }

        public string Name { get; set; }

        public string AdditionalInfo { get; set; }

        public string LockedBy 
        {
            get
            {
                if (this.Holder != null)
                {
                    return this.Holder.Login;
                }

                return string.Empty;
            }
        }

        [JsonIgnore]
        public UserModel Holder { get; set; }
    }
}