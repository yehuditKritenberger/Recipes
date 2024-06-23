namespace RecipeApi.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Adress { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public User(int id, string name, string adress, string email, string password)
        {
            Id = id;
            Name = name;
            Adress = adress;
            Email = email;
            Password = password;
        }

        public override bool Equals(object? obj)
        {
            return obj is User user &&
                   Id == user.Id &&
                   Name == user.Name &&
                   Adress == user.Adress &&
                   Email == user.Email &&
                   Password == user.Password;
        }
    }
}
