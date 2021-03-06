﻿using Microsoft.VisualStudio.TestTools.UnitTesting;
using api.Controllers.Category;
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

namespace Test.Controllers.SubCategory
{
    [TestClass()]
    public class GetAllSubCategoryTest
    {
        [TestMethod()]
        public void GetAllSubCategorySuccess()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/GetAllSubCategory");
            var controller = new SubCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.GetAllSubCategory().StatusCode, HttpStatusCode.OK);
        }
        [TestMethod()]
        public void GetAllSubCategoryNotFound()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/GetAllSubCategory");
            var controller = new SubCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.GetAllSubCategory(true).StatusCode, HttpStatusCode.NotFound);
        } 
    }

    [TestClass()]
    public class AddSubCategoryTest
    {
        [TestMethod()]
        public void AddSubCategorySuccess()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/AddMainCategory/");
            var controller = new SubCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            var test = new requestValueDTO() { name = "unit test",google_value="unit test" };
            Assert.AreEqual(controller.AddSubCategory(test).StatusCode, HttpStatusCode.OK);
        }
        [TestMethod()]
        public void AddSubCategoryBadRequest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/AddMainCategory/");
            var controller = new SubCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            var test = new requestValueDTO() {};
            Assert.AreEqual(controller.AddSubCategory(test).StatusCode, HttpStatusCode.BadRequest);

        }
    }
    [TestClass()]
    public class ChangeActiveSubCategoryTest
    {
        [TestMethod()]
        public void ChangeActiveSubCategorySuccess()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/SubCategory/{id}");
            var controller = new SubCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            SwapDbConnection db = new SwapDbConnection();
            sub_category test = db.sub_category.Where(x => x.name == "unit test").FirstOrDefault();
            Assert.AreEqual(controller.ChangeActiveSubCategory(test.sub_id, true).StatusCode, HttpStatusCode.OK);

        }
        [TestMethod()]
        public void ChangeActiveSubCategoryNotFound()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/SubCategory/{id}");
            var controller = new SubCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.ChangeActiveSubCategory("123", true).StatusCode, HttpStatusCode.NotFound);
        }
    }
    [TestClass()]
    public class DeleteSubCategoryTest
    {

        [TestMethod()]
        public void DeleteSubCategorySuccess()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/DeleteSubCategory/{id}");
            var controller = new SubCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            SwapDbConnection db = new SwapDbConnection();
            sub_category test = db.sub_category.Where(x => x.name == "unit test").FirstOrDefault();
            Assert.AreEqual(controller.DeleteSubCategory(test.sub_id).StatusCode, HttpStatusCode.OK);

        }
        [TestMethod()]
        public void DeleteSubCategoryNotFound()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/DeleteSubCategory/{id}");
            var controller = new SubCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.DeleteSubCategory("123").StatusCode, HttpStatusCode.NotFound);
        }
    }
}