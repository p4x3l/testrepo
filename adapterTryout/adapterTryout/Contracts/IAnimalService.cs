using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using adapterTryout.Models;

namespace adapterTryout.Contracts
{
    public interface IAnimalService
    {
        IEnumerable<Animal> GetAll();

        Animal Get(Guid id);
    }
}
