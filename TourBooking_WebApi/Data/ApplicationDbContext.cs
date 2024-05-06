using Microsoft.EntityFrameworkCore;
using TourBooking_WebApi.Models;

namespace TourBooking_WebApi.Data
{
    public class ApplicationDBContext : DbContext
    {


        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {


        }

    

        public DbSet<TourBooking> TourBookings { get; set; }

        public DbSet<Country> Countries { get; set; }

        public DbSet<City> Cities { get; set; }
    }
}
