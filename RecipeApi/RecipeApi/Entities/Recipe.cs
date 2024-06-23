namespace RecipeApi.Entities
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public int PreparationTime { get; set; }
        public int Level { get; set; }
        public DateTime Date { get; set; }
        public List<string> Ingredients { get; set; }
        public List<string> Instructions { get; set; }
        public int UserId { get; set; }
        public string Img { get; set; }

        public Recipe(int id, string name, int categoryId, int preparationTime, int level, DateTime date, List<string> ingredients, List<string> instructions, int userId, string img)
        {
            Id = id;
            Name = name;
            CategoryId = categoryId;
            PreparationTime = preparationTime;
            Level = level;
            Date = date;
            Ingredients = ingredients;
            Instructions = instructions;
            UserId = userId;
            Img = img;
        }

        public override bool Equals(object? obj)
        {
            return obj is Recipe recipe &&
                   Id == recipe.Id &&
                   Name == recipe.Name &&
                   CategoryId == recipe.CategoryId &&
                   PreparationTime == recipe.PreparationTime &&
                   Level == recipe.Level &&
                   Date == recipe.Date &&
                   EqualityComparer<List<string>>.Default.Equals(Ingredients, recipe.Ingredients) &&
                   EqualityComparer<List<string>>.Default.Equals(Instructions, recipe.Instructions) &&
                   UserId == recipe.UserId &&
                   Img == recipe.Img;
        }
    }
}
