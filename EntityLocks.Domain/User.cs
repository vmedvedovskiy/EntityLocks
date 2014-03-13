

namespace EntityLocks.Domain
{
    public class User: Entity
    {
        public string Login { get; set; }

        public string Password { get; set; }
    }
}
