using ECommerce_Platform.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace ECommerce_Platform.ViewModels;

public class ProductFilterVm
{
    public List<Product> Products { get; set; }
    public List<Category> Categories { get; set; }

    public List<SelectListItem> PriceRanges { get; set; }
    public List<SelectListItem> SortOptions { get; set; }
    public int? SelectedCategoryId { get; set; }
    public string SelectedPriceRange { get; set; }
    public string SelectedSortOption { get; set; }
}
