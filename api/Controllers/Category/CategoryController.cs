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
             //main and sub category relationship
        /******************************************************************************************/

        // GET: api/Category/GetAllMainAndSubRelationship
        [Route("GetAllMainAndSubRelationship")]
       [HttpGet]
        public HttpResponseMessage GetAllMainAndSubRelationship()
        {
            List<MainAndSubRelationshipDTO> r_main_sub_category_list = CategoryService.GetAllMainAndSubRelationship();
            if (r_main_sub_category_list.Count == 0)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Main Categoy value in the db");
            return Request.CreateResponse(HttpStatusCode.OK, r_main_sub_category_list);
        }

        // GET: api/Category/GetMainAndSubRelationship/{main_id}
        [Route("GetMainAndSubRelationship/{main_id}")]
        [HttpGet]
        public HttpResponseMessage GetMainAndSubRelationship(string main_id)
        {
            List<MainAndSubRelationshipDTO> r_main_sub_category_obj = CategoryService.GetMainAndSubRelationship(main_id);
            if (r_main_sub_category_obj == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Main Categoy value in the db");
            return Request.CreateResponse(HttpStatusCode.OK, r_main_sub_category_obj);
        }

        //POST: api/MainCategory/AddMainAndSubRelationship
       [Route("AddMainAndSubRelationship")]
       [HttpPost]
        public HttpResponseMessage AddMainAndSubRelationship([FromBody]MainAndSubRelationshipDTO req)
        {
            MainAndSubRelationshipDTO object_add;
                if (req.main_id == null)//matan -change
                return Request.CreateResponse(HttpStatusCode.BadRequest, "The id is missing :" + req.main_id);
            object_add = CategoryService.AddMainAndSubRelationship(req.main_id,req.sub_name,req.descrition);
            if (object_add != null)//TODO matan change option that the reqhest was not completed there is a main\sub id like that in the db
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
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no main category with main_id - "+ main_id +" sub_id "+ sub_id);
            return Request.CreateResponse(HttpStatusCode.OK, "the sub category had been deleted ");
        }
    }
   
}
