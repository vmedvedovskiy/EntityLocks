
namespace EntityLocks.DAL
{
    using EntityLocks.Domain.Base;
    using System;
    using System.Collections.Generic;

    public interface IEntityRepository<T> where T : Entity
    {
        /// <summary>
        /// Loads a list of entites.
        /// </summary>
        /// <returns>List of all entities of given type in database</returns>
        IList<T> Load();

        /// <summary>
        /// Loads a single entity.
        /// </summary>
        /// <returns>Single Entity</returns>
        T Load(Guid entityId);

        /// <summary>
        /// Save an existing entity.
        /// </summary>
        /// <param name="ent"></param>
        void Save(T ent);

        /// <summary>
        /// Creates a new entity.
        /// </summary>
        /// <param name="ent"></param>
        Guid New(T ent);

        /// <summary>
        /// Deletes an entity.
        /// </summary>
        /// <param name="entityId">Entity that needs to be deleted</param>
        void Delete(Guid entityId);

        /// <summary>
        /// Checks if there is the same entity in database
        /// </summary>
        /// <param name="entity">Entity to check</param>
        /// <returns>True, if this entity exists</returns>
        bool IsExists(T entity);
    }
}
