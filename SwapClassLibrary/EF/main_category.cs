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
    
    public partial class main_category
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public main_category()
        {
            this.r_sub_and_main_category = new HashSet<r_sub_and_main_category>();
        }
    
        public string main_id { get; set; }
        public System.DateTime creation_date { get; set; }
        public string name { get; set; }
        public string google_value { get; set; }
        public bool is_active { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<r_sub_and_main_category> r_sub_and_main_category { get; set; }
    }
}
