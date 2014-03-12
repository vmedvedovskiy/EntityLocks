namespace EntityLocks.Domain
{
    using System;

    public class PessimisticEntity: Entity
    {
        public string Name { get; set; }

        public DateTime CreateDate { get; set; }

        public string AdditionalInfo { get; set; }

        public override LockType Locktype
        {
            get { return LockType.Pessimistic; }
        }
    }
}
