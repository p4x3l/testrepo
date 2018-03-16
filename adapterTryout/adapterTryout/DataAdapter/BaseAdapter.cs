using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using adapterTryout.Models;

namespace adapterTryout.DataAdapter
{
    public abstract class BaseAdapter
    {
        public virtual IEnumerable<Animal> GetAll()
        {
            throw new NotImplementedException();
        }

        public virtual Animal Get(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
