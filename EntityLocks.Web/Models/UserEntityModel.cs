

namespace EntityLocks.Web.Models
{
    using EntityLocks.Domain;
    using EntityLocks.Web.Base;

    public class UserEntityModel : BaseEntityModel<User>
    {
        public UserEntityModel(User entity):
            base(entity)
        { }

        public string Login { get; set; }

        public string PasswordHash { get; set; }
    }
}