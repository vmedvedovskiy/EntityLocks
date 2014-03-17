
namespace EntityLocks.DAL
{
    using EntityLocks.DAL.Repositories;
    using EntityLocks.Domain;
    using EntityLocks.Domain.Base;
    using System;

    public class EntityRepositoryFactory
    {
        private static readonly object syncRoot = null;
        private DomainManager domainManager;
        private static EntityRepositoryFactory instance;

        EntityRepositoryFactory()
        {
            this.domainManager = new DomainManager();
        }

        static EntityRepositoryFactory()
        {

        }

        public static EntityRepositoryFactory Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (syncRoot)
                    {
                        if (instance == null)
                        {
                            instance = new EntityRepositoryFactory();
                        }
                    }
                }

                return instance;
            }
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
                result = new EntityRepository<User>(this.domainManager);
            }

            return result;
        }
    }
}
