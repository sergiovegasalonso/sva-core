using Sva.Orders.Domain.ValueObjects;
using Sva.Shared.Domain;

namespace Sva.Orders.Domain.Entities;

public class TodoList : BaseAuditableEntity<int>
{
    public string? Title { get; set; }

    public Colour Colour { get; set; } = Colour.White;
}