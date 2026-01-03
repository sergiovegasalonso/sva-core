using Sva.Orders.Domain.Common;

namespace Sva.Orders.Domain.Entities;

public class TodoItem : BaseAuditableEntity<int>
{
    public int ListId { get; set; }

    public string? Title { get; set; }
}