using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Sva.Orders.Application.Ports;
using Sva.Orders.Domain.Entities;

namespace Sva.Orders.Infrastructure.Adapters.ReadingDatabase;

public class ApplicationReadingDbContext : DbContext, IApplicationReadingDbContext
{
    public ApplicationReadingDbContext(DbContextOptions<ApplicationReadingDbContext> options) : base(options) { }

    public DbSet<TodoList> TodoLists => Set<TodoList>();

    public DbSet<TodoItem> TodoItems => Set<TodoItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}