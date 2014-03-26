namespace EntityLocks.Web.Base
{
    using EntityLocks.DAL;
    using EntityLocks.Domain.Base;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;

    public class BaseEntityController<T, TModel> : ApiController where T: Entity where TModel: BaseEntityModel<T>
    {
        private IEntityRepository<T> repository;

        public BaseEntityController()
            : base()
        {
            this.repository = EntityRepositoryFactory.Instance.GetByType<T>();
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
        public virtual void Post([FromBody]TModel value)
        {
        }

        // PUT api/<controller>/5
        public virtual void Put(int id, [FromBody]TModel value)
        {
        }

        // DELETE api/<controller>/5
        public virtual void Delete(Guid id)
        {
        }
    }
}
