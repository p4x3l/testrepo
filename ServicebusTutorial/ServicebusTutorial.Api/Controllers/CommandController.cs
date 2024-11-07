using Azure.Messaging.ServiceBus;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ServicebusTutorial.ServiceBus.Commands;
using System.Text.Json;

namespace ServicebusTutorial.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommandController : ControllerBase
    {
        private readonly ServiceBusClient _serviceBusClient;
        private readonly string _queueName;

        public CommandController(ServiceBusClient serviceBusClient, IOptions<ServiceBusSettings> serviceBusSettings)
        {
            _serviceBusClient = serviceBusClient;
            _queueName = serviceBusSettings.Value.QueueName;
        }

        [HttpGet]
        [Route("first")]
        public async Task<IActionResult> FirstCommand()
        {
            // Create the command instance
            FirstCommand command = new();
            string messageBody = JsonSerializer.Serialize(command);

            // Create a Service Bus message with command details
            ServiceBusMessage message = new(messageBody)
            {
                ApplicationProperties = { { "CommandType", nameof(FirstCommand) } }
            };

            // Send the message to the queue
            ServiceBusSender sender = _serviceBusClient.CreateSender(_queueName);
            await sender.SendMessageAsync(message);

            return Ok(new { message = "Command1 sent to the service bus queue successfully" });
        }

        [HttpGet]
        [Route("second")]
        public async Task<IActionResult> SecondCommand()
        {
            // Create the command instance
            SecondCommand command = new();
            string messageBody = JsonSerializer.Serialize(command);

            // Create a Service Bus message with command details
            ServiceBusMessage message = new(messageBody)
            {
                ApplicationProperties = { { "CommandType", nameof(SecondCommand) } }
            };

            // Send the message to the queue
            ServiceBusSender sender = _serviceBusClient.CreateSender(_queueName);
            await sender.SendMessageAsync(message);

            return Ok(new { message = "Command2 sent to the service bus queue successfully" });
        }

        [HttpGet]
        [Route("firsttopic")]
        public async Task<IActionResult> FirstCommandTopic()
        {
            // Create the command instance
            FirstCommand command = new();
            string messageBody = JsonSerializer.Serialize(command);

            // Create a Service Bus message with command details
            ServiceBusMessage message = new(messageBody)
            {
                ApplicationProperties = { { "CommandType", nameof(FirstCommand) } }
            };

            // Send the message to the queue
            ServiceBusSender sender = _serviceBusClient.CreateSender(command.TopicName);
            await sender.SendMessageAsync(message);

            return Ok(new { message = "Command1 sent to the service bus topic successfully" });
        }

        [HttpGet]
        [Route("secondtopic")]
        public async Task<IActionResult> SecondCommandTopic()
        {
            // Create the command instance
            SecondCommand command = new();
            string messageBody = JsonSerializer.Serialize(command);

            // Create a Service Bus message with command details
            ServiceBusMessage message = new(messageBody)
            {
                ApplicationProperties = { { "CommandType", nameof(SecondCommand) } }
            };

            // Send the message to the queue
            ServiceBusSender sender = _serviceBusClient.CreateSender(command.TopicName);
            await sender.SendMessageAsync(message);

            return Ok(new { message = "Command2 sent to the service bus topic successfully" });
        }
    }
}
