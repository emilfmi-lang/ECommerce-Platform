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
            var products = appDbContext.Products.
                Include(x => x.Category).
                ToList();
            var homeVm = new HomeVm
            {
                Sliders = sliders,
                Products = products
            };
            return View(homeVm);
        }
        public IActionResult Productss()
        {
            var products = appDbContext.Products.
               Include(x => x.Category).
               ToList();
            var homeVm = new HomeVm
            {
                Products = products
            };
            return View(homeVm);
        }
    }
}
