using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FB_WebApi.Models
{
    public class InvoiceItem
    {
        public string Sku { get; set; }

        public string ArticleName { get; set; }

        public string ArticleGroup { get; set; }

        public decimal NetPrice { get; set; }

        public string LocalCurrency { get; set; }
    }
}
