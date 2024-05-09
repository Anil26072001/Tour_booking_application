using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Collections.Generic;
using TourBooking_Web.Models.DTO;
using Newtonsoft.Json;
using System.Text;
using TourBooking_Web.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace TourBooking_Web.Controllers
{
    public class TourController1 : Controller
    {

        private readonly HttpClient _client;
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory httpClientFactory;
        public TourController1(HttpClient client, IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            this.httpClientFactory = httpClientFactory;
            _client = client;
            _configuration = configuration;

        }



        //private readonly IHttpClientFactory httpClientFactory;
        //private readonly HttpClient _client;

        //Uri baseaddress = new Uri("https://localhost:7110/api");

        //private readonly IConfiguration _configuration;

        //public TourController1(IHttpClientFactory httpClientFactory)
        //{
        //    this.httpClientFactory = httpClientFactory;
        //    _client = new HttpClient();
        //    //_configuration = configuration;
        //    _client.BaseAddress = baseaddress;
        //}

        //list page
        public async Task<IActionResult> TourbookingList()
        {
            try
            {
                var baseurl = _configuration["Appsettings:BaseUrl"];
                ViewBag.hostname=baseurl;
                
                return View();

                
            }
            catch (Exception ex)
            {

                throw;
            }
            return View();
        }
        [HttpGet]
        //post form
        public async Task<IActionResult> PostFormDetails(string mode = "submit")
        {

      
            var baseurl = _configuration["Appsettings:BaseUrl"];
            ViewBag.hostname = baseurl;

            ViewBag.Mode = mode;
            return View();
        }
       

        [HttpPost]
        public IActionResult PostFormDetails(TourBookingviewmodel model)
        {
            try
            {
                return View();

            }
            catch (Exception)
            {

                throw;
            }
            
                
            
        }

        public IActionResult DisplayView(int id)
        {
            try
            {
                var baseurl = _configuration["Appsettings:BaseUrl"];
                ViewBag.hostname = baseurl;

                ViewBag.Id = id;

                return View();

            }
            catch (Exception)
            {
                throw;
            }
        }
        
        [HttpGet]
        public IActionResult Update(int id)
        {
            try
            {
                var baseurl = _configuration["Appsettings:BaseUrl"];
                ViewBag.hostname = baseurl;

                ViewBag.Id = id;

                return View();


            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        public IActionResult Update(TourBookingviewmodel model)
        {



           return View();
        }
        
        public IActionResult Delete(int id)
        {

            HttpResponseMessage responce = _client.DeleteAsync(_client.BaseAddress + "/TourBookingDetails/DeleteTourbook/" + id).Result;

            return RedirectToAction("TourbookingList");

        }
    }
}