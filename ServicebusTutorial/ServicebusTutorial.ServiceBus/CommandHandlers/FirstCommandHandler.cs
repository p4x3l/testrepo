using ServicebusTutorial.ServiceBus.Commands;
using ServicebusTutorial.ServiceBus.Interfaces;

namespace ServicebusTutorial.ServiceBus.CommandHandlers;

public class FirstCommandHandler : ICommandHandler<FirstCommand>
{
    public async Task HandleAsync(FirstCommand command)
    {
        // Perform the command's logic
        await command.ExecuteAsync();

        // Example: additional processing or business logic can go here
        Console.WriteLine("FirstCommand has been handled successfully.");
    }
}
