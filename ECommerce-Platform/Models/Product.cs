using ECommerce_Platform.Models.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace ECommerce_Platform.Models;

public class Product : BaseEntity
{
    public string Name { get; set; }
    public string Title { get; set; }
    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }
    public string ImageUrl { get; set; }
    public string ButtonText { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }
}
