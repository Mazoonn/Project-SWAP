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
    
    public partial class quest
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public quest()
        {
            this.r_place_quest = new HashSet<r_place_quest>();
        }
    
        public string quest_id { get; set; }
        public System.DateTime creation_date { get; set; }
        public string name { get; set; }
        public string descrition { get; set; }
        public Nullable<decimal> been_used { get; set; }
        public string user_id { get; set; }
    
        public virtual client client { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<r_place_quest> r_place_quest { get; set; }
    }
}
