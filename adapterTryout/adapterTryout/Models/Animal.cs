﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace adapterTryout.Models
{
    public class Animal
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public double Weight { get; set; }
    }
}
