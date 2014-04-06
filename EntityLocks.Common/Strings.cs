namespace EntityLocks.Common
{
    public class Strings
    {
        #region Messages

        public const string MissingIdMessage = "Entity ID must be specified.";

        public const string MissingRepositoryMessage = "Repository must be created before model creation.";

        public const string ConflictSaving = "Server entity has higher version, try to resolve conflict manually.";

        public const string UserAlreadyExists = "User with this login already exists";

        public const string NoUserInDatabase = "User with specified login is absent.";

        public const string LockedEntity = "This entity is locked somewhere else by {0}.";

	    #endregion    
        
        public const string SessionTokenName = "session";
    }
}
