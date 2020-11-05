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
    [RoutePrefix("api/business/product")]
    public class ProductController : ApiController
    {

        // GET: api/business/product/GetAllProduct/:businness_id/
        [Route("GetAllProduct/{business_id}")]
        [HttpGet]
        public HttpResponseMessage GetAllProduct([FromUri]string business_id, bool test = false)
        {
            try
            {
                List<productDTO> list = ProductService.GetAllProduct(business_id);
                if (list == null || test)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no product fot this businness");
                return Request.CreateResponse(HttpStatusCode.OK, list);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        // POST: api/business/product/AddProduct/
        [Route("AddProduct/")]
        [HttpPost]
        public HttpResponseMessage AddProduct([FromBody]productDTO req)
        {
            try
            {
                if (req.business_id != null && req.name != null && req.description != null
                    && req.discount_end_date != null && req.discount_start_date != null)
                {
                    DateTime start_date_tmp = req.discount_start_date != null ? req.discount_start_date : DateTime.Now;
                    product product = ProductService.AddProduct(req.name, req.business_id, req.discount, start_date_tmp, req.discount_end_date, req.price, req.description);
                    if (product != null)
                        return Request.CreateResponse(HttpStatusCode.OK, product);
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "There is a prodect with this name:" + req.name);
                }

                return Request.CreateResponse(HttpStatusCode.BadRequest, "Missing prames in your request");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("ChangeProductToActive/{business_id}/{product_id}")]
        [HttpPut]
        // PUT: api/business/product/ChangeProductToActive/{businness_id}/{product_id}
        //need to send type : id,name 
        //body : true
        public HttpResponseMessage ChangeProductToActive([FromUri]string business_id, [FromUri]string product_id, [FromBody]bool flag)
        {
            try
            {
                SwapDbConnection db = new SwapDbConnection();
                product slected_products = db.products.Select(x => x)
                    .FirstOrDefault(x => x.business_id == business_id && x.product_id == product_id); ;
                if (slected_products == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is prodect with that id :" + product_id);
                slected_products.is_active = flag;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        // Delete:api/business/product/DeleteProduct/{businness_id}/{product_id}
        [Route("DeleteProduct/{business_id}/{product_id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteProduct([FromUri]string business_id, [FromUri]string product_id)
        {
            try
            {
                bool is_deleted;
                is_deleted = ProductService.deleteProduct(business_id, product_id);
                if (!is_deleted)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no prodect with the id :" + product_id);
                return Request.CreateResponse(HttpStatusCode.OK, "the prodect had been deleted ");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("UpdateProduct")]
        [HttpPut]
        // PUT:   api/business/product/UpdateProduct/{businness_id}/{product_id}
        //need to send type : id,name 
        //body : true
        public HttpResponseMessage UpdateProduct( [FromBody]productDTO req)
        {
            try
            {
                SwapDbConnection db = new SwapDbConnection();
                bool is_change = ProductService.updateProduct(req);
                if (!is_change)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is prodect with that id :" + req.product_id);
                return Request.CreateResponse(HttpStatusCode.OK, "The product was changed");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }
    }

}
