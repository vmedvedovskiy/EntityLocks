namespace EntityLocks.Domain
{
    using EntityLocks.Domain.Base;

    public class User: Entity
    {
        public string Login { get; set; }

        public string PasswordHash { get; set; }
    }
}
