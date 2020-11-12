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
                if (req.name != null && req.description != null && req.price != null)
                {
                    product product = ProductService.AddProduct(req);
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

        [Route("ChangeProductToActive/")]
        [HttpPut]
        // PUT: api/business/product/ChangeProductToActive/{businness_id}/{product_id}
        //need to send type : id,name 
        //body : true
        public HttpResponseMessage ChangeProductToActive([FromBody]productDTO products)
        {
            try
            {
                SwapDbConnection db = new SwapDbConnection();
                product slected_products = db.products.Select(x => x)
                    .FirstOrDefault(x => x.business_id == products.business_id && x.product_id == products.product_id); ;
                if (slected_products == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is prodect with that id :" + products.product_id);
                slected_products.is_active = products.is_active;
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
