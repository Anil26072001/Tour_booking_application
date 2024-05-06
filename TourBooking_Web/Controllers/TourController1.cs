using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Collections.Generic;
using TourBooking_Web.Models.DTO;
using Newtonsoft.Json;
using System.Text;
using TourBooking_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace TourBooking_Web.Controllers
{
    public class TourController1 : Controller
    {

        private readonly IHttpClientFactory httpClientFactory;
        private readonly HttpClient _client;
        Uri baseaddress = new Uri("https://localhost:7110/api");
        public TourController1(IHttpClientFactory httpClientFactory)
        {
            this.httpClientFactory = httpClientFactory;
            _client = new HttpClient();
            _client.BaseAddress = baseaddress;
        }

        public async Task<IActionResult> TourbookingList()
        {
            try
            {
                var client = httpClientFactory.CreateClient();
                var httpResponseMessage = await client.GetAsync("https://localhost:7110/api/TourBookingDetails/GetTourbook");
                httpResponseMessage.EnsureSuccessStatusCode();
                var StringResponseBody = await httpResponseMessage.Content.ReadAsStringAsync();

                var list = JsonConvert.DeserializeObject<List<TourbookingDto>>(StringResponseBody);

                View(list);

                ViewBag.Response = StringResponseBody;
            }
            catch (Exception ex)
            {

                throw;
            }
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> PostFormDetails(string mode = "submit")
        {

            HttpResponseMessage response = await _client.GetAsync(baseaddress + "/TourBookingDetails/Countries");
            if (response.IsSuccessStatusCode)
            {
                string responseData = await response.Content.ReadAsStringAsync();
                List<Country> countryList = JsonConvert.DeserializeObject<List<Country>>(responseData);
                ViewBag.ListCountry = countryList;
            }
            ViewBag.Mode = mode;
            return View();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<City>>> GetCityDropdownList(int CountryId)
        {
            HttpResponseMessage httpResponse = await _client.GetAsync($"{baseaddress}/TourBookingDetails/Cities/{CountryId}");

            if (httpResponse.IsSuccessStatusCode)
            {
                string responsedata = await httpResponse.Content.ReadAsStringAsync();
                List<City> citylist = JsonConvert.DeserializeObject<List<City>>(responsedata);
                return citylist;
            }
            return null;

        }

        [HttpPost]
        public IActionResult PostFormDetails(TourBookingviewmodel model)
        {
            try
            {
                string data = JsonConvert.SerializeObject(model);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage response = _client.PostAsync(_client.BaseAddress + "/TourBookingDetails/PostTourBooking", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    TempData["SuccessMessage"] = "tourbookingDetails Added successfully:";
                    return RedirectToAction("TourbookingList");
                }
                return View();
            }
            catch (Exception ex)
            {
                TempData["ErrorMessage"] = ex.Message;
                return View();
            }
        }
        public IActionResult DisplayView(int id)
        {
            try
            {





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