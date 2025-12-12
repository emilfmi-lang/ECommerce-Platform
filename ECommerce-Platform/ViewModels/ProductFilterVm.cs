using ECommerce_Platform.Models;

namespace ECommerce_Platform.ViewModels;

public class ProductFilterVm
{
    public int? CategoryId { get; set; }
    public decimal? Price { get; set; }
    public string? Sort { get; set; }
    public List<Product>? Products { get; set; }
    public List<Category>? Categories { get; set; }
}
