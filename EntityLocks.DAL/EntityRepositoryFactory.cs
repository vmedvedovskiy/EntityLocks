
namespace EntityLocks.DAL
{
    using EntityLocks.DAL.Repositories;
    using EntityLocks.Domain;
    using EntityLocks.Domain.Base;
    using System;

    public class EntityRepositoryFactory
    {
        private DomainManager domainManager;
        private static EntityRepositoryFactory instance;

        public EntityRepositoryFactory(string connectionString)
        {
            this.domainManager = new DomainManager(connectionString);
        }

        static EntityRepositoryFactory()
        {

        }

        public void Configure(string connectionString)
        {
 
        }

        public IEntityRepository<T> GetByType<T>() where T: Entity
        {
            dynamic result = null;
            if(typeof(T) == typeof(OptimisticEntity))
            {
                result = new OptimisticEntityRepository(this.domainManager);
            }
            else if (typeof(T) == typeof(PessimisticEntity))
            {
                result = new PessimisticEntityRepository(this.domainManager);
            }
            else if (typeof(T) == typeof(User))
            {
                result = new UserRepository(this.domainManager);
            }

            return result;
        }
    }
}
