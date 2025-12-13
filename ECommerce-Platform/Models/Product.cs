using ECommerce_Platform.Models.Common;

namespace ECommerce_Platform.Models;

public class Product : BaseEntity
{
    public string Title { get; set; }
    public string ShortDescription { get; set; }
    public string Price { get; set; }
    public string ButtonText { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }
    public string ImageUrl { get; set; }

}
