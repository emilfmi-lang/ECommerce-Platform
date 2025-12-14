using ECommerce_Platform.Data;
using ECommerce_Platform.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerce_Platform.Controllers
{
    public class HomeController(AppDbContext appDbContext) : Controller
    {
        public IActionResult Index()
        {
            var sliders = appDbContext.Sliders.ToList();
            var homeVm = new HomeVm
            {
                Sliders = sliders
            };
            return View(homeVm);
        }
        public IActionResult Product()
        {
            var products = appDbContext.Products.
                Include(x => x.Category).
                ToList();
            return View();
        }
    }
}
