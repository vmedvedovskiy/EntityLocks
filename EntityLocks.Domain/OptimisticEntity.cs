namespace EntityLocks.Domain
{
    public class OptimisticEntity : Entity, ILockableEntity
    {
        public int ObjectsCount { get; set; }

        public string Notes { get; set; }

        public LockType LockType
        {
            get { return LockType.Optimistic; }
        }
    }
}
