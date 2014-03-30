namespace EntityLocks.Domain.Base
{
    using System;

    public abstract class Entity
    {
        public Guid Id { get; set; }
    }
}
