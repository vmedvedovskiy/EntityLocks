﻿
namespace EntityLocks.DAL
{
    using EntityLocks.Domain.Base;
    using System;
    using System.Collections.Generic;

    public abstract class EntityRepository<T> : IEntityRepository<T> where T : Entity
    {
        protected DomainManager domainManager;

        public EntityRepository(DomainManager manager)
        {
            this.domainManager = manager;
        }

        #region Methods

        /// <summary>
        /// Loads a list of entites.
        /// </summary>
        /// <returns>List of all entities of given type in database</returns>
        public abstract IList<T> Load();

        /// <summary>
        /// Loads a single entity.
        /// </summary>
        /// <returns>Single Entity</returns>
        public abstract T Load(Guid entityId);

        /// <summary>
        /// Save an entity.
        /// </summary>
        /// <param name="ent"></param>
        public abstract void Save(T ent);

        public abstract Guid New(T ent);

        /// <summary>
        /// Deletes an entity.
        /// </summary>
        /// <param name="entityId">Entity that needs to be deleted</param>
        public abstract void Delete(Guid entityId);

        /// <summary>
        /// Checks if there is the same entity in database
        /// </summary>
        /// <param name="entity">Entity to check</param>
        /// <returns>True, if this entity exists</returns>
        public abstract bool IsExists(T entity);

        #endregion
    }
}
