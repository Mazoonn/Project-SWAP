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

namespace api.Controllers.Category
{
    [RoutePrefix("api/business/product")]
    public class ProductController : ApiController
    {

        // GET: api/business/product/GetAllProduct/:businness_id/{clientId}
        [Route("GetAllProducts/{business_id}/{clientId}")]
        [SelfAuthorization()]
        [HttpGet]
        public HttpResponseMessage GetAllProducts(string business_id, string clientId)
        {
            try
            {
                List<productDTO> list = ProductService.GetAllProducts(business_id, clientId);
                return Request.CreateResponse(HttpStatusCode.OK, list);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        // POST: api/business/product/AddProduct/{clientId}/
        [Route("AddProduct/{clientId}")]
        [SelfAuthorization()]
        [HttpPost]
        public HttpResponseMessage AddProduct([FromBody]productDTO req, string clientId)
        {
            try
            {
                if (req.name != null && req.description != null)
                {
                    productDTO product = ProductService.AddProduct(req, clientId);
                    if (product != null)
                        return Request.CreateResponse(HttpStatusCode.OK, product);
                    return Request.CreateResponse(HttpStatusCode.Conflict, "There is a product with this name:" + req.name);
                }

                return Request.CreateResponse(HttpStatusCode.BadRequest, "Missing prameters in your request");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("ChangeProductActive/{clientId}")]
        [SelfAuthorization()]
        [HttpPost]
        // PUT: api/business/product/ChangeProductActive/{clientId}
        //need to send type : id,name 
        //body : true
        public HttpResponseMessage ChangeProducActive([FromBody]productDTO products, string clientId)
        {
            try
            {
                SwapDbConnection db = new SwapDbConnection();
                product slected_products = db.products.FirstOrDefault(x => x.business_id == products.business_id && x.product_id == products.product_id && x.business.business_owner_id == clientId); ;
                if (slected_products == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no product with that id :" + products.product_id);
                slected_products.is_active = products.is_active;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        // Delete:api/business/product/DeleteProduct/{businness_id}/{product_id}/{clientId}
        [Route("DeleteProduct/{business_id}/{product_id}/{clientId}")]
        [SelfAuthorization()]
        [HttpDelete]
        public HttpResponseMessage DeleteProduct([FromUri]string business_id, [FromUri]string product_id, string clientId)
        {
            try
            {
                bool is_deleted;
                is_deleted = ProductService.deleteProduct(business_id, product_id, clientId);
                if (!is_deleted)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no product with this id :" + product_id);
                return Request.CreateResponse(HttpStatusCode.OK, "the product has been deleted");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("UpdateProduct/{clientId}")]
        [SelfAuthorization()]
        [HttpPut]
        // PUT:   api/business/product/UpdateProduct/{clientId}
        //need to send type : id,name 
        //body : true
        public HttpResponseMessage UpdateProduct([FromBody]productDTO req, string clientId)
        {
            try
            {
                SwapDbConnection db = new SwapDbConnection();
                string response = ProductService.updateProduct(req, clientId);
                if (response == "same")
                    return Request.CreateResponse(HttpStatusCode.Conflict, "There is a product with that name :" + req.name);
                if (response == "notExists")
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There no product with that id :" + req.product_id);
                return Request.CreateResponse(HttpStatusCode.OK, "The product was changed");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }
    }

}
