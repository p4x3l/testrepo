using System.Text.Json;
using Azure.Messaging.ServiceBus;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using ServicebusTutorial.ServiceBus.Interfaces;

namespace ServicebusTutorial.Servicebus.Function
{
    public class ProcessServiceBusCommand
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<ProcessServiceBusCommand> _logger;

        public ProcessServiceBusCommand(IServiceProvider serviceProvider, ILogger<ProcessServiceBusCommand> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        [Function(nameof(ProcessServiceBusCommand))]
        public async Task Run([ServiceBusTrigger("%ServiceBusQueueName%", Connection = "ServiceBusConnectionString")] ServiceBusReceivedMessage message)
        {
            _logger.LogInformation("Message ID: {id}", message.MessageId);
            _logger.LogInformation("Message Body: {body}", message.Body.ToString());
            _logger.LogInformation("Message Content-Type: {contentType}", message.ContentType);

            try
            {
                // Assuming the message includes a "CommandType" property for routing
                if (message.ApplicationProperties.TryGetValue("CommandType", out var commandTypeObj))
                {
                    var commandType = commandTypeObj.ToString();
                    var type = Type.GetType($"ServicebusTutorial.ServiceBus.Commands.{commandType}, ServicebusTutorial.ServiceBus");

                    if (type == null)
                    {
                        _logger.LogError("Command type {commandType} not found", commandType);
                        return;
                    }

                    // Deserialize the message body into the correct command type
                    var command = JsonSerializer.Deserialize(message.Body.ToString(), type) as ICommand;

                    if (command == null)
                    {
                        _logger.LogError("Failed to deserialize the message to the specified command type: {commandType}", type.FullName);
                        return; // Or handle the error as needed
                    }

                    var handlerType = typeof(ICommandHandler<>).MakeGenericType(type);
                    var handler = _serviceProvider.GetService(handlerType);

                    if (handler == null)
                    {
                        _logger.LogError("No handler found for command type: {commandType}", type.FullName);
                        return; // Exit early if no handler is found
                    }

                    // Proceed with the dynamic handling
                    await ((dynamic)handler).HandleAsync((dynamic)command);
                }
                else
                {
                    _logger.LogError("CommandType property not found in message.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing the message: {messageId}", message.MessageId);
            }
        }
    }
}
