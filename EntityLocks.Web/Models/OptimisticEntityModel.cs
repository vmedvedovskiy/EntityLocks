namespace EntityLocks.Web.Models
{
    using EntityLocks.Domain;
    using EntityLocks.Web.Base;

    public class OptimisticEntityModel: BaseEntityModel<OptimisticEntity>
    {
        public OptimisticEntityModel(OptimisticEntity ent)
            : base(ent)
        { }

        public int ObjectsCount { get; set; }

        public string Notes { get; set; }

        public int Version { get; set; }
    }
}