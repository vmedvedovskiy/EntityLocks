using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLocks.Domain.Base
{
    public abstract class LockableEntity : Entity
    {
        LockType LockType { get; set; }

        ConflictType ConflictType { get; set; }
    }

    public enum LockType
    {
        Optimistic,
        Pessimistic
    }

    public enum ConflictType
    {
        Ok,
        Conflict
    }
}
