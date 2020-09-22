using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwapClassLibrary.DTO;
using SwapClassLibrary.EF;
using SwapClassLibrary.Service;

namespace api.Controllers
{
    [Authorize(Roles = "admin")]
    [RoutePrefix("api/Category")]
    public class CategoryController : ApiController
    {
        //main and sub category relationship
        /******************************************************************************************/

        // GET: api/Category/GetAllMainAndSubRelationship
        [Route("GetAllMainAndSubRelationship")]
        [HttpGet]
        public HttpResponseMessage GetAllMainAndSubRelationship(bool test=false)
        {
            try
            {
                List<MainAndSubRelationshipDTO> r_main_sub_category_list = CategoryService.GetAllMainAndSubRelationship();
                if (r_main_sub_category_list.Count == 0|| test)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Main Categoy value in the db");
                return Request.CreateResponse(HttpStatusCode.OK, r_main_sub_category_list);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        // GET: api/Category/GetMainAndSubRelationship/{main_id}
        [Route("GetMainAndSubRelationship/{main_id}")]
        [HttpGet]
        public HttpResponseMessage GetMainAndSubRelationship(string main_id)
        {
            try
            {
                List<MainAndSubRelationshipDTO> r_main_sub_category_obj = CategoryService.GetMainAndSubRelationship(main_id);
                if (r_main_sub_category_obj == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Main Categoy value in the db");
                return Request.CreateResponse(HttpStatusCode.OK, r_main_sub_category_obj);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        //POST: api/MainCategory/AddMainAndSubRelationship
        [Route("AddMainAndSubRelationship")]
        [HttpPost]
        public HttpResponseMessage AddMainAndSubRelationship([FromBody]MainAndSubRelationshipDTO req)
        {
            try
            {
                MainAndSubRelationshipDTO object_add;
                if (req.main_id == null || req.sub_name==null ||req.google_value==null|| req.descrition == null)
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "The param is missing :" + req.main_id==null? req.google_value == null? req.sub_name == null? "":"sub_name" : "google_value" :  "main_id");
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

        // PUT:api/category/UpdateSubCategoryOfMainCategoryDescription
        [Route("UpdateSubCategoryOfMainCategoryDescription")]
        [HttpPut]
        public HttpResponseMessage UpdateSubCategoryOfMainCategoryDescription([FromBody]MainAndSubRelationshipDTO req)
        {
            try
            {
                bool success;
                if (req.main_id == null || req.sub_id == null || req.descrition == null)
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "missing parameters");
                success = CategoryService.UpdateDescription(req.main_id, req.sub_id, req.descrition);
                if (success)
                    return Request.CreateResponse(HttpStatusCode.OK, "description is changed to :"+ req.descrition);
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Bad request");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        // PUT:api/Category/UpdateSubCategoryOfMainCategoryChangeStatus
        [Route("UpdateSubCategoryOfMainCategoryChangeStatus")]
        [HttpPut]
        public HttpResponseMessage UpdateSubCategoryOfMainCategoryChangeStatus([FromBody]MainAndSubRelationshipDTO req)
        {
            try
            {
                bool success;
                if (req.main_id == null || req.sub_id == null || req.is_active == null)
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "missing parameters");
                  success = CategoryService.UpdatStatusIsActive(req.main_id, req.sub_id, req.is_active);
                if (success)
                    return Request.CreateResponse(HttpStatusCode.OK,"status change to :"+req.is_active);
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Bad request");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }
        // PUT:api/Category/UpdateSubCategoryOfMainCategoryClickes
        [Route("UpdateSubCategoryOfMainCategoryClickes")]
        
        [HttpPut]
        public HttpResponseMessage UpdateSubCategoryOfMainCategoryClickes([FromBody]MainAndSubRelationshipDTO req)
        {
            try
            {
                bool success;
                if (req.main_id == null || req.sub_id == null || req.clicked == null)
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "missing parameters");
                success = CategoryService.UpdateClickesForReletionship(req.main_id, req.sub_id, req.clicked);
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
