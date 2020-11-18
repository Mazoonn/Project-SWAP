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
    
    public partial class business
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public business()
        {
            this.products = new HashSet<product>();
        }
    
        public string place_id { get; set; }
        public string business_owner_id { get; set; }
        public bool is_active { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public Nullable<System.TimeSpan> opening_hours { get; set; }
        public Nullable<System.TimeSpan> closing_hours { get; set; }
        public string Icon { get; set; }
        public int rating { get; set; }
        public bool approve_by_admin { get; set; }
    
        public virtual place place { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<product> products { get; set; }
        public virtual BusinessOwner BusinessOwner { get; set; }
    }
}
