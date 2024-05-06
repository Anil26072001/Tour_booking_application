namespace TourBooking_WebApi.Models
{
    public class TourBooking
    {
        public int TourBookingId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? TimeofIncident { get; set; }
        public int Howmanypeople { get; set; }
        public string? Whichtoursorevents { get; set; }
        public string? bestwaytocontact { get; set; }
        public string? besttimeofday { get; set; }
        public string? AnythingElse { get; set; }
        public string? HowDidYouHear { get; set; }
        public bool IsActive { get; set; } = true;

        public int CountryId { get; set; }
        public virtual Country Country { get; set; }

        public int CityId { get; set; }
        public virtual City City { get; set; }

    }
}
