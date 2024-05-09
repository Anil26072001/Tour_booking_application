
var ComplentListVariables = {
    Viewdisplay: ".View_Display",
    Delete: ".delete",
    update: ".update-details"

};


$(document).ready(function () {

    console.log("loaded");
    //Getting all Details from api for displaying to View
    $.ajax({

        url: 'https://localhost:7110/api/TourBookingDetails/GetTourbook',
        type: 'Get',
        success: function (response) {
            console.log(response);
            var tbody = $('#tbody');

            response.forEach(function (item) {
                var row = $('<tr>');
                row.append('<td>' + item.tourBookingId + '</td>');
                row.append('<td>' + item.firstName + '</td>');
                row.append('<td>' + item.lastName + '</td>');
                row.append('<td>' + item.email + '</td>');
                row.append('<td>' + item.phone + '</td>');
                row.append('<td>' + item.timeofIncident + '</td>');
                row.append('<td>' + item.howmanypeople + '</td>');
                row.append('<td>' + item.besttimeofday + '</td>');

                row.append('<td>' + '<a href="/TourController1/DisplayView/' + item.tourBookingId + '" class="Viewdisplay">View</a>' + '</td>');

                row.append('<td>' + '<a href="' + item.tourBookingId + '" class="update-details">Update</a>' + '</td>');

                row.append('<td>' + '<a href="/TourBookingDetails/DeleteTourbook/' + item.tourBookingId + '"class="Delete">Delete</a>' + '</td>');

                tbody.append(row);

            });

        },
        error: function () {

        }


    });
    
    

    $(document).on('click', '.View_Display', function () {
        e.preventDefault();
        var id = parseInt($(this).attr('href'), 0); // Extracting the id from href
        console.log(id);


        window.location.href = '/TourBookingDetails/GetTourbook?id=' + id;

    });

    $(document).on('click', '.Delete', function (e) {
        e.preventDefault();
        var id = parseInt($(this).attr('href').split('/').pop(), 0);
        console.log(id);
       
        $.ajax({
            url: `https://localhost:7110/api/TourBookingDetails/DeleteTourbook/` + id,
            type: 'Delete',
            success: function (Response) {
                console.log(Response);

                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                });




                window.location.href = '/TourController1/TourbookingList';

            },
            error: function () {
                console.log("Error Occured");

            }

        });
    }) 


    $(document).on("click", ".update-details", function (e) {
        console.log('anil');
        e.preventDefault();
        // var id = parseInt($(this).attr("data-id"), 0);
        var id = parseInt($(this).attr('href'), 0);
        console.log(id);
        window.location.href = '/TourController1/Update/' + id;
    });






























});











