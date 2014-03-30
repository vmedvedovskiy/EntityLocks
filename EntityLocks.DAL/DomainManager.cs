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
        /// <param name="sqlCommand"></param>
        /// <returns></returns>
        public IDataReader Load(string sqlCommand)
        {
            // without using statement, because callee of this method will use IDataReader
            SQLiteConnection conn = new SQLiteConnection(this.connectionString);
            SQLiteCommand cmd = new SQLiteCommand(sqlCommand, conn);
            cmd.Connection.Open();
            return cmd.ExecuteReader();
        }

        /// <summary>
        /// Save an entity.
        /// </summary>
        /// <param name="sql"></param>
        public void Save(string sql)
        {
            using (SQLiteConnection conn = new SQLiteConnection(this.connectionString))
            {
                using (SQLiteCommand cmd = new SQLiteCommand(sql, conn))
                {
                    cmd.Connection.Open();
                    cmd.ExecuteNonQuery(CommandBehavior.SingleRow);
                }
            }          
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
