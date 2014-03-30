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
        }

        public override void Delete(Guid entitiyId)
        {
            throw new NotImplementedException();
        }

        public override System.Collections.Generic.IList<PessimisticEntity> Load()
        {
            throw new NotImplementedException();
        }

        public override PessimisticEntity Load(Guid entityId)
        {
            throw new NotImplementedException();
        }

        public override Guid New(PessimisticEntity ent)
        {
            throw new NotImplementedException();
        }
    }
}