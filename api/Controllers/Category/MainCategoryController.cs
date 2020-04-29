using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwapClassLibrary.DTO;
using SwapClassLibrary.EF;
using SwapClassLibrary.Service;

namespace api.Controllers.Category
{
    [RoutePrefix("api/MainCategory")]
    public class MainCategoryController : ApiController
    {
       // GET: api/MainCategory
       [Route("GetAllMainCategory")]
       [HttpGet]
        public HttpResponseMessage GetAllMainCategory()
        {
            List<mainCategoryDTO> list = CategoryService.GetAllMainCategorys();
            if (list.Count == 0)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Main Categoy value in the db");
            return Request.CreateResponse(HttpStatusCode.OK, list);
        }

        // GET: api/MainCategory/GetMainCategory/{type}/{value}
        [Route("GetMainCategory/{type}/{value}")]
        [HttpGet]
        public HttpResponseMessage GetMainCategory(string type, string value)
          {
            mainCategoryDTO db_value;
            switch (type)
            {
                case ("id"):
                    db_value = CategoryService.GetMainCategoryByid(value);
                    if (db_value == null)
                        return Request.CreateResponse(HttpStatusCode.NotFound, "There is not google value with id - " + value);
                    return Request.CreateResponse(HttpStatusCode.OK, db_value);
                case ("value"):
                    db_value = CategoryService.GetMainCategoryByValue(value);
                    if (db_value == null)
                        return Request.CreateResponse(HttpStatusCode.NotFound, "There is not google value with value of - " + value);
                    return Request.CreateResponse(HttpStatusCode.OK, db_value);
                default:
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "The URL GetGoogleValue/type/: can be only id or value ");
            }
        }

        // POST: api/MainCategory/AddMainCategory
        [Route("AddMainCategory")]
        [HttpPost]
        public void AddMainCategory([FromBody]mainCategoryDTO value)
        {

        }

        // PUT: api/MainCategory/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/MainCategory/5
        public void Delete(int id)
        {
        }
    }
}
