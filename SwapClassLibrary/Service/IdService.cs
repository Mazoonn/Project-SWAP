using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace SwapClassLibrary.Service
{
    public static class IdService
    {
        //Generate Id
        public static string generateID(string class_name)
        {
            string name_for_id = class_name.Split('_')[0] + "_";
            int langth_to_take = 40 - name_for_id.Length ;// place_id => palce
            StringBuilder builder = new StringBuilder();
            Enumerable
               .Range(65, 26)
                .Select(e => ((char)e).ToString())
                .Concat(Enumerable.Range(97, 26).Select(e => ((char)e).ToString()))
                .Concat(Enumerable.Range(0, 10).Select(e => e.ToString()))
                .OrderBy(e => Guid.NewGuid())
                .Take(langth_to_take)
                .ToList().ForEach(e => builder.Append(e));
            string id = builder.ToString();
            return name_for_id + id; //place_46321asgdsgxcvw
        }
    }
}
