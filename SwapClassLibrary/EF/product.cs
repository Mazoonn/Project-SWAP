//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SwapClassLibrary.EF
{
    using System;
    using System.Collections.Generic;
    
    public partial class product
    {
        public string product_id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public double price { get; set; }
        public double discount { get; set; }
        public System.DateTime creation_date { get; set; }
        public System.DateTime discount_start_date { get; set; }
        public System.DateTime discount_end_date { get; set; }
        public bool is_active { get; set; }
        public string business_id { get; set; }
    
        public virtual business business { get; set; }
    }
}
