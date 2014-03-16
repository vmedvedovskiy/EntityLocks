
namespace EntityLocks.DAL
{
    using EntityLocks.DAL.Repositories;
    using EntityLocks.Domain;
    using EntityLocks.Domain.Base;
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
            dynamic result = null;
            if(entityType == typeof(OptimisticEntity))
            {
                result = new OptimisticEntityRepository(this.domainManager);
            }
            else if (entityType == typeof(PessimisticEntity))
            {
                result = new PessimisticEntityRepository(this.domainManager);
            }
            else if (entityType == typeof(User))
            {
                result = new EntityRepository<User>(this.domainManager);
            }

            return result;
        }
    }
}
