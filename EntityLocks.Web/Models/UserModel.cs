namespace EntityLocks.Web.Models
{
    using EntityLocks.Domain;
    using EntityLocks.Web.Base;

    public class UserModel : BaseEntityModel<User>
    {
        public UserModel(User entity):
            base(entity)
        { }

        public string Login { get; set; }

        public string Password { get; set; }
    }
}