using Microsoft.EntityFrameworkCore;
using Sva.Orders.Domain.Entities;       

namespace Sva.Orders.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<TodoList> TodoLists { get; }

    DbSet<TodoItem> TodoItems { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}