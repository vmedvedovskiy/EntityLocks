
namespace EntityLocks.DAL
{
    using EntityLocks.DAL.Repositories;
    using EntityLocks.Domain;
    using System;

    public class EntityRepositoryFactory
    {
        private DomainManager domainManager;

        public EntityRepositoryFactory()
        {
            this.domainManager = new DomainManager();
        }

        public IEntityRepository<T> GetByType<T>(Type entityType) where T: Entity
        {
            IEntityRepository<T> result = null;
            if(entityType == typeof(OptimisticEntity))
            {
                var rep = new OptimisticEntityRepository(this.domainManager);
                result = (IEntityRepository<T>)rep;
            }

            return result;
        }
    }
}
