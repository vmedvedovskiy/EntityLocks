namespace EntityLocks.DAL.Repositories
{
    using EntityLocks.Domain;
    using System;

    internal class PessimisticEntityRepository : EntityRepository<PessimisticEntity>
    {
        public PessimisticEntityRepository(DomainManager manager)
            : base(manager)
        { 
        }
    }
}