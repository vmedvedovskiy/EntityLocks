namespace EntityLocks.Domain
{
    using System;

    public class PessimisticEntity: Entity, ILockableEntity
    {
        public string Name { get; set; }

        public DateTime CreateDate { get; set; }

        public string AdditionalInfo { get; set; }

        public LockType LockType
        {
            get { return LockType.Pessimistic; }
        }

        public bool IsLocked { get; set; }
    }
}
