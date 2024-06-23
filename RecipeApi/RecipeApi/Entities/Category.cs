namespace RecipeApi.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string IconPath { get; set; }

        public Category(int id, string name, string iconPath)
        {
            Id = id;
            Name = name;
            IconPath = iconPath;
        }
    }
}
