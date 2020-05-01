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
    [RoutePrefix("api/CategoryController")]
    public class CategoryController : ApiController
    {
        //google_value and category relationship
        /******************************************************************************************/
        [Route("GetAllCategorytoGoogleValue/{id}/{google_id}")]
        [HttpGet]
        public HttpResponseMessage GetAllCategorytoGoogleValue(string id, string google_id)
        {
            List<categoryAddGoogleResponseDTO> r_category_google_list = CategoryService.GetAllCategorytoGoogleValue(id,google_id);
            if (r_category_google_list == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Main Categoy value in the db");
            return Request.CreateResponse(HttpStatusCode.OK, r_category_google_list);
        }

        [Route("GetCategorytoGoogleValue/{id}/{google_id}")]
        [HttpGet]
        public HttpResponseMessage GetCategorytoGoogleValue(string id, string google_id)
        {
            IEnumerable<categoryAddGoogleResponseDTO> r_category_google_Obj = CategoryService.GetCategorytoGoogleValue(id,google_id);
            if (r_category_google_Obj == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Main Categoy value in the db");
            return Request.CreateResponse(HttpStatusCode.OK, r_category_google_Obj);
        }

        //לא עשיתי עדין
        //[Route("ChangeActiveMainCategory/{id}")]
        //[HttpPut]
        //// PUT: api/MainCategory/ChangeActiveMainCategory/id
        ////body : "is_active":true
        //public HttpResponseMessage ChangeActiveMainCategory([FromUri]string id, [FromBody]bool req)
        //{
        //    main_category slected_main_category;
        //    SwapDbConnection db = new SwapDbConnection();
        //    slected_main_category = db.main_category.Select(x => x)
        //        .FirstOrDefault(x => x.main_id == id); ;
        //    if (slected_main_category == null)
        //        return Request.CreateResponse(HttpStatusCode.NotFound, "There is not main category value with id - " + id);
        //    slected_main_category.is_active = req;
        //    db.SaveChanges();
        //    return Request.CreateResponse(HttpStatusCode.OK, slected_main_category);

        //}

        // POST: api/MainCategory/AddMainCategory
        [Route("AddCategorytoGoogleValue/{id}/{google_id}")]
        [HttpPost]
        public HttpResponseMessage AddCategorytoGoogleValue([FromBody]categoryAddGoogleRequestDTO req)
        {
            if (req.google_id != null && req.id != null)//matan -change
               return Request.CreateResponse(HttpStatusCode.BadRequest, "The id is missing :"+ req.google_id+" "+ req.id);
            categoryAddGoogleResponseDTO object_add = CategoryService.AddCategorytoGoogleValue(req.id, req.google_id);
               if(object_add != null)
                return Request.CreateResponse(HttpStatusCode.OK, object_add);
            return Request.CreateResponse(HttpStatusCode.BadRequest, "There category id is not as used in this API");
        }

        // Delete:api/googleValue/DeleteGoogleValue/{type}/{req}
        [Route("RemoveCategorytoGoogleValue/{id}/{google_id}")]
        [HttpDelete]
        public HttpResponseMessage RemoveCategorytoGoogleValue(string id, string google_id)
        {
            bool is_deleted;
            is_deleted = CategoryService.RemoveCategorytoGoogleValue(  id,   google_id);
            if (!is_deleted)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is not main category with id - " + id);
            return Request.CreateResponse(HttpStatusCode.OK, "the object had been deleted ");

        }
        //main and sub category relationship
        /******************************************************************************************/
        
          //matan - need to test  
        // GET: api/MainCategory
        [Route("GetAllMainAndSubRelationship/{main_id}/{sub_id}")]
       [HttpGet]
        public HttpResponseMessage GetAllMainAndSubRelationship(string main_id, string sub_id)
        {
            List<r_sub_and_main_category> r_main_sub_category_list = CategoryService.GetAllMainAndSubRelationship( main_id,  sub_id);
            if (r_main_sub_category_list == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Main Categoy value in the db");
            return Request.CreateResponse(HttpStatusCode.OK, r_main_sub_category_list);
        }

        [Route("GetMainAndSubRelationship/{main_id}/{sub_id}")]
        [HttpGet]
        public HttpResponseMessage GetMainAndSubRelationship(string main_id, string sub_id)
        {
            IEnumerable<r_sub_and_main_category> r_main_sub_category_obj = CategoryService.GetMainAndSubRelationship(main_id, sub_id);
            if (r_main_sub_category_obj == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Main Categoy value in the db");
            return Request.CreateResponse(HttpStatusCode.OK, r_main_sub_category_obj);
        }

        // POST: api/MainCategory/AddMainCategory
        //[Route("AddMainAndSubRelationship/{main_id}/{sub_id}")]
        //[HttpPost]
        //public HttpResponseMessage AddMainAndSubRelationship([FromBody]requestValueDTO req)
        //{
        //    //  if (req. != null && req.id != null)//matan -change
        //    //     return Request.CreateResponse(HttpStatusCode.BadRequest, "The id is missing :" + req.google_id + " " + req.id);
        //    r_sub_and_main_category object_add = CategoryService.AddMainAndSubRelationship(req.id, req.google_id);
        //    if (object_add != null)
        //        return Request.CreateResponse(HttpStatusCode.OK, object_add);
        //    return Request.CreateResponse(HttpStatusCode.BadRequest, "There category id is not as used in this API");
        //}

        //[Route("ChangeActiveMainCategory/{id}")]
        //[HttpPut]
        //// PUT: api/MainCategory/ChangeActiveMainCategory/id
        ////body : "is_active":true
        //public HttpResponseMessage ChangeActiveMainCategory([FromUri]string id, [FromBody]bool req)
        //{
        //    main_category slected_main_category;
        //    SwapDbConnection db = new SwapDbConnection();
        //    slected_main_category = db.main_category.Select(x => x)
        //        .FirstOrDefault(x => x.main_id == id); ;
        //    if (slected_main_category == null)
        //        return Request.CreateResponse(HttpStatusCode.NotFound, "There is not main category value with id - " + id);
        //    slected_main_category.is_active = req;
        //    db.SaveChanges();
        //    return Request.CreateResponse(HttpStatusCode.OK, slected_main_category);

        //}


        // Delete:api/googleValue/DeleteGoogleValue/{type}/{req}
        [Route("DeleteMainCategory/{main_id}/{sub_id}")]
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
