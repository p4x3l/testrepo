namespace ServicebusTutorial.ServiceBus.Interfaces;

public interface ICommandHandler<TCommand> where TCommand : ICommand
{
    Task HandleAsync(TCommand command);
}
