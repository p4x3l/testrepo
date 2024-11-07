using ServicebusTutorial.ServiceBus.Commands;
using ServicebusTutorial.ServiceBus.Interfaces;

namespace ServicebusTutorial.ServiceBus.CommandHandlers;

public class SecondCommandHandler : ICommandHandler<SecondCommand>
{
    public async Task HandleAsync(SecondCommand command)
    {
        // Perform the command's logic
        await command.ExecuteAsync();

        // Example: additional processing or business logic can go here
        Console.WriteLine("SecondCommand has been handled successfully.");
    }
}
