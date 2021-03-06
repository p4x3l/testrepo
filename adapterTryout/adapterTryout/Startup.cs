﻿using System;
using System.Collections.Generic;
using adapterTryout.Contracts;
using adapterTryout.DataAdapter;
using adapterTryout.Services;
using adapterTryout.Settings;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace adapterTryout
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AdapterSettings>(options =>
            {
                options.AdapterName = Configuration.GetSection("Adapter:Name").Value;
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
            });

            services.AddTransient<IAnimalService, AnimalService>();

            services.AddTransient<DogAdapter>();
            services.AddTransient<CatAdapter>();

            services.AddTransient(factory =>
            {
                Func<string, IAnimalAdapter> accesor = key =>
                {
                    switch (key)
                    {
                        case "dog":
                            return factory.GetService<DogAdapter>();
                        case "cat":
                            return factory.GetService<CatAdapter>();
                        default:
                            throw new KeyNotFoundException(); // or maybe return null, up to you
                    }
                };
                return accesor;
            });

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseMvc();
        }
    }
}
