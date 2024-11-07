using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ServicebusTutorial.ServiceBus.CommandHandlers;
using ServicebusTutorial.ServiceBus.Commands;
using ServicebusTutorial.ServiceBus.Interfaces;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices(services =>
    {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();
        services.AddTransient<ICommandHandler<FirstCommand>, FirstCommandHandler>();
        services.AddTransient<ICommandHandler<SecondCommand>, SecondCommandHandler>();
    })
    .Build();

host.Run();
