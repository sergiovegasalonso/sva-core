using Sva.Shared.Domain;
using Sva.Orders.Domain.ValueObjects;

namespace Sva.Orders.Domain.Entities;

public class TodoList : BaseAuditableEntity<int>
{
    public string? Title { get; set; }

    public Colour Colour { get; set; } = Colour.White;
}