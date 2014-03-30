﻿namespace EntityLocks.Web.Base
{
    using AutoMapper;
    using EntityLocks.Domain.Base;

    public class BaseEntityModel<T> where T : Entity, new()
    {
        private T entity;

        public BaseEntityModel(T entity)
        {
            this.entity = entity ?? new T();
            this.MapToModel();
        }

        public T GetEntity()
        {
            return (T)Mapper.Map(this, this.entity, this.GetType(), this.entity.GetType());
        }

        private void MapToModel()
        {
            Mapper.Map(this.entity, this);
        }
    }
}
