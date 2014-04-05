namespace EntityLocks.DAL.Repositories
{
    using EntityLocks.Domain;
    using System;
    using System.Collections.Generic;
    using System.Data;

    internal class PessimisticEntityRepository : EntityRepository<PessimisticEntity>
    {
        public PessimisticEntityRepository(DomainManager manager)
            : base(manager)
        { 
        }

        public override void Save(PessimisticEntity ent)
        {
            Guid? userId = null;
            if (ent.Holder == null)
            {
                userId = null;
            }
            else
            {
                userId = ent.Holder.Id;
            }

            string sql = string.Format(@"UPDATE PessimisticEntity SET Name = '{0}', AdditionalInfo = '{1}', UserId = '{2}' WHERE Id = '{3}'",
                ent.Name, ent.AdditionalInfo, userId, ent.Id);
            this.domainManager.ExecuteNonQuery(sql);
        }

        public override void Delete(Guid entityId)
        {
            string sql = string.Format(@"DELETE FROM PessimisticEntity WHERE Id = '{0}'", entityId);
            this.domainManager.ExecuteNonQuery(sql);
        }

        public override IList<PessimisticEntity> Load()
        {
            var result = new List<PessimisticEntity>();
            using (IDataReader reader = this.domainManager.ExecuteQuery("SELECT * from PessimisticEntity p LEFT JOIN Users u ON p.UserId = u.Id "))
            {
                PessimisticEntity ent;
                while (reader.Read())
                {
                    ent = new PessimisticEntity();
                    this.FillEntityFields(reader, ent);
                    result.Add(ent);
                }
            }

            return result;
        }

        public override PessimisticEntity Load(Guid entityId)
        {
            PessimisticEntity result = new PessimisticEntity();
            using (IDataReader reader = this.domainManager.ExecuteQuery(
                string.Format("SELECT * from PessimisticEntity p LEFT JOIN Users u ON p.UserId = u.Id WHERE p.Id='{0}'", entityId)))
            {
                while (reader.Read())
                {
                    this.FillEntityFields(reader, result);
                }
            }

            return result;
        }

        public override Guid New(PessimisticEntity ent)
        {
            ent.Id = Guid.NewGuid();
            string sql = string.Format(@"INSERT INTO PessimisticEntity (Id, Name, AdditionalInfo) VALUES('{2}', {0}, '{1}')",
                ent.Name, ent.AdditionalInfo, ent.Id.ToString());
            this.domainManager.ExecuteNonQuery(sql);
            return ent.Id;
        }

        public override bool IsExists(PessimisticEntity entity)
        {
            return false;
        }

        private void FillEntityFields(IDataReader reader, PessimisticEntity ent)
        {
            ent.Id = reader.GetGuid(0);
            ent.Name = reader.GetString(1);
            ent.AdditionalInfo = reader.GetString(2);

            if (!reader.IsDBNull(4))
            {
                var guid = reader.GetString(4);
                if (!string.IsNullOrEmpty(guid))
                {
                    ent.Holder = new User()
                    {
                        Id = new Guid(guid),
                        Login = reader.GetString(5)
                    };
                }
            }
        }
    }
}