namespace EntityLocks.DAL
{
    using EntityLocks.Domain.Base;
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Handles database operations.
    /// </summary>
    internal class DomainManager
    {
        /// <summary>
        /// Loads a list of entites.
        /// </summary>
        /// <returns>List of all entities of given type in database</returns>
        public IList<Entity> Load(Type entityType)
        {
            return null;
        }

        /// <summary>
        /// Loads a single entity.
        /// </summary>
        /// <returns>Single Entity</returns>
        public Entity Load(Type entityType, Guid entityId)
        {
            return null;
        }

        /// <summary>
        /// Save an entity.
        /// </summary>
        /// <param name="ent"></param>
        public void Save(Entity ent)
        {
            
        }

        /// <summary>
        /// Deletes an entity.
        /// </summary>
        /// <param name="entityId">Entity that needs to be deleted</param>
        public void Delete(Entity ent)
        {

        }
    }
}
