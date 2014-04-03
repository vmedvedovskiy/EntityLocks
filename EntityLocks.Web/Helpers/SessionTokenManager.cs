namespace EntityLocks.Web.Helpers
{
    using EntityLocks.Web.Models;
    using System.Collections.Generic;

    public class SessionTokenManager
    {
        private IDictionary<string, UserModel> tokens;
        private static SessionTokenManager instance;
        private static volatile object @lock = new object();

        private SessionTokenManager()
        {
            this.tokens = new Dictionary<string, UserModel>();
        }

        static SessionTokenManager()
        {
 
        }

        public static SessionTokenManager Instance
        {
            get 
            {
                if (instance == null)
                {
                    lock (@lock) 
                    {
                        if (instance == null)
                        {
                            instance = new SessionTokenManager();
                        }
                    }
                }

                return instance;
            }
        }

        public IDictionary<string, UserModel> Tokens
        {
            get
            {
                return this.tokens;
            }
        }
    }
}