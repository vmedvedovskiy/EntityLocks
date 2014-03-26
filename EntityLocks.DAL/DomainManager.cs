namespace EntityLocks.DAL
{
    using EntityLocks.Domain.Base;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SQLite;
    using System.Linq;
    using System.Reflection;

    /// <summary>
    /// Handles database operations.
    /// </summary>
    internal class DomainManager
    {
        private string connectionString;

        public DomainManager(string connectionString)
        {
            this.connectionString = connectionString;
        }
        /// <summary>
        /// Loads a list of entites.
        /// </summary>
        /// <returns>List of all entities of given type in database</returns>
        public IList<Entity> Load(Type entityType)
        {
            var result = new List<Entity>();
            string tableName = entityType.Name;
            using (SQLiteConnection conn = new SQLiteConnection(this.connectionString))
            {
                var query = string.Format("Select * from {0}", tableName);
                using (SQLiteCommand cmd = new SQLiteCommand(query, conn))
                {
                    cmd.Connection.Open();
                    using (IDataReader rdr = cmd.ExecuteReader())
                    {

                        PropertyInfo pInfo;
                        object x;
                        while (rdr.Read())
                        {
                            x = Activator.CreateInstance(entityType);
                            for (int i = 0; i < rdr.FieldCount; i++)
                            {
                                var cat = rdr[i];
                                if (cat is Int64)
                                {
                                    cat = Convert.ToInt32((Int64)cat);
                                }

                                pInfo = entityType.GetProperty(rdr.GetName(i), BindingFlags.Instance | BindingFlags.Public | BindingFlags.FlattenHierarchy);
                                pInfo.SetValue(x, cat, null);
                            }

                            result.Add((Entity)x);
                        }
                    }
                }
            }

            return result;
        }

        /// <summary>
        /// Loads a single entity.
        /// </summary>
        /// <returns>Single Entity</returns>
        public Entity Load(Type entityType, int entityId)
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
