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

        public override void New(OptimisticEntity ent)
        {
            ent.Version = 1;
            base.New(ent);
        }
    }
}
