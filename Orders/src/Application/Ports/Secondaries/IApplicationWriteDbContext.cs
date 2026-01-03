using Microsoft.EntityFrameworkCore;
using Sva.Orders.Domain.Entities;       

namespace Sva.Orders.Application.Ports.Secondaries;

public interface IApplicationWriteDbContext
{
    DbSet<TodoList> TodoLists { get; }

    DbSet<TodoItem> TodoItems { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}