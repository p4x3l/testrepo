using ServicebusTutorial.ServiceBus.Interfaces;

namespace ServicebusTutorial.ServiceBus.Commands;

public class FirstCommand : ICommand
{
    public string TopicName => "first-command";

    public string Data { get; set; } // Example property

    public async Task ExecuteAsync()
    {
        // Example logic for the command
        Console.WriteLine($"Executing FirstCommand with Data: {Data}");
        await Task.CompletedTask;
    }
}
