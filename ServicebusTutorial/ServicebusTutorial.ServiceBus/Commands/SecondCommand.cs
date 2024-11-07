using ServicebusTutorial.ServiceBus.Interfaces;

namespace ServicebusTutorial.ServiceBus.Commands;

public class SecondCommand : ICommand
{
    public string TopicName => "second-command";
    
    public string Data { get; set; } // Example property

    public async Task ExecuteAsync()
    {
        // Example logic for the command
        Console.WriteLine($"Executing SecondCommand with Data: {Data}");
        await Task.CompletedTask;
    }
}
