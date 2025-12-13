using ECommerce_Platform.Data;
using ECommerce_Platform.Models;
using ECommerce_Platform.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Microsoft.Identity.Client;

namespace ECommerce_Platform.Controllers;

public class ProductController(AppDbContext appDbContext) : Controller
{
    public IActionResult Products()
    {
        return View();
    }
}
