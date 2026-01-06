namespace Sva.Shared.Domain;

public abstract class BaseEntity<T>
{
    public required T Id { get; set; }
}