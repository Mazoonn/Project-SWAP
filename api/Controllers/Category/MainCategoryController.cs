using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using api.Authorization;
using SwapClassLibrary.DTO;
using SwapClassLibrary.EF;
using SwapClassLibrary.Service;
using api.Authorization;

namespace api.Controllers
{
    [RoutePrefix("api/MainCategory")]
    public class MainCategoryController : ApiController
    {
        // GET: api/MainCategory

        [Route("GetAllMainCategories")]
        [MyAuthorize("admin", "client", "business")]
        [HttpGet]
        public HttpResponseMessage GetAllMainCategories(bool test = false)
        {
            try
            {
                List<categoryDTO> list = MainCategoryService.GetAllMainCategories().Where(x => x.is_active).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, list);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [MyAuthorize("admin")]
        [Route("GetAllMainCategoriesAdmin")]
        [HttpGet]
        public HttpResponseMessage GetAllMainCategoriesAdmin(bool test = false)
        {
            try
            {
                List<categoryDTO> list = MainCategoryService.GetAllMainCategories();
                return Request.CreateResponse(HttpStatusCode.OK, list);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        // POST: api/MainCategory/AddMainCategory
        [Route("AddMainCategory")]
        [HttpPost]
        public HttpResponseMessage AddMainCategory([FromBody]requestValueDTO req)
        {
            try
            {
                if (req.google_value != null && req.name != null)
                    return Request.CreateResponse(HttpStatusCode.OK, MainCategoryService.AddMainCategory(req.name, req.google_value));
                return Request.CreateResponse(HttpStatusCode.BadRequest, "there is no name value in the body");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("ChangeActiveMainCategory/{id}")]
        [HttpPut]
        // PUT: api/MainCategory/ChangeActiveMainCategory/id
        //body : "is_active":true
        [MyAuthorize("admin")]
        public HttpResponseMessage ChangeActiveMainCategory([FromUri]string id,[FromBody] dynamic req)
        {
            try
            {
            main_category slected_main_category;
            SwapDbConnection db = new SwapDbConnection();
            slected_main_category = db.main_category
              .FirstOrDefault(x => x.main_id == id);
            if (slected_main_category == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no main category value with id - " + id);
            slected_main_category.is_active = req.is_active;
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }
         

        // Delete:api/googleValue/DeleteGoogleValue/{type}/{req}
        [Route("DeleteMainCategory/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteMainCategory(string id)
        {
            try
            {
            bool is_deleted;
            is_deleted = MainCategoryService.deleteMainCategory(id);
            if (!is_deleted)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is not main category with id - " + id);
            return Request.CreateResponse(HttpStatusCode.OK, "the object had been deleted ");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

    }
   
}
