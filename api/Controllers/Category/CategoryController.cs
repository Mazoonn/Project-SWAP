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
    [RoutePrefix("api/Category")]
    public class CategoryController : ApiController
    {
        //google_value and category relationship
        /******************************************************************************************/

        // GET: api/Category/GetAllCategorytoGoogleValue
        [Route("GetAllCategorytoGoogleValue")]
        [HttpGet]
        public HttpResponseMessage GetAllCategorytoGoogleValue()
        {
            List<categoryAddGoogleResponseDTO> r_category_google_list = CategoryService.GetAllSubCategorytoGoogleValue();
            if (r_category_google_list == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Categoy value in the db");//fix status cood
            return Request.CreateResponse(HttpStatusCode.OK, r_category_google_list);
        }

        // GET: api/Category/GetCategorytoGoogleValue/{id}/{google_id}
        [Route("GetCategorytoGoogleValue/{id}/{google_id}")]
        [HttpGet]
        public HttpResponseMessage GetCategorytoGoogleValue(string id, string google_id)
        {
            IEnumerable<categoryAddGoogleResponseDTO> r_category_google_Obj = CategoryService.GetSubCategorytoGoogleValue(id,google_id);
            if (r_category_google_Obj == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Main Categoy value in the db");
            return Request.CreateResponse(HttpStatusCode.OK, r_category_google_Obj);
        }

        // PUT: api/Category/ChangeActiveCategorytoGoogleValue/id
        [Route("ChangeActiveCategorytoGoogleValue/{id}/{google_id}")]
        [HttpPut]
        public HttpResponseMessage ChangeActiveCategorytoGoogleValue(string id, string google_id, [FromBody]bool req)
        {
            if (id == null || google_id == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest, "The id is missing :" + google_id + " " + id);
            categoryAddGoogleDTO object_add = CategoryService.ChangeActiveCategorytoGoogleValue(id, google_id,req);
            if (object_add != null)
                return Request.CreateResponse(HttpStatusCode.OK, object_add);
            return Request.CreateResponse(HttpStatusCode.BadRequest, "There category id is not as used in this API");

        }

        // POST: api/Category/AddMainCategory
        [Route("AddCategorytoGoogleValue")]
        [HttpPost]
        public HttpResponseMessage AddCategorytoGoogleValue([FromBody]categoryAddGoogleRequestDTO req)
        {
            if (req.google_id == null || req.id == null)//matan -change
               return Request.CreateResponse(HttpStatusCode.BadRequest, "The id is missing :"+ req.google_id+" "+ req.id);
            categoryAddGoogleDTO object_add = CategoryService.AddSubCategorytoGoogleValue(req.id, req.google_id);
               if(object_add != null)
                return Request.CreateResponse(HttpStatusCode.OK, object_add);
            return Request.CreateResponse(HttpStatusCode.BadRequest, "There category id is not as used in this API");
        }

        // Delete:api/Category/DeleteGoogleValue/{type}/{req}
        [Route("RemoveCategorytoGoogleValue/{id}/{google_id}")]
        [HttpDelete]
        public HttpResponseMessage RemoveCategorytoGoogleValue(string id, string google_id)
        {
            bool is_deleted;
            is_deleted = CategoryService.RemoveSubCategorytoGoogleValue(  id,   google_id);
            if (!is_deleted)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is not main category with id - " + id);
            return Request.CreateResponse(HttpStatusCode.OK, "the object had been deleted ");

        }


        //main and sub category relationship
        /******************************************************************************************/

        // GET: api/Category/GetAllMainAndSubRelationship/{main_id}/{sub_id}
        [Route("GetAllMainAndSubRelationship")]
       [HttpGet]
        public HttpResponseMessage GetAllMainAndSubRelationship()
        {
            List<r_sub_and_main_category> r_main_sub_category_list = CategoryService.GetAllMainAndSubRelationship();
            if (r_main_sub_category_list.Count == 0)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Main Categoy value in the db");
            return Request.CreateResponse(HttpStatusCode.OK, r_main_sub_category_list);
        }

        // GET: api/Category/GetMainAndSubRelationship/{main_id}/{sub_id}
        [Route("GetMainAndSubRelationship/{main_id}/{sub_id}")]
        [HttpGet]
        public HttpResponseMessage GetMainAndSubRelationship(string main_id, string sub_id)
        {
            IEnumerable<r_sub_and_main_category> r_main_sub_category_obj = CategoryService.GetMainAndSubRelationship(main_id, sub_id);
            if (r_main_sub_category_obj == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Main Categoy value in the db");
            return Request.CreateResponse(HttpStatusCode.OK, r_main_sub_category_obj);
        }

        //POST: api/MainCategory/AddMainAndSubRelationship
        [Route("AddMainAndSubRelationship")]
       [HttpPost]
        public HttpResponseMessage AddMainAndSubRelationship([FromBody]MainAndSubRelationshipDTO req)
        {
             if (req.main_id == null || req.sub_id == null)//matan -change
                return Request.CreateResponse(HttpStatusCode.BadRequest, "The id is missing :" + req.sub_id + " " + req.main_id);
            r_sub_and_main_category object_add = CategoryService.AddMainAndSubRelationship(req.main_id, req.sub_id,req.descrition);
            if (object_add != null)
                return Request.CreateResponse(HttpStatusCode.OK, object_add);
            return Request.CreateResponse(HttpStatusCode.BadRequest, "There category id is not as used in this API");
        }

        // Delete:api/googleValue/DeleteGoogleValue/{type}/{req}
        [Route("RemoveMainAndSubRelationship/{main_id}/{sub_id}")]
        [HttpDelete]
        public HttpResponseMessage RemoveMainAndSubRelationship(string main_id, string sub_id)
        {
            bool is_deleted;
            is_deleted = CategoryService.RemoveMainAndSubRelationship( main_id,  sub_id);
            if (!is_deleted)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is not main category with id - " + main_id +" "+ sub_id);
            return Request.CreateResponse(HttpStatusCode.OK, "the object had been deleted ");

        }
    }
   
}
