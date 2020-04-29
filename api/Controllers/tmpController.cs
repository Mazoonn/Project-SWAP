using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwapClassLibrary.DTO;
using SwapClassLibrary.Service;


namespace api.Controllers
{


    public class tmpController : ApiController
    {
     
        // GET: api/tmp
        public IEnumerable<string> Get()
        {
            List<string> tmp = new List<string>();
            for (int i = 0; i < 20; i++)
            {
                tmp.Add(IdService.generateID("google_id"));
            }
            return tmp;
        }

        // GET: api/tmp/5
        public void Get(string value)
        {
           
        }

        // POST: api/tmp
        public HttpResponseMessage Post([FromBody]googleValueDto value)
        {
            if(value != null)
                return Request.CreateResponse(HttpStatusCode.OK, CategoryService.AddGoogleValue(value.value));
            return Request.CreateResponse(HttpStatusCode.BadRequest, "there is no value in the body");
        }

        // PUT: api/tmp/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/tmp/5
        public void Delete(int id)
        {
        }
    }
}
