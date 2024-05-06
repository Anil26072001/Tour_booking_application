using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TourBooking_WebApi.Data;
using TourBooking_WebApi.Repositry;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<ApplicationDBContext>
(Options => Options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection1")));

builder.Services.AddScoped<TourRepositary>();

builder.Services.AddControllers()
.AddOData(option => option.Select().Filter().Count().OrderBy().Expand()) ;





var MyAllowSpecificOrgins = "_myAllowSpecificOrgins";
builder.Services.AddCors(Options =>
{
    Options.AddPolicy(name: MyAllowSpecificOrgins,

    Policy =>
    {
        Policy.WithOrigins("https://localhost:7072")
      .AllowAnyHeader()
      .AllowAnyMethod();

    });
});



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


app.UseRouting();
app.MapControllers();
app.MapControllerRoute(
    name: " default",
    pattern: "{controller}/{action}/{id?}");
 app.UseCors(MyAllowSpecificOrgins);
app.Run();
