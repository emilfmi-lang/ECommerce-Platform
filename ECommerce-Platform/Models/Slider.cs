using ECommerce_Platform.Models.Common;

namespace ECommerce_Platform.Models;

public class Slider: BaseEntity
{
    public string Title { get; set; }
    public string SubTitle { get; set; }
    public string ButtonText { get; set; }

}
