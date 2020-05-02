﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using SwapClassLibrary.EF;
using SwapClassLibrary.DTO;

namespace SwapClassLibrary.Service
{

    public class MainCategoryService
    {
        //get all main category
        public static List<categoryDTO> GetAllMainCategorys() 
        {
            SwapDbConnection db = new SwapDbConnection();
            int count = db.main_category.Count();
            if (count == 0)
                return null;
            List<categoryDTO> mainCategory = db.main_category.Select(x => new categoryDTO(){
            creation_date = x.creation_date,
            name = x.name,
            id = x.main_id,
            is_active =x.is_active,
            }).ToList();
            return mainCategory;
           
        }

        //get  main category by id
        public static main_category GetMainCategoryByid(string id)
        {
            SwapDbConnection db = new SwapDbConnection();
            main_category main_obj = db.main_category.Select(x => x)
                .FirstOrDefault(x => x.main_id == id);
            return main_obj;
        }

        //add main category
        public static main_category AddMainCategory(string value)
        {
            SwapDbConnection db = new SwapDbConnection();
            main_category main_object = new main_category()
            {
                main_id = IdService.generateID("main_id"),
                creation_date = DateTime.Now,
                is_active = false,
                name = value,
            };
            db.main_category.Add(main_object);
            db.SaveChanges();
            return main_object;
        }
        //delete main category
        public static bool deleteMainCategory(string id)
        {
            SwapDbConnection db = new SwapDbConnection();
            main_category main_obj = db.main_category.Where(x => x.main_id == id).FirstOrDefault();
            if (main_obj == null)
                return false;
            db.main_category.Remove(main_obj);
            db.SaveChanges();
            return true;
        }

     }
}