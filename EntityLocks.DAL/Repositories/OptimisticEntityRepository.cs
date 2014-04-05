namespace EntityLocks.DAL.Repositories
{
    using EntityLocks.Domain;
    using System;
    using System.Collections.Generic;
    using System.Data;

    internal sealed class OptimisticEntityRepository : EntityRepository<OptimisticEntity>
    {
        public OptimisticEntityRepository(DomainManager manager)
            : base(manager)
        {
        }

        public override Guid New(OptimisticEntity ent)
        {
            ent.Version = 1;
            ent.Id = Guid.NewGuid();
            string sql = string.Format(@"INSERT INTO OptimisticEntity (Id, ObjectsCount, Notes, Version) VALUES('{3}', {0}, '{1}', {2})",
                ent.ObjectsCount, ent.Notes, ent.Version, ent.Id.ToString());
            this.domainManager.ExecuteNonQuery(sql);
            return ent.Id;
        }

        public override IList<OptimisticEntity> Load()
        {
            var result = new List<OptimisticEntity>();
            using (IDataReader reader = this.domainManager.ExecuteQuery("SELECT * from OptimisticEntity"))
            {
                OptimisticEntity ent;
                while (reader.Read())
                {
                    ent = new OptimisticEntity();
                    this.FillEntityFields(reader, ent);
                    result.Add(ent);
                }
            }

            return result;
        }

        // TODO try/catch
        public override OptimisticEntity Load(Guid entityId)
        {
            OptimisticEntity result = new OptimisticEntity();
            using (IDataReader reader = this.domainManager.ExecuteQuery(
                string.Format("SELECT * from OptimisticEntity WHERE Id='{0}'", entityId)))
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
            string sql = string.Format(@"DELETE FROM OptimisticEntity WHERE Id = '{0}'", entityId);
            this.domainManager.ExecuteNonQuery(sql);
        }

        public override void Save(OptimisticEntity ent)
        {
            ent.Version += 1;
            string sql = string.Format(@"UPDATE OptimisticEntity SET ObjectsCount = {0}, Notes = '{1}', Version = {2} WHERE Id = '{3}'", 
                ent.ObjectsCount, ent.Notes, ent.Version, ent.Id);
            this.domainManager.ExecuteNonQuery(sql);
        }

        public override bool IsExists(OptimisticEntity entity)
        {
            return false;
        }

        private void FillEntityFields(IDataReader reader, OptimisticEntity ent)
        {
            ent.Id = reader.GetGuid(0);
            ent.ObjectsCount = reader.GetInt32(1);
            ent.Notes = reader.GetString(2);
            ent.Version = reader.GetInt32(3);
        }

    }
}
