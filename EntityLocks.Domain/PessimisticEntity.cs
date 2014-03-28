namespace EntityLocks.Domain
{
    using EntityLocks.Domain.Base;
    using System;

    public class PessimisticEntity: Entity
    {
        public string Name { get; set; }

        public DateTime CreateDate { get; set; }

        public string AdditionalInfo { get; set; }

        public User Holder { get; set; }
    }
}
