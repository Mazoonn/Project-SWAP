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
    [RoutePrefix("api/SubCategory")]
    public class SubCategoryController : ApiController
    {

        // GET: api/SubCategory
        [Route("GetAllSubCategory")]
        [HttpGet]
        public HttpResponseMessage GetAllSubCategory()
        {
            List<categoryDTO> list = SubCategoryService.GetAllSubCategorys();
            if (list == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Sub Categoy value in the db");
            return Request.CreateResponse(HttpStatusCode.OK, list);
        }

        // POST: api/SubCategory/AddSubCategory
        [Route("AddSubCategory")]
        [HttpPost]
        public HttpResponseMessage AddSubCategory([FromBody]requestValueDTO req)
        {
            if (req.name != null)
                return Request.CreateResponse(HttpStatusCode.OK, SubCategoryService.AddSubCategory(req.name));
            return Request.CreateResponse(HttpStatusCode.BadRequest, "there is no 'value':'' in the body");
        }

        [Route("ChangeActiveSubCategory/{id}")]
        [HttpPut]
        // PUT: api/SubCategory/ChangeActiveSubCategory/id or value
        //need to send type : id,value 
        //body : "is_active":true
        public HttpResponseMessage ChangeActiveSubCategory([FromUri]string id, [FromBody]bool req)
        {
            sub_category slected_Sub_category;
            SwapDbConnection db = new SwapDbConnection();
            slected_Sub_category = db.sub_category.Select(x => x)
                .FirstOrDefault(x => x.sub_id == id); ;
            if (slected_Sub_category == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is not Sub category value with id - " + id);
            slected_Sub_category.is_active = req;
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, slected_Sub_category);

        }

        // Delete:api/googleValue/DeleteGoogleValue/{type}/{value}
        [Route("DeleteSubCategory/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteSubCategory(string id)
        {
            bool is_deleted;
            is_deleted = SubCategoryService.deleteSubCategory(id);
            if (!is_deleted)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is not sub category with id - " + id);
            return Request.CreateResponse(HttpStatusCode.OK, "the object had been deleted ");

        }
    }
}
