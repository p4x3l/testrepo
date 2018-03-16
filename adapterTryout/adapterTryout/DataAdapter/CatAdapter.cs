using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using adapterTryout.Contracts;
using adapterTryout.Models;

namespace adapterTryout.DataAdapter
{
    public class CatAdapter : BaseAdapter, IAnimalAdapter
    {
        private readonly IEnumerable<Animal> _cats;

        public CatAdapter()
        {
            _cats = new List<Animal>
            {
                new Animal
                {
                    Id = Guid.NewGuid(),
                    Name = "Harry",
                    Type = "Cat",
                    Weight = 3.4
                },
                new Animal
                {
                    Id = Guid.NewGuid(),
                    Name = "Chip",
                    Type = "Cat",
                    Weight = 5.2
                },
            };
        }

        public override IEnumerable<Animal> GetAll()
        {
            return _cats;
        }

        public override Animal Get(Guid id)
        {
            return _cats.First(cat => cat.Id == id);
        }
    }
}
