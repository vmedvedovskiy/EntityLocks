namespace EntityLocks.Domain
{
    public interface ILockableEntity
    {
        LockType LockType { get; }
    }

    public enum LockType
    {
        Optimistic,
        Pessimistic
    }
}
