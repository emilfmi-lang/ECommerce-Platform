using ECommerce_Platform.Data;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce_Platform.Controllers;

public class ProductController(AppDbContext appDbContext) : Controller
{
    public IActionResult Products()
    {
        return View();
    }
}
