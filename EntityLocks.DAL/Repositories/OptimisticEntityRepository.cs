namespace EntityLocks.DAL.Repositories
{
    using EntityLocks.Domain;
    using System;

    internal class OptimisticEntityRepository : EntityRepository<OptimisticEntity>
    {
        public OptimisticEntityRepository(DomainManager manager)
            : base(manager)
        { 
        }
    }
}
