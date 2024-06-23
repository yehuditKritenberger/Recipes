using Microsoft.AspNetCore.Mvc;
using RecipeApi.Entities;

namespace RecipeApi.Controllers
{
    [ApiController]
    [Route("recipe")]

    public class RecipeController : Controller
    {
        public static List<Recipe> recipes = new List<Recipe>()
        {
             new Recipe(1, "Daily Fresh", 4, 30, 1, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish", "Successfully!" }, 1, "../../../assets/images/01.jpg"),
             new Recipe(2, "Daily Fresh", 4, 30, 1, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish", "Successfully!" }, 2, "../../../assets/images/02.jpg"),
             new Recipe(3, "Daily Fresh", 4, 60, 2, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish", "Successfully!" }, 1, "../../../assets/images/03.jpg"),
             new Recipe(4, "Daily Fresh", 4, 50, 2, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish", "Successfully!" }, 3, "../../../assets/images/04.jpg"),
             new Recipe(5, "Daily Fresh", 4, 12, 1, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish", "Successfully!" }, 1, "../../../assets/images/05.jpg"),
             new Recipe(6, "Daily Fresh", 4, 60, 3, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish", "Successfully!" }, 3, "../../../assets/images/06.jpg"),
             new Recipe(7, "Daily Fresh", 4, 60, 3, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish", "Successfully!" }, 4, "../../../assets/images/07.jpg"),
             new Recipe(8, "Daily Fresh", 4, 80, 3, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish", "Successfully!" }, 3, "../../../assets/images/08.jpg"),
             new Recipe(9, "Daily Fresh", 4, 90, 3, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish", "Successfully!" }, 1, "../../../assets/images/09.jpg"),
             new Recipe(10, "Daily Fresh", 4, 40, 2, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish", "Successfully!" }, 3, "../../../assets/images/10.jpg"),
             new Recipe(11, "Daily Fresh", 4, 40, 2, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish", "Successfully!" }, 1, "../../../assets/images/11jpg"),
             new Recipe(12, "Daily Fresh", 4, 60, 4, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish", "Successfully!" }, 4, "../../../assets/images/12.jpg"),
             new Recipe(13, "Daily Fresh", 4, 100, 4, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish!", "Successfully!" }, 4, "../../../assets/images/13.jpg"),
             new Recipe(14, "Daily Fresh", 4, 30, 2, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish!", "Successfully!" }, 3, "../../../assets/images/14.jpg"),
             new Recipe(15, "Daily Fresh", 4, 50, 3, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish!", "Successfully!" }, 4, "../../../assets/images/15.jpg"),
             new Recipe(16, "Daily Fresh", 4, 30, 1, DateTime.Now, new List<string>() { "Chocolate", "Eggs", "Baking powder", "Sugar", "Whipping cream" }, new List<string>() { "Put the ingredients into the bowl", "Mix vigorously until a uniform texture is obtained", "Pour into a large baking dish or a special dish!", "Successfully!" }, 2, "../../../assets/images/16.jpg"),
             };
        [HttpGet]
        public IEnumerable<Recipe> Get()
        {
            return recipes;
        }

        [HttpPost]
        [Route("Add_Recipe")]
        public bool Post([FromBody] Recipe recipe)
        {
            if (recipes.Where(x => x.Equals(recipe)).Any())
                return false;
            recipes.Add(recipe);
            return true;
        }

        [HttpGet]
        [Route("id")]
        public Recipe GetById(int id)
        {
            return recipes.Where((r) => r.Id == id).FirstOrDefault();
        }

        [HttpDelete]
        [Route("id")]
        public void DeleteById(int id)
        {
            recipes.Remove(recipes.Where((r) => r.Id == id).FirstOrDefault());
        }

        [HttpPut]
        [Route("id")]
        public void PutById([FromBody] Recipe recipe, int id)
        {
            Recipe updateRecipe = recipes.Where((r) => r.Id == id).FirstOrDefault();
            updateRecipe = recipe;
        }
    }
}
