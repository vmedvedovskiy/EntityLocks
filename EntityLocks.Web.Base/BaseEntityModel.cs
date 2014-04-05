namespace EntityLocks.Web.Base
{
    using AutoMapper;
    using EntityLocks.Domain.Base;
    using System;

    public class BaseEntityModel<T> where T : Entity, new()
    {
        protected T entity;

        public Guid Id { get; set; }

        public BaseEntityModel()
        {
            this.entity = new T();
        }

        public BaseEntityModel(T entity)
        {
            this.entity = entity ?? new T();
            this.MapToModel();
        }

        public T GetEntity()
        {
            return (T)Mapper.Map(this, this.entity, this.GetType(), this.entity.GetType());
        }

        protected void MapToModel()
        {
            Mapper.Map(this.entity, this);
        }
    }
}
