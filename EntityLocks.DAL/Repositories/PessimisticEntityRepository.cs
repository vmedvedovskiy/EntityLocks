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

        public override void Save(PessimisticEntity ent)
        {
            ent.Holder = null;
            base.Save(ent);
        }
    }
}