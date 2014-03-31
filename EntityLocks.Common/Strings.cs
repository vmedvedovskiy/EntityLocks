namespace EntityLocks.Common
{
    public class Strings
    {
        #region Messages

        public const string MissingIdMessage = "Entity ID must be specified.";

        public const string MissingRepositoryMessage = "Repository must be created before model creation.";

        public const string ConflictSaving = "Server entity has higher version, try to resolver conflict manually.";

        public const string UserAlreadyExists = "User with this login already exists";

	    #endregion    
        
        public const string SessionTokenName = "session";
    }
}
