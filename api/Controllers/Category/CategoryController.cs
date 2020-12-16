using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwapClassLibrary.DTO;
using SwapClassLibrary.EF;
using SwapClassLibrary.Service;
using api.Authorization;

namespace api.Controllers
{
    [RoutePrefix("api/Category")]
    public class CategoryController : ApiController
    {
        //main and sub category relationship
        /******************************************************************************************/


        // GET: api/Category/GetMainAndSubRelationship/{main_id}
        [Route("GetMainAndSubRelationship/{main_id}")]
        [MyAuthorize("admin", "business", "client")]
        [HttpGet]
        public HttpResponseMessage GetMainAndSubRelationship(string main_id)
        {
            try
            {
                List<MainAndSubRelationshipDTO> r_main_sub_category_obj = CategoryService.GetMainAndSubRelationship(main_id);
                if (r_main_sub_category_obj == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Main Category value in the db");
                return Request.CreateResponse(HttpStatusCode.OK, r_main_sub_category_obj);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        //POST: api/MainCategory/AddMainAndSubRelationship
        [MyAuthorize("admin")]
        [Route("AddMainAndSubRelationship")]
        [HttpPost]
        public HttpResponseMessage AddMainAndSubRelationship([FromBody]MainAndSubRelationshipDTO req)
        {
            try
            {
                MainAndSubRelationshipDTO object_add;
                if (req.main_id == null || req.sub_name == null || req.google_value == null || req.descrition == null)
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Illegal parameters");
                object_add = CategoryService.AddMainAndSubRelationship(req.main_id, req.sub_name, req.google_value, req.descrition);
                return Request.CreateResponse(HttpStatusCode.OK, object_add);
            }
            //handle of errors in exeptinos
            catch (Exception error)
            {
                if (typeof(InvalidOperationException) == error.GetType())
                    return Request.CreateResponse(HttpStatusCode.BadRequest, error.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + error);
            }
        }

        // Delete:api/googleValue/DeleteGoogleValue/{type}/{req}
        [MyAuthorize("admin")]
        [Route("RemoveMainAndSubRelationship/{main_id}/{sub_id}")]
        [HttpDelete]
        public HttpResponseMessage RemoveMainAndSubRelationship(string main_id, string sub_id)
        {
            try
            {
                bool is_deleted;
                is_deleted = CategoryService.RemoveMainAndSubRelationship(main_id, sub_id);
                if (!is_deleted)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no main category with main_id - " + main_id + " sub_id " + sub_id);
                return Request.CreateResponse(HttpStatusCode.OK, "the sub category had been deleted ");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }


        // PUT:api/category/UpdateSubCategoryOfMainCategory
        [Route("UpdateSubCategoryOfMainCategory")]
        [MyAuthorize("admin")]
        [HttpPut]
        public HttpResponseMessage UpdateSubCategoryOfMainCategory([FromBody]MainAndSubRelationshipDTO req)
        {
            try
            {
                bool success;
                if (req.main_id == null || req.sub_id == null || req.sub_name == null || req.google_value == null)
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "missing parameters");
                success = SubCategoryService.updateSubCategory(req.sub_id, req.google_value, req.sub_name);
                success &= CategoryService.UpdateDescription(req.main_id, req.sub_id, req.descrition);
                if (success)
                    return Request.CreateResponse(HttpStatusCode.OK, true);
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Bad request");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }
    }
}
