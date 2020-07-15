using Microsoft.VisualStudio.TestTools.UnitTesting;
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


namespace api.Controllers.Tests
{
    [TestClass()]
    public class CategoryControllerTests
    {
        static GoogleValueControllerTests GoogleValueC = new GoogleValueControllerTests();
        static MainCategoryControllerTests MainCategoryC = new MainCategoryControllerTests();
        static SubCategoryControllerTests SubCategoryC = new SubCategoryControllerTests();

        [TestMethod()]
        public void AddSubCategorytoGoogleValue()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/AddSubCategorytoGoogleValue");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            GoogleValueC.AddGoogleValueTest();
            SubCategoryC.AddSubCategoryTest();
            SwapDbConnection db = new SwapDbConnection();
            google_value test_google = db.google_value.Where(x => x.value == "unit test").FirstOrDefault();
            sub_category test_sub = db.sub_category.Where(x => x.name == "unit test").FirstOrDefault();
            Assert.AreEqual(controller.AddCategorytoGoogleValue(new categoryAddGoogleRequestDTO() { id = test_sub.sub_id, google_id = test_google.google_value_id }).StatusCode, HttpStatusCode.OK);
        }

        [TestMethod()]
        public void GetAllCategorytoGoogleValueTest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/GetAllCategorytoGoogleValue");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.GetAllCategorytoGoogleValue().StatusCode, HttpStatusCode.OK);
        }

        [TestMethod()]
        public void GetCategorytoGoogleValueTest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/AddCategorytoGoogleValue/{id}/{google_id}");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            SwapDbConnection db = new SwapDbConnection();
            google_value test_google = db.google_value.Where(x => x.value == "unit test").FirstOrDefault();
            sub_category test_sub = db.sub_category.Where(x => x.name == "unit test").FirstOrDefault();
            Assert.AreEqual(controller.GetCategorytoGoogleValue(test_sub.sub_id, test_google.google_value_id).StatusCode, HttpStatusCode.OK);
        }

        [TestMethod()]
        public void ChangeActiveCategorytoGoogleValueTest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/ChangeActiveCategorytoGoogleValue/{id}/{google_id}");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            SwapDbConnection db = new SwapDbConnection();
            google_value test_google = db.google_value.Where(x => x.value == "unit test").FirstOrDefault();
            sub_category test_sub = db.sub_category.Where(x => x.name == "unit test").FirstOrDefault();
            Assert.AreEqual(controller.ChangeActiveCategorytoGoogleValue(test_sub.sub_id, test_google.google_value_id,true).StatusCode, HttpStatusCode.OK);
        }



        [TestMethod()]
        public void RemoveSubCategorytoGoogleValueTest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/RemoveSubCategorytoGoogleValue/{id}/{google_id}");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            SwapDbConnection db = new SwapDbConnection();
            google_value test_google = db.google_value.Where(x => x.value == "unit test").FirstOrDefault();
            sub_category test_sub = db.sub_category.Where(x => x.name == "unit test").FirstOrDefault();
            Assert.AreEqual(controller.RemoveCategorytoGoogleValue(test_sub.sub_id, test_google.google_value_id).StatusCode, HttpStatusCode.OK);
            GoogleValueC.DeleteGoogleValueTest();
            SubCategoryC.DeleteSubCategoryTest();
        }

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
            Assert.AreEqual(controller.GetMainAndSubRelationship(test_main.main_id, test_sub.sub_id).StatusCode, HttpStatusCode.OK);

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