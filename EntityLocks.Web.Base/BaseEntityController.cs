namespace EntityLocks.Web.Base
{
    using EntityLocks.DAL;
    using EntityLocks.Domain.Base;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Configuration;
    using System.Web.Http;

    public class BaseEntityController<T, TModel> : ApiController where T: Entity, new() where TModel: BaseEntityModel<T>
    {
        protected IEntityRepository<T> repository;

        public BaseEntityController()
            : base()
        {
            var connectionString = WebConfigurationManager.ConnectionStrings["SQLite"].ToString();
            var erf = new EntityRepositoryFactory(connectionString);
            this.repository = erf.GetByType<T>();
        }

        // GET api/<controller>
        [HttpGet]
        public virtual IEnumerable<TModel> Get()
        {
            return this.repository.Load().Select(x => Activator.CreateInstance(typeof(TModel), x) as TModel);
        }

        // GET api/<controller>/5
        [HttpGet]
        public virtual TModel Get(Guid id)
        {
            return Activator.CreateInstance(typeof(TModel), this.repository.Load(id)) as TModel;
        }

        // POST api/<controller>
        public virtual Guid Post([FromBody]TModel value)
        {
            var ent = value.GetEntity();
            return this.repository.New(ent);
        }

        // PUT api/<controller>/5
        public virtual void Put(string id, [FromBody]TModel value)
        {
            var ent = value.GetEntity();
            ent.Id = new Guid(id);
            this.repository.Save(ent);
        }

        // DELETE api/<controller>/5
        public virtual void Delete(Guid id)
        {
            this.repository.Delete(id);
        }
    }
}
