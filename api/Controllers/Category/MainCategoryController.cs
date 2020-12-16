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
    }
}
