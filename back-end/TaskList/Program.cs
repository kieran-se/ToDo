using TaskList.Services;
using TaskList.Services.Implementation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var CorsName = "allowCors";

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ITodoService, Todoservice>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CorsName,
                      builder =>
                      {
                          builder.AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowAnyOrigin();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(CorsName);

app.UseAuthorization();

app.MapControllers();

app.Run();
