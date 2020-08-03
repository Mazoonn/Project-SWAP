﻿using System;
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
    [RoutePrefix("api/MainCategory")]
    public class MainCategoryController : ApiController
    {
        // GET: api/MainCategory

        [Route("GetAllMainCategory")]
        [HttpGet]
        public HttpResponseMessage GetAllMainCategory()
        {
            List<categoryDTO> list = MainCategoryService.GetAllMainCategorys().Where(x => x.is_active).ToList();
            if (list == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Main Categoy value in the db");
            return Request.CreateResponse(HttpStatusCode.OK, list);
        }
        [Route("GetAllMainCategoryAdmin")]
        [HttpGet]
        public HttpResponseMessage GetAllMainCategoryAdmin()
        {
            List<categoryDTO> list = MainCategoryService.GetAllMainCategorys();
            if (list == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Main Categoy value in the db");
            return Request.CreateResponse(HttpStatusCode.OK, list);
        }

        // POST: api/MainCategory/AddMainCategory
        [Route("AddMainCategory")]
        [HttpPost]
        public HttpResponseMessage AddMainCategory([FromBody]requestValueDTO req)
        {
            if (req!=null &&req.name != null)
                return Request.CreateResponse(HttpStatusCode.OK, MainCategoryService.AddMainCategory(req.name, req.google_value));
            return Request.CreateResponse(HttpStatusCode.BadRequest, "there is no name value in the body");
        }

        [Route("ChangeActiveMainCategory/{id}")]
        [HttpPut]
        // PUT: api/MainCategory/ChangeActiveMainCategory/id
        //body : "is_active":true
        public HttpResponseMessage ChangeActiveMainCategory([FromUri]string id, [FromBody]dynamic req)
        {
            main_category slected_main_category;
            SwapDbConnection db = new SwapDbConnection();
            slected_main_category = db.main_category
              .FirstOrDefault(x => x.main_id == id); ;
            if (slected_main_category == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is not main category value with id - " + id);
            slected_main_category.is_active = req.is_active;
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, slected_main_category);

        }
         

        // Delete:api/googleValue/DeleteGoogleValue/{type}/{req}
        [Route("DeleteMainCategory/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteMainCategory(string id)
        {
            bool is_deleted;
            is_deleted = MainCategoryService.deleteMainCategory(id);
            if (!is_deleted)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is not main category with id - " + id);
            return Request.CreateResponse(HttpStatusCode.OK, "the object had been deleted ");

        }

    }
   
}
