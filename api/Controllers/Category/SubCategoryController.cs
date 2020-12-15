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
   //[Authorize(Roles = "admin")]
    [RoutePrefix("api/SubCategory")]
    public class SubCategoryController : ApiController
    {

        // GET: api/SubCategory
        [Route("GetAllSubCategory")]
        [HttpGet]
        public HttpResponseMessage GetAllSubCategory(bool test =false)
        {
            try
            {
                List<categoryDTO> list = SubCategoryService.GetAllSubCategorys();
                if (list == null|| test)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Sub Categoy value in the db");
                return Request.CreateResponse(HttpStatusCode.OK, list);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        // POST: api/SubCategory/AddSubCategory
        [Route("AddSubCategory")]
        [HttpPost]
        public HttpResponseMessage AddSubCategory([FromBody]requestValueDTO req)
        {
            try
            {
                if (req.google_value != null && req.name != null)
                {
                    bool result = SubCategoryService.AddSubCategory(req.name, req.google_value);
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
                return Request.CreateResponse(HttpStatusCode.BadRequest, "there is no 'value':'' in the body");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("ChangeActiveSubCategory/{id}")]
        [HttpPut]
        // PUT: api/SubCategory/ChangeActiveSubCategory/id or value
        //need to send type : id,value 
        //body : true
        public HttpResponseMessage ChangeActiveSubCategory([FromUri]string id, [FromBody]bool req)
        {
            try
            {
                sub_category slected_Sub_category;
                SwapDbConnection db = new SwapDbConnection();
                slected_Sub_category = db.sub_category
                    .FirstOrDefault(x => x.sub_id == id); ;
                if (slected_Sub_category == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is not Sub category value with id - " + id);
                slected_Sub_category.is_active = req;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        // Delete:api/googleValue/DeleteGoogleValue/{type}/{value}
        [Route("DeleteSubCategory/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteSubCategory(string id)
        {
            try
            {
                bool is_deleted;
                is_deleted = SubCategoryService.deleteSubCategory(id);
                if (!is_deleted)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is not sub category with id - " + id);
                return Request.CreateResponse(HttpStatusCode.OK, "the object had been deleted ");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }
    }
}
