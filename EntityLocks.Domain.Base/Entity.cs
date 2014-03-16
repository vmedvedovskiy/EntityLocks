namespace EntityLocks.Domain.Base
{
    using System;

    public abstract class Entity
    {
        public Guid Id { get; set; }

        public int Version { get; set; }
    }
}
