using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using adapterTryout.Contracts;
using adapterTryout.Models;
using adapterTryout.Settings;
using Microsoft.Extensions.Options;

namespace adapterTryout.Services
{
    public class AnimalService : IAnimalService
    {
        private readonly string _adapterName;
        private readonly Func<string, IAnimalAdapter> _adapter;
        public AnimalService(IOptions<AdapterSettings> settings, Func<string, IAnimalAdapter> adapter)
        {
            _adapterName = settings.Value.AdapterName;
            _adapter = adapter;
        }

        public IEnumerable<Animal> GetAll()
        {
            return _adapter(_adapterName).GetAll();
        }

        public Animal Get(Guid id)
        {
            return _adapter(_adapterName).Get(id);
        }
    }
}
