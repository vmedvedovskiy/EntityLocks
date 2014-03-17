namespace EntityLocks.Web.Base
{
    using EntityLocks.Domain.Base;
    using AutoMapper;

    public class BaseEntityModel<T> where T: Entity
    {
        private T entity;

        public BaseEntityModel(T entity)
        {
            this.entity = entity;
            this.MapToModel();
        }

        public T Entity { get { return Mapper.Map(this, this.entity); } }

        private void MapToModel()
        {
            Mapper.Map(this.entity, this);
        }
    }
}
