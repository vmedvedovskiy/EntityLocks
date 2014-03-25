namespace EntityLocks.Web.Models
{
    using EntityLocks.Domain;
    using EntityLocks.Web.Base;
    using System;

    public class PessimisticEntityModel : BaseEntityModel<PessimisticEntity>
    {
        public PessimisticEntityModel(PessimisticEntity entity)
            : base(entity)
        { }

        public string Name { get; set; }

        public DateTime CreateDate { get; set; }

        public string AdditionalInfo { get; set; }

        public UserEntityModel Holder { get; set; }
    }
}