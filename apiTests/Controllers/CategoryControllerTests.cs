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
using Test.Controllers.MainCategory;
using Test.Controllers.SubCategory;
using SwapClassLibrary.Service;


namespace Test.Controllers.category
{
    

    [TestClass()]
    public class AddMainAndSubRelationshipTest
    {
        static AddMainCategoryTest add_main_category = new AddMainCategoryTest();
        static DeleteMainCategoryTest delete_main_category = new DeleteMainCategoryTest();
        static AddSubCategoryTest add_sub_category = new AddSubCategoryTest();
        static DeleteSubCategoryTest delete_sub_category = new DeleteSubCategoryTest();

        [TestMethod()]
        public void AddMainAndSubRelationshipSuccess()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/AddMainAndSubRelationship");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            add_main_category.AddMainCategorySuccess();
            add_sub_category.AddSubCategorySuccess();
            SwapDbConnection db = new SwapDbConnection();
            main_category test_main = db.main_category.Where(x => x.name == "unit test").FirstOrDefault();
            Assert.AreEqual(controller.AddMainAndSubRelationship(new MainAndSubRelationshipDTO() { main_id = test_main.main_id, sub_name = "unit test", google_value = "unit test", descrition = "unit test" }).StatusCode, HttpStatusCode.OK);
        }

        [TestMethod()]
        public void AddMainAndSubRelationshipBadRequest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/AddMainAndSubRelationship");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            add_main_category.AddMainCategorySuccess();
            add_sub_category.AddSubCategorySuccess();
            SwapDbConnection db = new SwapDbConnection();
            main_category test_main = db.main_category.Where(x => x.name == "unit test").FirstOrDefault();
            Assert.AreEqual(controller.AddMainAndSubRelationship(new MainAndSubRelationshipDTO() { main_id = "123", sub_name = "unit_test", google_value = "unit test", descrition = "unit test" }).StatusCode, HttpStatusCode.BadRequest);
        }

    }
    [TestClass()]
    public class GetAllMainAndSubRelationshipTest
    {
        static AddMainCategoryTest add_main_category = new AddMainCategoryTest();
        static DeleteMainCategoryTest delete_main_category = new DeleteMainCategoryTest();
        static AddSubCategoryTest add_sub_category = new AddSubCategoryTest();
        static DeleteSubCategoryTest delete_sub_category = new DeleteSubCategoryTest();
        [TestMethod()]
        public void GetAllMainAndSubRelationshipSuccess()
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
        public void GetAllMainAndSubRelationshipNotFound()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/GetAllMainAndSubRelationship");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.GetAllMainAndSubRelationship(true).StatusCode, HttpStatusCode.NotFound);
        }

    }
    [TestClass()]
    public class CategoryControllerTests
    {
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

    }
    //TODO fix this test
    [TestClass()]
    public class RemoveMainAndSubRelationshipTest
    {
         static DeleteMainCategoryTest delete_main_category = new DeleteMainCategoryTest();
        static DeleteSubCategoryTest delete_sub_category = new DeleteSubCategoryTest();
        [TestMethod()]
        public void RemoveMainAndSubRelationshipSuccess()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/RemoveMainAndSubRelationship/{main_id}/{sub_id}");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            MainCategoryService.AddMainCategory("unit test", "unit test");
            SubCategoryService.AddSubCategory("unit_test", "unit_test");
            SwapDbConnection db = new SwapDbConnection();
            main_category test_main = db.main_category.Where(x => x.name == "unit test").FirstOrDefault();
            sub_category test_sub = db.sub_category.Where(x => x.name == "unit_ test").FirstOrDefault();
            CategoryService.AddMainAndSubRelationship(test_main.main_id, test_sub.sub_id, "unit test", "unit test");
            Assert.AreEqual(controller.RemoveMainAndSubRelationship(test_main.main_id, test_sub.sub_id).StatusCode, HttpStatusCode.OK);
            delete_main_category.DeleteMainCategorySuccess();
            delete_sub_category.DeleteSubCategorySuccess();
        }

        public void RemoveMainAndSubRelationshipFailed()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/RemoveMainAndSubRelationship/{main_id}/{sub_id}");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
           Assert.AreEqual(controller.RemoveMainAndSubRelationship("123", "123").StatusCode, HttpStatusCode.OK);
        }
    }
    //TODO fix this test
    [TestClass()]
    public class UpdateSubCategoryOfMainCategoryDescriptionTest
    {
        static DeleteMainCategoryTest delete_main_category = new DeleteMainCategoryTest();
        static DeleteSubCategoryTest delete_sub_category = new DeleteSubCategoryTest();
        [TestMethod()]
        public void UpdateSubCategoryOfMainCategoryDescriptionSuccess()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Put, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/UpdateDescription/");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            MainCategoryService.AddMainCategory("unit test", "unit test");
            SubCategoryService.AddSubCategory("unit test", "unit_test");
            SwapDbConnection db = new SwapDbConnection();
            main_category test_main = db.main_category.Where(x => x.name == "unit test").FirstOrDefault();
            sub_category test_sub = db.sub_category.Where(x => x.name == "unit test").FirstOrDefault();
            CategoryService.AddMainAndSubRelationship(test_main.main_id, test_sub.sub_id, "unit test", "unit test"); 
            Assert.AreEqual(controller.UpdateSubCategoryOfMainCategoryDescription(new MainAndSubRelationshipDTO() { main_id= test_main.main_id, sub_id= test_sub.sub_id,descrition="test" }).StatusCode, HttpStatusCode.OK);
            delete_main_category.DeleteMainCategorySuccess();
            delete_sub_category.DeleteSubCategorySuccess();
        }
        [TestMethod()]
        public void UpdateSubCategoryOfMainCategoryDescriptionFailed()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/RemoveMainAndSubRelationship/{main_id}/{sub_id}");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.UpdateSubCategoryOfMainCategoryDescription(new MainAndSubRelationshipDTO()).StatusCode, HttpStatusCode.OK);
        }
    }
    //TODO fix this test
    [TestClass()]
    public class UpdateSubCategoryOfMainCategoryChangeStatusTest
    {
        static DeleteMainCategoryTest delete_main_category = new DeleteMainCategoryTest();
        static DeleteSubCategoryTest delete_sub_category = new DeleteSubCategoryTest();
        [TestMethod()]
        public void UpdateSubCategoryOfMainCategoryChangeStatusSuccess()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Put, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/UpdateDescription/");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
             SwapDbConnection db = new SwapDbConnection();
            main_category test_main = db.main_category.Where(x => x.name == "unit test").FirstOrDefault();
            sub_category test_sub = db.sub_category.Where(x => x.name == "unit test").FirstOrDefault();
            CategoryService.AddMainAndSubRelationship(test_main.main_id, test_sub.sub_id, "unit test", "unit test");
            Assert.AreEqual(controller.UpdateSubCategoryOfMainCategoryChangeStatus(new MainAndSubRelationshipDTO() { main_id = test_main.main_id, sub_id = test_sub.sub_id, is_active = true }).StatusCode, HttpStatusCode.OK);
            delete_main_category.DeleteMainCategorySuccess();
            delete_sub_category.DeleteSubCategorySuccess();
        }
        [TestMethod()]
        public void UpdateSubCategoryOfMainCategoryChangeStatusFailed()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/RemoveMainAndSubRelationship/{main_id}/{sub_id}");
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.UpdateSubCategoryOfMainCategoryChangeStatus(new MainAndSubRelationshipDTO()).StatusCode, HttpStatusCode.OK);
        }
    }
}