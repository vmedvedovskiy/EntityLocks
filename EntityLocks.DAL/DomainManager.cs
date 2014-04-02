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
    public class DomainManager
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
        public IDataReader ExecuteQuery(string sqlCommand)
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
        public void ExecuteNonQuery(string sql)
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
        /// Save an entity.
        /// </summary>
        /// <param name="sql"></param>
        public object ExecuteScalarQuery(string sql)
        {
            var result = new object();
            using (SQLiteConnection conn = new SQLiteConnection(this.connectionString))
            {
                using (SQLiteCommand cmd = new SQLiteCommand(sql, conn))
                {
                    cmd.Connection.Open();
                    result = cmd.ExecuteScalar(CommandBehavior.SingleRow);
                }
            }

            return result;
        }
    }
}
