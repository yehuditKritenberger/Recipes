using Microsoft.AspNetCore.Mvc;
using RecipeApi.Entities;

namespace RecipeApi.Controllers
{
    [ApiController]
    [Route("Category")]
    public class CategoryController : Controller
    {

        public static List<Category> categories = new List<Category>()
        {
            new Category(1,"Many Flours","../../../assets/images/01.jpg"),
            new Category(2,"Sweet Taste","../../../assets/images/02.jpg"),
            new Category(3,"Ice Cream","../../../assets/images/03.jpg"),
            new Category(4,"Daily Fresh","../../../assets/images/04.jpg"),
        };
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return categories;
        }
        [HttpGet]
        [Route("id")]
        public Category GetById(int id)
        {
            return categories.Where((r) => r.Id == id).FirstOrDefault();
        }
    }
}
