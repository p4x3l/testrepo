using FB_WebApi.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace FB_WebApi.Services
{
    public class FacebookService : IFacebookService
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly DefaultContractResolver _contractResolver;

        private readonly string appId;
        private readonly string appSecret;

        private readonly string baseUrl;
        private readonly string apiVersion;
        private readonly string pixelId;

        public FacebookService(IConfiguration configuration, IHttpClientFactory clientFactory)
        {
            // Get from settings?
            appId = "2805966193060065";
            appSecret = "989f389770a0819e86216fd9615d781d";

            baseUrl = "https://graph.facebook.com/";
            apiVersion = "v8.0";
            pixelId = "3223765234388297";

            _configuration = configuration;
            _httpClientFactory = clientFactory;
            _contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new SnakeCaseNamingStrategy()
            };
        }

        public async Task<string> GenerateNewToken()
        {
            var client = _httpClientFactory.CreateClient();

            var url = $"{baseUrl}oauth/access_token?client_id={appId}&client_secret={appSecret}&grant_type=client_credentials";

            var response = await client.GetAsync(url);

            response.EnsureSuccessStatusCode();
            var payload = JObject.Parse(await response.Content.ReadAsStringAsync().ConfigureAwait(false));

            var token = payload.Value<string>("access_token");

            return token;
        }

        public async Task<EventsResponse> CreateFacebookEvent(Contact contact, InvoiceItem invoiceItem)
        {
            var token = _configuration.GetValue<string>("Token");
            var client = _httpClientFactory.CreateClient();
            var url = $"{baseUrl}{apiVersion}/{pixelId}/events?access_token={token}";
            var data = new EventRequestData
            {
                Data = new List<Event>
                {
                    new Event
                    {
                        EventName = "Purchase",
                        EventTime = ConvertToUnixTimestamp(DateTime.Now),
                        UserData = new UserData {
                            Em = CreateHash(contact.Email),
                            Ph = CreateHash(contact.MobilePhone),
                            Db = CreateHash(contact.BirthDay.HasValue ? contact.BirthDay.Value.ToString("yyyyMMdd") : null),
                            Ln = CreateHash(contact.LastName),
                            Fn = CreateHash(contact.FirstName),
                            Ct = CreateHash(contact.City),
                            Zp = CreateHash(contact.ZipCode),
                            Country = CreateHash(contact.Country),
                        },
                        CustomData = new CustomData
                        {
                            ContentName = invoiceItem.ArticleName,
                            ContentIds = new List<string> { invoiceItem.Sku },
                            Currency = invoiceItem.LocalCurrency,
                            Value = invoiceItem.NetPrice
                        }
                    }
                }
            };

            var serilizedData = JsonConvert.SerializeObject(data, new JsonSerializerSettings
            {
                ContractResolver = _contractResolver,
                Formatting = Formatting.Indented
            });

            var response = await client.PostAsync(url, new StringContent(serilizedData, Encoding.UTF8, "application/json"));

            response.EnsureSuccessStatusCode();
            var eventData = JsonConvert.DeserializeObject<EventsResponse>(await response.Content.ReadAsStringAsync().ConfigureAwait(false));

            return eventData;
        }

        private int ConvertToUnixTimestamp(DateTime date)
        {
            DateTime origin = DateTime.UnixEpoch;
            TimeSpan diff = date.ToUniversalTime() - origin;
            return Convert.ToInt32(Math.Floor(diff.TotalSeconds));
        }

        private string CreateHash(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                return null;
            }

            var Sb = new StringBuilder();

            using (var hash = SHA256.Create())
            {
                var enc = Encoding.UTF8;
                var result = hash.ComputeHash(enc.GetBytes(value));

                foreach (var b in result)
                    Sb.Append(b.ToString("x2"));
            }

            return Sb.ToString();
        }
    }
}
