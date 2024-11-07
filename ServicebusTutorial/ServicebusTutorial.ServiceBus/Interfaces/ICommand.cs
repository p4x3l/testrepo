namespace ServicebusTutorial.ServiceBus.Interfaces;

public interface ICommand
{
    Task ExecuteAsync();
}
