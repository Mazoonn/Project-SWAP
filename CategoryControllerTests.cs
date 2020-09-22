
using api.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Hosting;
using SwapClassLibrary.EF;
using SwapClassLibrary.DTO;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace api.Controllers.Tests
{
    [TestClass()]
    public class CategoryControllerTests
    {
        static GoogleValueControllerTests GoogleValueC = new GoogleValueControllerTests();
        static MainCategoryControllerTests MainCategoryC = new MainCategoryControllerTests();
        static SubCategoryControllerTests SubCategoryC = new SubCategoryControllerTests();

  

        //main and sub category relationship
        /******************************************************************************************/


        [TestMethod()]
        public void AddMainAndSubRelationshipTest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/AddMainAndSubRelationship/{main_id}/{sub_id}");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            MainCategoryC.AddMainCategoryTest();
            SubCategoryC.AddSubCategoryTest();
            SwapDbConnection db = new SwapDbConnection();
            main_category test_main = db.main_category.Where(x => x.name == "unit test").FirstOrDefault();
            sub_category test_sub = db.sub_category.Where(x => x.name == "unit test").FirstOrDefault();
            Assert.AreEqual(controller.AddMainAndSubRelationship(new MainAndSubRelationshipDTO() { main_id = test_main.main_id, sub_id = test_sub.sub_id , descrition = "unit test" }).StatusCode, HttpStatusCode.OK);
        }

        [TestMethod()]
        public void GetAllMainAndSubRelationshipTest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/GetAllMainAndSubRelationship");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.GetAllMainAndSubRelationship().StatusCode, HttpStatusCode.OK);
        }

        [TestMethod()]
        public void GetMainAndSubRelationshipTest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/GetMainAndSubRelationship/{main_id}/{sub_id}");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            SwapDbConnection db = new SwapDbConnection();
            main_category test_main = db.main_category.Where(x => x.name == "unit test").FirstOrDefault();
            sub_category test_sub = db.sub_category.Where(x => x.name == "unit test").FirstOrDefault();
            Assert.AreEqual(controller.GetMainAndSubRelationship(test_main.main_id).StatusCode, HttpStatusCode.OK);

        }


        [TestMethod()]
        public void RemoveMainAndSubRelationshipTest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/RemoveMainAndSubRelationship/{main_id}/{sub_id}");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            SwapDbConnection db = new SwapDbConnection();
            main_category test_main = db.main_category.Where(x => x.name == "unit test").FirstOrDefault();
            sub_category test_sub = db.sub_category.Where(x => x.name == "unit test").FirstOrDefault();
            Assert.AreEqual(controller.RemoveMainAndSubRelationship(test_main.main_id, test_sub.sub_id).StatusCode, HttpStatusCode.OK);
            MainCategoryC.DeleteMainCategoryTest();
            SubCategoryC.DeleteSubCategoryTest();
        }
    }
}