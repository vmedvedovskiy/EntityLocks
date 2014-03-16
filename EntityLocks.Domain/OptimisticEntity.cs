using EntityLocks.Domain.Base;
namespace EntityLocks.Domain
{
    public class OptimisticEntity : Entity
    {
        public int ObjectsCount { get; set; }

        public string Notes { get; set; }
    }
}
