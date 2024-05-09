
$(document).ready(function () {
 //$.ajax({
        //    url: 'https://localhost:7110/api/TourBookingDetails/Countries',
        //    type: 'GET',
        //    success: function (response) {
        //        console.log(response);
        //       response.forEach(function (country) {
        //            // Append each country as an option to the dropdown menu
        //            $('#country').append($('<option>', {
        //                value: country.id,
        //                text: country.name
        //            }));
        //        });
        //    },
        //    error: function () {
        //        console.log("Error fetching country list");
        //    }
        //});
    
    var baseid = $("#base").data('base');
    var id = parseInt($("#tourbookId").val(), 0);
    $.ajax({
        url: baseid +'/api/TourBookingDetails/GetDetailsbyId/'+ id,
        type: 'Get',
        success: function (Response) {
            console.log(Response);

            $('#FirstName').val(Response.firstName);
            $('#lastname').val(Response.lastName);
            $('#email').val(Response.email);
            $('#Phone').val(Response.phone);
            $('#Date').val(Response.timeofIncident);
            $('#howmanypeople').val(Response.howmanypeople);
            $('#whichtoursorevents').val(Response.whichtoursorevents);

            $('#anythingElse').val(Response.anythingElse);


            $('#howDidYouHear').val(Response.howDidYouHear);


            if (Response.bestwaytocontact === "Phone") {
                $("#phonecheckbox").prop('checked', true);
            }
            else if (Response.bestwaytocontact === "Email") {
                $("#emailcheckbox").prop('checked', true);
            }
            else {
                $("#eithercheckbox").prop('checked', true);
            }

            /*('#besttimeofday').val(Response.besttimeofday);*/


            if (Response.besttimeofday === "8-11 Am ") {
                $("#eightradio").prop('checked', true);
            }
            else if (Response.besttimeofday === "12-4 Pm ") {
                $("#twlradio").prop('checked', true);
            }
            else /*(Response.bestwaytocontact === "6-10 PM")*/ {
                $("#sixradio").prop('checked', true);
            }

            var countryid = Response.countryId;
            console.log(countryid);
            var baseid = $("#base").data('base');
            
            $.ajax({
                url: baseid +'/api/TourBookingDetails/countrydropdown/' + countryid,
                type: 'GET',
                success: function (Countries) {
                    // Populate country dropdown
                    var countryDropdown = $('#country');
                    console.log(countryDropdown);
                    console.log(Countries);

                    console.log(Countries.countryName);

                    countryDropdown.empty();
                    let Countrydetails = '';

                    Countrydetails += '<option value="' + Countries.countryid + '">' + Countries.countryName + '</option>';

                    countryDropdown.html(Countrydetails);

                   
                    
                    var cityid = Response.cityId;
                    console.log(cityid);
                    var baseid = $("#base").data('base');
                    $.ajax({
                        url: baseid +'/api/TourBookingDetails/citydropdown/' + cityid,
                        type: 'GET',
                        success: function (Cities) {
                            var cityDropdown = $('#CityId');
                            cityDropdown.empty();

                            //citydropdown.append($('<option>', {
                            //    value: city.cityid,
                            //    text: city.cityname
                            //}));



                            let citydetails = '';

                            citydetails += '<option value="' + Cities.cityId + '">' + Cities.cityName + '</option>';

                            cityDropdown.html(citydetails);

                            //cityDropdown.val(Cities.cityName);
                        },
                        error: function (xhr, status, error) {
                            console.error(xhr.responseText);
                        }
                    });
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });


        },
        error: function () {
            console.log("Error Occured");

        }

    });
})





















//$(document).ready(function () {
//    var id = parseInt($("#tourbookId").val(), 0);
//    $.ajax({
//        url: `https://localhost:7110/api/TourBookingDetails/GetDetailsbyId/` + id,
//        type: 'Get',
//        success: function (Response) {
//            $('#FirstName').val(Response.firstName);
//            $('#lastname').val(Response.lastName);
//            $('#email').val(Response.email);
//            $('#Phone').val(Response.phone);
//            $('#Date').val(Response.timeofIncident);
//            $('#howmanypeople').val(Response.howmanypeople);
//            $('#whichtoursorevents').val(Response.whichtoursorevents);
//            $('#anythingElse').val(Response.anythingElse);
//            $('#howDidYouHear').val(Response.howDidYouHear);

//            if (Response.bestwaytocontact === "Phone") {
//                $("#phonecheckbox").prop('checked', true);
//            } else if (Response.bestwaytocontact === "Email") {
//                $("#emailcheckbox").prop('checked', true);
//            } else {
//                $("#eithercheckbox").prop('checked', true);
//            }

//            if (Response.besttimeofday === "8-11 Am ") {
//                $("#eightradio").prop('checked', true);
//            } else if (Response.besttimeofday === "12-4 Pm ") {
//                $("#twlradio").prop('checked', true);
//            } else {
//                $("#sixradio").prop('checked', true);
//            }

//            var countryid = Response.countryId;
//            $.ajax({
//                url: 'https://localhost:7110/api/TourBookingDetails/Existingcountry/' + countryid,
//                type: 'GET',
//                success: function (Countries) {
//                    var countryDropdown = $('#country');
//                    countryDropdown.empty();
//                    countryDropdown.append($('<option>', {
//                        value: Countries.countryId,
//                        text: Countries.countryName
//                    }));
//                    countryDropdown.val(Countries.countryName);

//                    var cityid = Response.cityId;
//                    $.ajax({
//                        url: 'https://localhost:7110/api/TourBookingDetails/citydropdown/' + cityid,
//                        type: 'GET',
//                        success: function (Cities) {
//                            var cityDropdown = $('#CityId');
//                            cityDropdown.empty();
//                            let citydetails = '';
//                            citydetails += '<option value="' + Cities.cityId + '">' + Cities.cityName + '</option>';
//                            cityDropdown.html(citydetails);
//                        },
//                        error: function (xhr, status, error) {
//                            console.error(xhr.responseText);
//                        }
//                    });
//                },
//                error: function (xhr, status, error) {
//                    console.error(xhr.responseText);
//                }
//            });
//        },
//        error: function () {
//            console.log("Error Occurred");
//        }
//    });
//});
