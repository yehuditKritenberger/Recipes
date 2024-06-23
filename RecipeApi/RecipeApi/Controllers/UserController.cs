using Microsoft.AspNetCore.Mvc;
using RecipeApi.DTO;
using RecipeApi.Entities;

namespace RecipeApi.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : Controller
    {
        public static List<User> users = new List<User>()
        {
            new User(1,"Tova","T","T@gmail.com","t123"),
            new User(2,"Shira","S","S@gmail.com","s123"),
            new User(3,"Efrat","E","E@gmail.com","e123"),
            new User(4,"Yehudit","Y","Y@gmail.com","y123"),

        };

        [HttpPost]
        [Route("Login")]
        public int Post([FromBody] LoginDTO login)
        {

            if (users.Where(x => x.Name == login.Name && x.Password == login.Password).Any())
                return 0;
            if (users.Where(x => x.Name == login.Name).Any())
                return 1;
            return 2;
        }

        [HttpPost]
        [Route("Register")]
        public bool Post([FromBody] User user)
        {
            if (users.Where(x => x.Equals(user)).Any())
                return false;
            users.Add(user);
            return true;
        }

        [HttpGet]
        [Route("id")]
        public User GetById(int id)
        {
            return users.Where((r) => r.Id == id).FirstOrDefault();
        }
    }
}
