
namespace EntityLocks.DAL
{
    using EntityLocks.Common;
    using EntityLocks.Domain.Base;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;

    internal class EntityRepository<T> : IEntityRepository<T> where T : Entity
    {
        private DomainManager domainManager;

        public EntityRepository(DomainManager manager)
        {
            this.domainManager = manager;
        }

        #region Methods

        /// <summary>
        /// Loads a list of entites.
        /// </summary>
        /// <returns>List of all entities of given type in database</returns>
        public virtual IList<T> Load()
        {
            return this.domainManager.Load(typeof(T)).Cast<T>().ToList();
        }

        /// <summary>
        /// Loads a single entity.
        /// </summary>
        /// <returns>Single Entity</returns>
        public virtual T Load(int entityId)
        {
            if (entityId == null)
            {
                throw new DataException(Strings.MissingIdMessage);
            }

            return (T)this.domainManager.Load(typeof(T), entityId);
        }

        /// <summary>
        /// Save an entity.
        /// </summary>
        /// <param name="ent"></param>
        public virtual void Save(T ent)
        {
            this.domainManager.Save(ent);
        }

        public virtual void New(T ent)
        {
            ent.Id = 0;
            this.Save(ent);
        }

        /// <summary>
        /// Deletes an entity.
        /// </summary>
        /// <param name="entityId">Entity that needs to be deleted</param>
        public virtual void Delete(T ent)
        {
            this.domainManager.Delete(ent);
        }

        #endregion
    }
}
