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

    public class GoogleValueService
    {
        //google_value
        /******************************************************************************************/
        //get all google value
        public virtual List<googleValueDto> GetAllGoogleValue()
        {
            SwapDbConnection db = new SwapDbConnection();
            List<googleValueDto> googleDto = db.google_value.Select(x=>new googleValueDto() {google_id =x.google_value_id,value=x.value }).ToList();
            return googleDto;
        }
        //get  google value by value
        public static googleValueDto GetGoogleValueByValue(string value)
        {
            SwapDbConnection db = new SwapDbConnection();
            googleValueDto googleDto = db.google_value
                .Select(x => new googleValueDto() { google_id = x.google_value_id, value = x.value })
                .FirstOrDefault(x => x.value == value);
            return googleDto;
        }
        //get  google value by id
        public static googleValueDto GetGoogleValueByid(string id)
        {
            SwapDbConnection db = new SwapDbConnection();
            googleValueDto googleDto = db.google_value
                .Select(x => new googleValueDto() { google_id = x.google_value_id, value = x.value })
                .FirstOrDefault(x => x.google_id == id);
            return googleDto;
        }

        //add a google_value object to db
        public static google_value AddGoogleValue(string value)
        {
            SwapDbConnection db = new SwapDbConnection();
            google_value google_obj = new google_value()
            {
                google_value_id = IdService.generateID("google_value_id"),
                value = value
            };
            db.google_value.Add(google_obj);
            db.SaveChanges();
            return google_obj;
        }

        //add a google_value object to db
        public static bool deleteGoogleValue(string id)
        {
            SwapDbConnection db = new SwapDbConnection();
            google_value google_obj = db.google_value.Where(x => x.google_value_id == id).FirstOrDefault();
            if (google_obj == null)
                return false;
            db.google_value.Remove(google_obj);
            db.SaveChanges();
            return true;
        }
    }
}
