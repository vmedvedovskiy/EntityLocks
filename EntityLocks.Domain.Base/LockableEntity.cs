namespace EntityLocks.Domain.Base
{
    public abstract class LockableEntity : Entity
    {
        public ConflictType ConflictType { get; set; }
    }

    public enum ConflictType
    {
        Ok,
        Conflict
    }
}
