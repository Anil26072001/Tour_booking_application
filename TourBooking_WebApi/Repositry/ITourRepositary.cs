using Microsoft.AspNetCore.Mvc;
using TourBooking_WebApi.Models;
using TourBooking_WebApi.Models.DTO;

namespace TourBooking_WebApi.Repositry
{
    public interface ITourRepositary
    {
        
        Task<int>AddTourBook(TourBooking booking);

        Task<IEnumerable<TourBooking>> GetAllTourbook();
        

        Task<int> Delete(int id);

        Task<List<Country>> GetCountries();
        Task<List<City>> GetCities(int countryid);
       

        Task<ActionResult<TourBooking>> GetDetailsbyId(int? id);
        int GetAllUpdate(int id,TourbookingAddDto details);

     
    }
}
