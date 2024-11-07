using Azure.Messaging.ServiceBus;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using ServicebusTutorial.ServiceBus.CommandHandlers;
using ServicebusTutorial.ServiceBus.Commands;
using System.Text.Json;

namespace ServicebusTutorial.Servicebus.Command2Function
{
    public class ProcessSecondCommand
    {
        private readonly ILogger<ProcessSecondCommand> _logger;
        private readonly IServiceProvider _serviceProvider;

        public ProcessSecondCommand(ILogger<ProcessSecondCommand> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        [Function(nameof(ProcessSecondCommand))]
        public async Task Run([ServiceBusTrigger("%ServiceBusTopicName%", "%ServiceBusSubscriptionName%", Connection = "ServiceBusConnectionString")] ServiceBusReceivedMessage message)
        {
            _logger.LogInformation("Message ID: {id}", message.MessageId);
            _logger.LogInformation("Message Body: {body}", message.Body);
            _logger.LogInformation("Message Content-Type: {contentType}", message.ContentType);

            try
            {
                SecondCommand command = JsonSerializer.Deserialize<SecondCommand>(message.Body.ToString());

                SecondCommandHandler handler = new();

                // Proceed with the dynamic handling
                await handler.HandleAsync(command);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing the message: {messageId}", message.MessageId);
            }
        }
    }
}
