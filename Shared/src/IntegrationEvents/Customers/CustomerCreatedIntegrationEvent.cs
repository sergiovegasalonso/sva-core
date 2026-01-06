namespace Sva.Shared.IntegrationEvents.Customers;

public record CustomerCreatedIntegrationEvent(
    Guid CustomerId,
    string FullName,
    string Email);
