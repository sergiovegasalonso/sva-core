using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Sva.Orders.Application.Ports.Secondaries;
using Sva.Orders.Domain.Entities;

namespace Sva.Orders.Infrastructure.Data;

public class ApplicationDbContext : DbContext, IApplicationReadDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<TodoList> TodoLists => Set<TodoList>();

    public DbSet<TodoItem> TodoItems => Set<TodoItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}