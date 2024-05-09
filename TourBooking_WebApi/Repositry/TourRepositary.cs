using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TourBooking_WebApi.Data;
using TourBooking_WebApi.Models;
using TourBooking_WebApi.Models.DTO;

namespace TourBooking_WebApi.Repositry
{
    public class TourRepositary : ITourRepositary
    {
        private readonly ApplicationDBContext _context;
        public TourRepositary(ApplicationDBContext context)
        {
            _context = context;
        }


        public async Task<int> AddTourBook(TourBooking booking)
        //public int AddTourBook(TourBooking booking)
        {
            TourBooking tour = new TourBooking();
            tour.TourBookingId = booking.TourBookingId;
            tour.FirstName = booking.FirstName;
            tour.LastName = booking.LastName;
            tour.Email = booking.Email;
            tour.Phone = booking.Phone;
            tour.City = booking.City;
            tour.Country = booking.Country;
            tour.TimeofIncident = booking.TimeofIncident;
            tour.Howmanypeople = booking.Howmanypeople;
            tour.Whichtoursorevents = booking.Whichtoursorevents;
            tour.bestwaytocontact = booking.bestwaytocontact;
            tour.besttimeofday = booking.besttimeofday;
            tour.AnythingElse = booking.AnythingElse;
            tour.HowDidYouHear = booking.HowDidYouHear;


            var res = _context.TourBookings.Add(booking);
            int i;

            if (res != null)
            {

                i = await _context.SaveChangesAsync();
                return i;

            }
            return 0;
        }
        public async Task<IEnumerable<TourBooking>> GetAllTourbook()
        {
            {
                try
                {
                    var getall = _context.TourBookings.Where(u => u.IsActive == true).ToList();
                    return getall;
                }
                catch (Exception)
                {
                    throw;
                }
            }

        }

        public async Task<int> Delete(int id )
      
        {
            int i = 0;
            var deleteid = _context.TourBookings.Find(id);

            if (deleteid != null)
            {
                 deleteid.IsActive = false;
                i = await _context.SaveChangesAsync();                

            }
            return i;
        }


        public int GetAllUpdate(int id, TourbookingAddDto tourbook)
        {
            try
            {
                //var update = _context.TourBookings.Where(u =>u.TourBookingId==id).First();
                var update = _context.TourBookings.FirstOrDefault(u => u.TourBookingId == id);


                if (update != null)
                {

                    update.FirstName = tourbook.FirstName;
                    update.LastName = tourbook.LastName;
                    update.Email = tourbook.Email;
                    update.Phone = tourbook.Phone;
                    update.TimeofIncident = tourbook.TimeofIncident;
                    update.Howmanypeople = tourbook.Howmanypeople;
                    update.Whichtoursorevents = tourbook.Whichtoursorevents;
                    update.bestwaytocontact = tourbook.bestwaytocontact;
                    update.besttimeofday = tourbook.besttimeofday;
                    update.AnythingElse = tourbook.AnythingElse;
                    update.HowDidYouHear = tourbook.HowDidYouHear;
                    update.CityId = tourbook.CityId;
                    update.CountryId = tourbook.CountryId;


                    int success = _context.SaveChanges();
                    return success;
                }

                return 0;



            }
            catch (Exception)
            {

                throw;
            }


        }

        public async Task<ActionResult<TourBooking>> GetDetailsbyId(int? id)
        {
            try
            {
                var result = await _context.TourBookings.FindAsync(id);
                return result;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<Country>> GetCountries()
        {
            try
            {
                return await _context.Countries.ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<String> Getexistingcity(int id)
        {
            try
            {
                var existingdetails = _context.TourBookings.FirstOrDefault(i => i.TourBookingId == id);
                if (existingdetails != null)
                {
                    var cityname = await _context.Cities.Where(x => x.CityId == existingdetails.CityId).Select(i => i.CityName).FirstOrDefaultAsync();
                    return cityname;
                }
                return "";
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<String> GetexistingCountry(int id)
        {
            try
            {
                var existingdetails = _context.TourBookings.FirstOrDefault(i => i.TourBookingId == id);
                if (existingdetails != null)
                {
                    var countryname = await _context.Countries.Where(x => x.CountryId == existingdetails.CountryId).Select(i => i.CountryName).FirstOrDefaultAsync();
                    return countryname;
                }
                return "";

            }
            catch (Exception)
            {

                throw;
            }
           
        }






        public async Task<List<City>> GetCities(int countryid)
        {
            try
            {
                return await _context.Cities.Where(x => x.CountryId == countryid).ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }


    }
}
