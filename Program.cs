using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.FileProviders.Physical;
using word_def.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DatabaseContext>(o => o.UseSqlite((@"Data Source=WordDB.db")));

builder.Services.AddAuthentication("CookieAuth").AddCookie("CookieAuth", options =>
{
    options.Cookie.Name = "CookieAuth";
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
    options.Cookie.MaxAge = options.ExpireTimeSpan;
    options.SlidingExpiration = true;
    options.Events.OnRedirectToLogin = async ctx =>
    {
        ctx.Response.StatusCode = 401;
        return;
    };
});

var app = builder.Build();

app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapWhen(ctx => !ctx.Request.Path.Value.StartsWith("/api") && !ctx.Request.Path.Value.StartsWith("/auth"), spa => {
    spa.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "client/build")),
        RequestPath = ""
    });

    spa.Run(async ctx => {
        var fi = new FileInfo(Path.Combine(builder.Environment.ContentRootPath, "client/build/index.html"));

        await ctx.Response.SendFileAsync(new PhysicalFileInfo(fi));
        await ctx.Response.CompleteAsync();
    });
});

app.MapControllers();

app.Run();

