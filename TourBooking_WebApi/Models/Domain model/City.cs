namespace TourBooking_WebApi.Models
{
    public class City
    {
        public int CityId { get; set; }

        public string? CityName { get; set; }

        public int CountryId { get; set; }
        public virtual Country Country { get; set; }
        public bool IsActive { get; set; } = true;

    }
}
