namespace EntityLocks.Domain
{
    public class OptimisticEntity: Entity
    {
        public int ObjectsCount { get; set; }

        public string Notes { get; set; }

        public override LockType Locktype
        {
            get { return LockType.Optimistic; }
        }
    }
}
