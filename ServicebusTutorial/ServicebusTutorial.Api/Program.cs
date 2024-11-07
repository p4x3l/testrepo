using Azure.Messaging.ServiceBus;
using Microsoft.Extensions.Options;
using ServicebusTutorial.Api;
using ServicebusTutorial.ServiceBus.CommandHandlers;
using ServicebusTutorial.ServiceBus.Commands;
using ServicebusTutorial.ServiceBus.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<ServiceBusSettings>(builder.Configuration.GetSection("ServiceBus"));

// Register the ServiceBusClient as a singleton
builder.Services.AddSingleton(serviceProvider =>
{
    var serviceBusSettings = serviceProvider.GetRequiredService<IOptions<ServiceBusSettings>>().Value;
    return new ServiceBusClient(serviceBusSettings.ConnectionString);
});

builder.Services.AddSingleton<ICommandHandler<FirstCommand>, FirstCommandHandler>();
builder.Services.AddSingleton<ICommandHandler<SecondCommand>, SecondCommandHandler>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
