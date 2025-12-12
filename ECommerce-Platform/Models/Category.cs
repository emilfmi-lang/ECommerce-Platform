using ECommerce_Platform.Models.Common;
using System.Net;

namespace ECommerce_Platform.Models;

public class Category:BaseEntity
{
    public string Name { get; set; }
    public List<Product> Products { get; set; }
}
