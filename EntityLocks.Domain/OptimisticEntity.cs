namespace EntityLocks.Domain
{
    using EntityLocks.Domain.Base;

    public class OptimisticEntity : LockableEntity
    {
        public int ObjectsCount { get; set; }

        public string Notes { get; set; }

        public int Version { get; set; }
    }
}
