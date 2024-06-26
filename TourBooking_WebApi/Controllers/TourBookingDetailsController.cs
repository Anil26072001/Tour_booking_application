﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using TourBooking_WebApi.Data;
using TourBooking_WebApi.Models;
using TourBooking_WebApi.Models.DTO;
using TourBooking_WebApi.Repositry;

namespace TourBooking_WebApi.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class TourBookingDetailsController : ODataController
    {

        private readonly TourRepositary _tourRepositary;
        private readonly ApplicationDBContext _db;
        public TourBookingDetailsController(TourRepositary tourRepository, ApplicationDBContext db)
        {
            _tourRepositary = tourRepository;
            _db = db;

        }

        //[EnableQuery]
        //[HttpGet]
        //[Route("api/TourBookingDetails/GetTourbook")]
        //public async Task<ActionResult<IEnumerable<TourBooking>>> GetTourbook()
        //{
        //    try
        //    {
        //        if (_tourRepositary == null) return NotFound();
        //        var list = await _tourRepositary.GetAllTourbook();
        //        return Ok(list);
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        [HttpGet,Route("api/TourBookingDetails/GetTourbook")]
        public IActionResult GetallDetails(ODataQueryOptions<TourBooking> options)
        { 
            try
            {   
                // var query = _db.TourBookings.AsQueryable();
                var query = _db.TourBookings.Where(tb => tb.IsActive == true).AsQueryable();
                var results = options.ApplyTo(query);
                return Ok(results);
            }
            catch (Exception)
            {
                throw;
            }
        }




        [HttpGet]
        [Route("api/TourBookingDetails/GetDetailsbyId/{id}")]
        public async Task<ActionResult<TourBooking>> GetDetailsbyId(int? id)
        {
            try
            {
                if (_db == null)
                {
                    return NotFound();
                }

                var details = await _tourRepositary.GetDetailsbyId(id);
                return details;
            }
            catch (Exception)
            {
                throw;
            }
        }



        [HttpPost]
        [Route("api/TourBookingDetails/PostTourBooking")]
        public async Task<ActionResult<TourBooking>> TourBookPost(TourbookingAddDto booking)
        {
            try
            {
                if (_tourRepositary == null)
                {
                    NotFound();
                }

                TourBooking obj = new TourBooking();
                //obj.TourBookingId = booking.TourBookingId;
                obj.FirstName = booking.FirstName;
                obj.LastName = booking.LastName;
                obj.Email = booking.Email;
                obj.Phone = booking.Phone;
                obj.CityId = booking.CityId;
                obj.CountryId = booking.CountryId;
                obj.TimeofIncident = booking.TimeofIncident;
                obj.Howmanypeople = booking.Howmanypeople;
                obj.Whichtoursorevents = booking.Whichtoursorevents;
                obj.bestwaytocontact = booking.bestwaytocontact;
                obj.besttimeofday = booking.besttimeofday;
                obj.AnythingElse = booking.AnythingElse;
                obj.HowDidYouHear = booking.HowDidYouHear;

                var result = await _tourRepositary.AddTourBook(obj);

                //CreatedAtAction("", new {id=booking.TourBookingId},booking);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }

        }

        [HttpPut]
        [Route("api/TourBookingDetails/PutTourBook/{id}")]
        public async Task<ActionResult<int>> PutUpdateTourBook(int id, TourbookingAddDto details)
        {
            try
            {
                var updatedetails = _tourRepositary.GetAllUpdate(id, details);

                if (updatedetails != null)
                {
                    return Ok(updatedetails);
                }
                return Problem("Update Details is getting null");
            }
            catch (Exception)
            {
                    throw;
            }

        }


        [HttpDelete("api/TourBookingDetails/DeleteTourbook/{id}")]
        public async Task<int> Delete(int id)
        {
            try
            {
                int deletedUser = await _tourRepositary.Delete(id);

                if (deletedUser == null)
                {
                    return 0;
                }
                return 1;
            }
            catch (Exception)
            {
                return 1;
            }
        }

        [HttpGet("api/TourBookingDetails/Countries")]
        public async Task<ActionResult<IEnumerable<Country>>> GetCountries()
        {
            try
            {
                var countries = await _tourRepositary.GetCountries();
                return Ok(countries);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }


        [HttpGet("api/TourBookingDetails/countrydropdown/{id}")]
        public async Task<ActionResult<Country>> countrydropdown(int id)
        {
            try
            {
                //var Details = _db.TourBookings.Find(id);

                var Country = (from country in _db.Countries
                               where country.CountryId == id
                               select new { CountryName = country.CountryName }).First();


                return Ok(Country);
            }
            catch (Exception)
            {

                throw;
            }



        }
        [HttpGet("api/TourBookingDetails/citydropdown/{id}")]
        public async Task<ActionResult<City>> citydropdown(int id)
        {
            // var Details = _db.TourBookings.Find(id);
            try
            {
                var City = (from city in _db.Cities
                            where city.CityId == id
                            select new { CityName = city.CityName }).FirstOrDefault();

                return Ok(City);


            }
            catch (Exception)
            {

                throw;
            }
           
        }


        [HttpGet("api/TourBookingDetails/Cities/{CountryId:int}")]
        public async Task<ActionResult<IEnumerable<City>>> GetCities(int CountryId)
        {
            try
            {
                var cities = await _tourRepositary.GetCities(CountryId);
                return Ok(cities);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }




        [HttpGet("api/TourBookingDetails/ExistingCity/{id:int}")]
        public async Task<ActionResult<string>> GetexistingCity(int id)
        {
            try
            {
                var existingcityName = await _tourRepositary.Getexistingcity(id);
                return Ok(existingcityName);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("api/TourBookingDetails/Existingcountry/{id:int}")]
        public async Task<ActionResult<string>> Getexisitingcountry(int id)
        {
            try
            {
                var exitcoun = await _tourRepositary.GetexistingCountry(id);
                return Ok(exitcoun);
            }
            catch (Exception)
            {
                throw;
            }
            
        }

    }
}

       
    


    


