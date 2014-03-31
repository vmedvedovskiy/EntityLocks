namespace EntityLocks.DAL.Repositories
{
    using EntityLocks.Domain;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Security.Cryptography;
    using System.Text;

    internal class UserRepository: EntityRepository<User>
    {
        public UserRepository(DomainManager manager)
            : base(manager)
        {
        }

        public override Guid New(User ent)
        {
            ent.Id = Guid.NewGuid();
            var hasher = SHA256.Create();
            var sessionToken = hasher.ComputeHash(Encoding.Default.GetBytes(ent.Login + ent.Password));
            
            string sql = string.Format(@"INSERT INTO Users (Id, Login, Password, Hash) VALUES('{3}', {0}, '{1}', '{2}')",
                ent.Login, ent.Password, Encoding.Default.GetString(sessionToken), ent.Id.ToString());
            this.domainManager.ExecuteNonQuery(sql);
            return ent.Id;
        }

        public override IList<User> Load()
        {
            IList<User> result = new List<User>();
            using (IDataReader reader = this.domainManager.ExecuteQuery("SELECT * from Users"))
            {
                User ent;
                while (reader.Read())
                {
                    ent = new User();
                    this.FillEntityFields(reader, ent);
                    result.Add(ent);
                }
            }

            return result;
        }

        private void FillEntityFields(IDataReader reader, User ent)
        {
            ent.Id = new Guid(reader.GetString(0));
            ent.Login = reader.GetString(1);
            ent.Password = reader.GetString(2);
        }

        // TODO try/catch
        public override User Load(Guid entityId)
        {
            User result = new User();
            using (IDataReader reader = this.domainManager.ExecuteQuery(
                string.Format("SELECT * from Users WHERE Id='{0}'", entityId)))
            {
                while (reader.Read())
                {
                    this.FillEntityFields(reader, result);
                }
            }

            return result;
        }

        public override void Delete(Guid entityId)
        {
            string sql = string.Format(@"DELETE FROM Users WHERE Id = '{0}'", entityId);
            this.domainManager.ExecuteNonQuery(sql);
        }

        public override void Save(User ent)
        {
            string sql = string.Format(@"UPDATE Users SET Login = {0}, Password = '{1}', WHERE Id = '{2}'", 
                ent.Login, ent.Password, ent.Id);
            this.domainManager.ExecuteNonQuery(sql);
        }

        public override bool IsExists(User entity)
        {
            string sql = string.Format(@"SELECT COUNT(*) FROM Users WHERE Login = '{0}'", entity.Login);
            return (Int64)this.domainManager.ExecuteScalarQuery(sql) > 0;
        }

        public bool IsAutohorized(string sessionToken)
        {
            string sql = string.Format(@"SELECT COUNT(*) FROM Users WHERE Hash = '{0}'", sessionToken);
            return (Int64)this.domainManager.ExecuteScalarQuery(sql) > 0;
        }
    }
}
