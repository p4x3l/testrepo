using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using adapterTryout.Contracts;
using adapterTryout.Models;

namespace adapterTryout.DataAdapter
{
    public class DogAdapter : BaseAdapter, IAnimalAdapter
    {
        private readonly IEnumerable<Animal> _dogs;

        public DogAdapter()
        {
            _dogs = new List<Animal>
            {
                new Animal
                {
                    Id = Guid.NewGuid(),
                    Name = "Fido",
                    Type = "Dog",
                    Weight = 10.3
                },
                new Animal
                {
                    Id = Guid.NewGuid(),
                    Name = "Buddy",
                    Type = "Dog",
                    Weight = 23.1
                },
            };
        }

        public override IEnumerable<Animal> GetAll()
        {
            return _dogs;
        }

        public override Animal Get(Guid id)
        {
            return _dogs.First(cat => cat.Id == id);
        }
    }
}
