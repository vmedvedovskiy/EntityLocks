namespace EntityLocks.Domain
{
    using EntityLocks.Domain.Base;

    public class User: Entity
    {
        public string Login { get; set; }

        public string Password { get; set; }
    }
}
