using ECommerce_Platform.Data;
using ECommerce_Platform.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce_Platform.Controllers;

public class ProductController(AppDbContext appDbContext) : Controller
{
    public IActionResult Index(int? categoryId, string? price,string? sort)
    {
        var vm = new ProductFilterVm();
        var query = appDbContext.Products.AsQueryable();
        if (categoryId is not null && categoryId != 0)
        {
            query = query.Where(p => p.CategoryId == categoryId);
        }
        if (!string.IsNullOrEmpty(price ))
        {
            var parts = price.Split('-');
            decimal min = Convert.ToDecimal(parts[0]);
            decimal max = Convert.ToDecimal(parts[1]);
            query = query.Where(x => x.Price >= min && x.Price <= max);
        }
        //if ()

        return View();
    }
}
