$(document).ready(function () {
    
   // var CheckExpression = true;
    var id = parseInt($("#tourbookId").val());
    console.log(id);
    var baseid = $("#base").data('base');

    $.ajax({
        url: baseid + '/api/TourBookingDetails/GetDetailsbyId/' + id,

        type: 'Get',
        success: function (Response) {
            console.log(Response);

            $('#FirstName').val(Response.firstName);
            $('#lastname').val(Response.lastName);
            $('#email').val(Response.email);
            $('#cityid').val(Response.cityId);

            $('#countryId').val(Response.countryId);


            //cityID = Response.cityId;
            //console.log(cityID);

            //var CityContainer = $('#Cityid');
            //$.ajax({
            //    url: 'https://localhost:7110/api/TourBookingDetails/ExistingCity/' + id,
            //    type: "GET",
            //    success: function (data) {
            //        console.log(data);
            //        let citydetails = '';
            //        citydetails += '<option value="' + cityID + '">' + data + '</option>';
            //        CityContainer.html(citydetails);
            //    },
            //    error: function (xhr, status, error) {
            //        console.error(xhr.responseText);
            //        console.error(status);
            //        console.error(error);
            //        alert('An error occurred while processing your request.');
            //    }
            //})

            $('#phonenum').val(Response.phone);
            $('#Date').val(Response.timeofIncident);
            $('#howmanypeople').val(Response.howmanypeople);
            $('#whichtoursorevents').val(Response.whichtoursorevents);
            $('#anythingElse').val(Response.anythingElse);
            $('#howDidYouHear').val(Response.howDidYouHear);

            if (Response.bestwaytocontact === "Phone") {
                $("#phonecheckbox").prop('checked', true);
            } else if (Response.bestwaytocontact === "Email") {
                $("#emailcheckbox").prop('checked', true);
            } else {
                $("#eithercheckbox").prop('checked', true);
            }


            if (Response.besttimeofday === "8-11 Am ") {
                $("#eightradio").prop('checked', true);
            } else if (Response.besttimeofday === "12-4 Pm ") {
                $("#twlradio").prop('checked', true);
            } else {
                $("#sixradio").prop('checked', true);
            }

            var baseid = $("#base").data('base');
            var ddlCountry = $('#countrySelect');

            $.ajax({
                url: baseid + '/api/TourBookingDetails/Countries',

                type: "GET",
                dataType: 'json',
                success: function (countriesdata) {
                    console.log(countriesdata);
                    ddlCountry.empty();
                    countriesdata.forEach(function (country) {

                        ddlCountry.append($('<option>', {
                            value: country.countryId,
                            text: country.countryName
                        }));
                    });
                    ddlCountry.val(Response.countryId);
                    //getting 
                    var baseid = $("#base").data('base');
                    var citycontainer = $('#Cityid');
                    $.ajax({
                        url: baseid +'/api/TourBookingDetails/Cities/' + Response.countryId,
                        type: "GET",
                        success: function (citiesdata) {
                            console.log(citiesdata);

                            citycontainer.empty();

                            citiesdata.forEach(function (city) {

                                citycontainer.append($('<option>', {
                                    value: city.cityId,
                                    text: city.cityName
                                }));
                            });
                            citycontainer.val(Response.cityId);
                        },
                        error: function (xhr, status, error) {
                            console.error(xhr.responseText);
                            console.error(status);
                            console.error(error);
                            alert('An error occurred while processing your request.');
                        }
                    })
    });




    //$.ajax({
    //    url: 'https://localhost:7110/api/TourBookingDetails/Existingcountry/' + id,
    //    type: "GET",
    //    success: function (countryName) {
    //        console.log(countryName);
    //        var CountryContainer = $('#countrySelect');
    //        var countrydetails = '<option value="' + id + '">' + countryName + '</option>';
    //        CountryContainer.html(countrydetails);

                    $("#countrySelect").on("change", function () {
                        var countryId = $("#countrySelect").val();
                        var citycontainer = $("#Cityid");
                        var baseid = $("#base").data('base');

                        $.ajax({
                            url: baseid +'/api/TourBookingDetails/Cities/' +countryId,
                            type: "GET",
                            dataType: 'json',
                            success: function (citiesdata) {
                                console.log(citiesdata);
                                citycontainer.empty();
                                

                                    $("#Cityid").append($('<option>', {
                                        value: '',
                                        text: '--Please select City--',
                                    }));
                                    $.each(citiesdata, function (index, city) {
                                        $('#Cityid').append($('<option>', {
                                            value: city.cityId,
                                            text: city.cityName
                                        }));
                                    });
                                   
                                
                            },
                            error: function (xhr, status, error) {
                                console.error(xhr.responseText);
                                console.error(status);
                                console.error(error);
                                alert('An error occurred while processing your request.');
                            }
                        });
                    });
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                    console.error(status);
                    console.error(error);
                    alert('An error occurred while processing your request.');
                }
            });





        },

        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
    //$.ajax({
    //    url: 'https://localhost:7110/api/TourBookingDetails/Existingcountry/' + id,
    //    type: "GET",
    //    success: function (data) {
    //        console.log(data);
    //        var CountryContainer = $('#countrySelect');
    //        var countrydetails = '<option value="' + id + '">' + data + '</option>';
    //        CountryContainer.html(countrydetails);

    //        // Fetch all countries and append them to the dropdown
    //        $.ajax({
    //            url: 'https://localhost:7110/api/TourBookingDetails/Countries',
    //            type: 'GET',
    //            success: function (response) {
    //                console.log(response);
    //                $.each(response, function (i, country) {
    //                    if (country.countryId !== id) {
    //                        CountryContainer.append($("<option></option>").val(country.countryId).html(country.countryName));
    //                    }
    //                });
    //            },
    //            error: function (xhr, status, error) {
    //                console.error(xhr.responseText);
    //            }
    //        });
    //    },
    //    error: function (xhr, status, error) {
    //        console.error(xhr.responseText);
    //        console.error(status);
    //        console.error(error);
    //        alert('An error occurred while processing your request.');
    //    }
    //});

    //$("#countrySelect").on("change", function () {
    //    var countryId = $("#countrySelect").val();
    //    var citycontainer = $("#Cityid");

    //    citycontainer.append($('<option></option>').val(''));
    //    $.ajax({
    //        url: 'https://localhost:7110/api/TourBookingDetails/Cities/' + countryId,
    //        type: "GET",
    //        dataType: 'json',
    //        success: function (data) {
    //            console.log(data);
    //            citycontainer.empty();
    //            citycontainer.append($("<option></option>").val('').html("--Please select City--"));
    //            $.each(data, function (i, cities) {
    //                citycontainer.append($("<option></option>").val(cities.cityId).html(cities.cityName));

    //            });
    //        },
    //        error: function (xhr, status, error) {
    //            console.error(xhr.responseText);
    //            console.error(status);
    //            console.error(error);
    //            alert('An error occurred while processing your request.');
    //        }
    //    })


    //});
   
});


var CheckExpression = true;
var radio;
    var TourbookVariable = {
        FirstName: "#FirstName",
        FirstnameError: "#FirstnameError",
        firstnameErrorIcons: "#FirstnameErrorIcons",
        LastName: "#lastname",
        LastnameError: "#lastnameError",
        lastnameErrorIcons: "#LastnameErrorIcons",
        Email: "#email",
        EmailError: "#emailError",
        EmailErrorIcons: "#emailErrorIcons",
        PhoneNumber: "#phonenum",
        PhoneNumberErrorIcon: "#phoneNumberErrorIcon",
        PhoneNumberError: "#phoneNumberError",

        Phonecheckbox: "#phonecheckbox",
        Emailcheckbox: "#emailcheckbox",
        Eithercheckbox: "#eithercheckbox",
        dateerror: "#dateerror",
        Dateerroricon: "#dateerroricon",
        Howmanypeople: "#howmanypeople",
        HowmanypeopleError: "#howmanypeopleError", 
        HowmanypeopleErroricon: "#howmanypeopleErroricon",

        Whichtoursorevents: "#whichtoursorevents",
        Whichtoursoreventserror: "#Whichtoursoreventserror",
        WhichtoursoreventserrorIcon: "#Whichtoursoreventserroricon",
        Phonecheckbox: "#phonecheckbox",
        Emailcheckbox: "#emailcheckbox",
        Eithercheckbox: "#eithercheckbox",
        statuserror: "#statuserror",
        Statuserroricon: "#statuserroricon",

        besttimeofday: "#Besttimeofday",
        AnythingElse: "#anythingElse",
        HowDidYouHear: "#howDidYouHear",
     
        Eightradio: "#eightradio",
        twlradio: "#twlradio",
        sixradio: "#sixradio",
        radiobuttonstatus: "#radiobuttonstatus"

    };
    /*!/^[a-zA-Z]{1}[a-zA-Z\s]+$/*/
    $(TourbookVariable.FirstName).on('input', function () {
        var name = $(TourbookVariable.FirstName).val();
        if (!/^[a-zA-Z][a-zA-Z\s]+$/.test(name)) {
            $(TourbookVariable.FirstnameError).text("FirstName should only contain letters").show();
            $(TourbookVariable.firstnameErrorIcons).show();
            IsValid = false;
            CheckExpression = false;
        } else {
            $(TourbookVariable.FirstnameError).hide();
            $(TourbookVariable.firstnameErrorIcons).hide();
            CheckExpression = true;
        }
    });
    $(TourbookVariable.LastName).on('input', function () {
        var lastname = $(TourbookVariable.LastName).val();
        if (!/^[a-zA-Z]{1}[a-zA-Z\s]+$/.test(lastname)) {
            $(TourbookVariable.LastnameError).text("Last Name should only contain letters").show();
            $(TourbookVariable.lastnameErrorIcons).show();
            CheckExpression = false;
        } else {
            $(TourbookVariable.LastnameError).hide();
            $(TourbookVariable.lastnameErrorIcons).hide();
            CheckExpression = true;
        }
    });
    $(TourbookVariable.Email).on('input', function () {
        var email = $(this).val();
        if (!/^[a-z]{1}[a-z0-9]+@gmail\.com$/.test(email)) {
            $(TourbookVariable.EmailError).text('Enter a valid email address').show();
            $(TourbookVariable.EmailErrorIcons).show();
            CheckExpression = false;

        } else {
            $(TourbookVariable.EmailError).hide();
            $(TourbookVariable.EmailErrorIcons).hide();
            if (email.trim() !== '') {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid is-invalid');
                CheckExpression = true;
            }
            
        }
    });



//$("#country").on("click", function () {
//    var countryinputval = $("#country").val();

//    console.log(countryinputval);

//    if (countryinputval === '') {
//        $(TourbookVariable.CountryError).text('Please select Country Dropdownlist').show();
//        $(TourbookVariable.CountryErrorIcon).show();
//        CheckExpression = false;
//    }
//    else {
//        $(TourbookVariable.CountryError).hide();
//        $(TourbookVariable.CountryErrorIcon).hide();
//        CheckExpression = true;

//    }
//});
//$("#CityDropdown").on("click", function () {
//    var city = $("#CityDropdown").val();

//    if (city === '') {
//        $(TourbookVariable.CityError).text('Please select City Dropdownlist').show();
//        $(TourbookVariable.CityErrorIcon).show();
//        CheckExpression = false;
//    }
//    else {
//        $(TourbookVariable.CityError).hide();
//        $(TourbookVariable.CityErrorIcon).hide();
//        CheckExpression = true;

//    }
//});




    $(TourbookVariable.PhoneNumber).on('input', function () {
        var phoneNumber = $(this).val();
        var phonePattern = /^(?:\+?91|0)?[6789]\d{9}$/;
        
        if (!phonePattern.test(phoneNumber)) {
            $(TourbookVariable.PhoneNumberError).text('Enter a valid phone number').show();
            $(TourbookVariable.PhoneNumberErrorIcon).show();
            CheckExpression = false;

        } else {
            $(TourbookVariable.PhoneNumberError).hide();
            $(TourbookVariable.PhoneNumberErrorIcon).hide();
            if (phoneNumber.trim() !== '') {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid is-invalid');
                CheckExpression = true;
            }
        }
    });
    $(TourbookVariable.Howmanypeople).on('change', function () {
        var inputValue = $(this).val();
        var integerPattern = /^\d+$/;
        if (!integerPattern.test(inputValue)) {
            $(TourbookVariable.HowmanypeopleError).text("Plese choose one").show();
            $(TourbookVariable.HowmanypeopleError).show();
            CheckExpression = false;
        } else {
            $(TourbookVariable.HowmanypeopleError).hide();
            $(TourbookVariable.HowmanypeopleErroricon).hide();
            CheckExpression = true;

        }
    });
    $(TourbookVariable.TimeofIncident).on('input', function () {
        var inputValue = $(TourbookVariable.TimeofIncident).val();
        var parsedDate = new Date(inputValue);
        if (isNaN(parsedDate) || parsedDate.toString() === 'Invalid Date') {
            $(TourbookVariable.dateerror).text('Please enter a valid date').show();
            $(TourbookVariable.dateerroricon).show();
            CheckExpression = false;
        } else {

            $(TourbookVariable.dateerror).hide();
            $(TourbookVariable.dateerroricon).hide();
            CheckExpression = true;
        }
    });
    $(TourbookVariable.Whichtoursorevents).on('input', function () {
        var inputValue = $(TourbookVariable.Whichtoursorevents).val();
        if (inputValue.trim() === '') {
            $(TourbookVariable.Whichtoursoreventserror).text('Please enter which tours or events you are interested in').show();
            $(TourbookVariable.WhichtoursoreventserrorIcon).show();
            CheckExpression = false;
        } else {
            $(TourbookVariable.Whichtoursoreventserror).hide();
            $(TourbookVariable.WhichtoursoreventserrorIcon).hide();
            CheckExpression = true;
        }
    });


    $(TourbookVariable.Eightradio).on('change', function () {

         radio = "";
        console.log('checked');
        radio = "8-11 Am";
       // TourbookVariable.radiobtnvalue = "8-11 Am ";
       // console.log(TourbookVariable.radiobtnvalue);
        console.log(radio);
    });
    $(TourbookVariable.twlradio).on('change', function () {
        radio = "12-4 Pm ";
       // console.log(TourbookVariable.radiobtnvalue);

    });
    $(TourbookVariable.sixradio).on('change', function () {

        radio = "6-10 pm ";
       // console.log(TourbookVariable.radiobtnvalue);

    });




//function statusFunction() {

//    var status = '';
//    if ($(TourbookVariable.Eightradio).prop("checked")) {
//        status += '8-11 Am,';
//    }
//    if ($(TourbookVariable.twlradio).prop("checked")) {
//        status += '12-4 Pm,';
//    }
//    if ($(TourbookVariable.sixradio).prop("checked")) {
//        status += '6-10 pm,';
//    }
//    status = status.replace(/,$/, '');
//    if (status === '') {
//        $(TourbookVariable.statuserror).text('Please select  any one radiobutton').css('color', 'red').show();
//        $(TourbookVariable.Statuserroricon).show();


//    }
//    else if (status.indexOf(',') !== -1) {
//        $(TourbookVariable.statuserror).text('Please select  only one checkbox').css('color', 'red').show();
//        $(TourbookVariable.Statuserroricon).show();
//    }
//    else {
//        $(TourbookVariable.statuserror).hide();
//        $(TourbookVariable.Statuserroricon).hide();
//    }
//    return status;
//}











    function statusFunction() {

        var status = '';
        if ($(TourbookVariable.Phonecheckbox).prop("checked")) {
            status += 'Phone,';
        }
        if ($(TourbookVariable.Emailcheckbox).prop("checked")) {
            status += 'Email,';
        }
        if ($(TourbookVariable.Eithercheckbox).prop("checked")) {
            status += 'Either,';
        }
        status = status.replace(/,$/, '');
        if (status === '') {
            $(TourbookVariable.statuserror).text('Please select  any one checkbox').css('color', 'red').show();
            $(TourbookVariable.Statuserroricon).show();


        }
        else if (status.indexOf(',') !== -1) {
            $(TourbookVariable.statuserror).text('Please select  only one checkbox').css('color', 'red').show();
            $(TourbookVariable.Statuserroricon).show();
        }
        else {
            $(TourbookVariable.statuserror).hide();
            $(TourbookVariable.Statuserroricon).hide();
        }
        return status;
}





$('.status-item input[type="checkbox"]').on("change", function () {
    var status = $('status-item input[type = "checkbox"]:checked');

    if ($(TourbookVariable.Phonecheckbox).prop("checked")) {
        status += 'Phone,';
    }

    if ($(TourbookVariable.Emailcheckbox).prop("checked")) {
        status += 'Email,';
    }
    if ($(TourbookVariable.Eithercheckbox).prop("checked")) {
        status += 'Either,';
    }
    status = status.replace(/,$/, '');
    if (status === '') {
        $(TourbookVariable.statuserror).text('Please select  any one checkbox').css('color', 'red').show();
        $(TourbookVariable.Statuserroricon).show();
    }
    else if (status.indexOf(',') !== -1) {
        $(TourbookVariable.statuserror).text('Please select  only one checkbox').css('color', 'red').show();
        $(TourbookVariable.Statuserroricon).show();
    }
    else {
        $(TourbookVariable.statuserror).hide();
        $(TourbookVariable.Statuserroricon).hide();
    }
})
$("input[name='time']").on('change', function () {
    // Hide the error message when any radio button is selected
    $("#statuserrorradio").text("");
});

    $('#update-details').on("click", function (e) {
       

        var details = {
            FirstName:$('#FirstName').val(),
            lastName:$('#lastname').val(),
            Email:$('#email').val(),
            Phone: $('#phonenum').val(),
            TimeofIncident:$('#Date').val(),
            Howmanypeople:$('#howmanypeople').val(),
            Whichtoursorevents:$('#whichtoursorevents').val(),

            bestwaytocontact: statusFunction(),

            besttimeofday: radio,
            AnythingElse:$('#anythingElse').val(),
            HowDidYouHear:$('#howDidYouHear').val(),

            CountryId: parseInt($('#countrySelect').val(), 0),
            CityId: parseInt($('#Cityid').val(), 0),
            Id: parseInt($('#tourbookId').val())

        }


        var IsValid = true;
        if (details.FirstName == '') {
            $(TourbookVariable.FirstnameError).text('Please Enter FirstName').show();
            $(TourbookVariable.firstnameErrorIcons).show();
            IsValid = false;
            
        } else {
            var firstNameRegex = /^[A-Za-z]+$/;
            if (!firstNameRegex.test(details.FirstName)) {
                $(TourbookVariable.FirstnameError).text('Invalid FirstName').show();
                $(TourbookVariable.firstnameErrorIcons).show();
                IsValid = false;
            }
        }



        if (details.LastName == '') {
            $(TourbookVariable.LastnameError).text('Please Enter LastName').show();
            $(TourbookVariable.LastnameErrorIcons).show();
            IsValid = false;
        }
        else {
            var LastRegex = /^[A-Za-z]+$/;
            if (!LastRegex.test(details.LastName)) {
                $(TourbookVariable.LastnameError).text('Invalid lastName').show();
                $(TourbookVariable.LastnameErrorIcons).show();
                IsValid = false;
            }
        }


        if (details.Email == '') {
            $(TourbookVariable.EmailError).text('Please Enter Email').show();
            $(TourbookVariable.EmailIcon).show();
            $(TourbookVariable.EmailErrorIcons).show();
            IsValid = false;
        }
        else {
            var emailRegex = /[a-z]{1}[a-z0-9]+@gmail\.com$/;
            if (!emailRegex.test(details.Email)) {
                $(TourbookVariable.EmailError).text('Invalid Email Format').show();
                $(TourbookVariable.EmailIcon).show();
                $(TourbookVariable.EmailErrorIcons).show();
                IsValid = false;
            }
        }

        if (details.Phone == '') {
            $(TourbookVariable.PhoneNumberError).text('Please Enter PhoneNumber').show();
            $(TourbookVariable.DaytimePhoneIcon).show();
            $(TourbookVariable.PhoneNumberErrorIcon).show();
            IsValid = false;
        }
        else {
            var phoneRegex = /^(?:\+?91|0)?[6789]\d{9}$/;
            if (!phoneRegex.test(details.Phone)) {
                $(TourbookVariable.PhoneNumberError).text('Invalid Phone Number Format').show();
                $(TourbookVariable.DaytimePhoneIcon).show();
                $(TourbookVariable.PhoneNumberErrorIcon).show();
                IsValid = false;
            }

        }

        if (details.TimeofIncident == '') {
            $(TourbookVariable.dateerror).text('Plese choose date').show();
            $(TourbookVariable.Dateerroricon).show();
            IsValid = false;
        }
        else {
            var dateRegex = /^\d{4}-\d{2}-\d{2}$/;

           
            if (!dateRegex.test(details.TimeofIncident)) {
                $(TourbookVariable.dateerror).text('Invalid Date Format').show();
                $(TourbookVariable.Dateerroricon).show();
                IsValid = false;
            }
        }


        if (details.Howmanypeople == '') {
            $(TourbookVariable.HowmanypeopleError).text('Plese choose one ').show();
            $(TourbookVariable.HowmanypeopleErroricon).show();
            IsValid = false;
        }
        else {

            var howManyPeopleRegex = /^\d+$/;

            // Check if Howmanypeople matches the regular expression
            if (!howManyPeopleRegex.test(details.Howmanypeople)) {
                $(TourbookVariable.HowmanypeopleError).text('Invalid Howmanypeople Format').show();
                $(TourbookVariable.HowmanypeopleErroricon).show();
                IsValid = false;
            }
        }



        if (details.Whichtoursorevents == '') {
            $(TourbookVariable.Whichtoursoreventserror).text('Plese choose tour or event').show();
            $(TourbookVariable.WhichtoursoreventserrorIcon).show();
            IsValid = false;
        }

        //var cityvalue = $("#CityDropdown").val();
        //if (cityvalue === '') {
        //    $(TourbookVariable.CityError).text('Please Select City').show();
        //    // $(TourbookVariable.CityDropdown).text('Please Select City').show();
        //    $(TourbookVariable.CityErrorIcon).show();
        //    IsValid = false;
        //}
        ////else {

        ////    $(TourbookVariable.CityError).text('Please Select City').hide();
        ////    $(TourbookVariable.CityErrorIcon).hide();
        ////   IsValid = false;
        ////}

        //var Countryvalue = $("#country").val();
        //if (Countryvalue === '') {
        //    $(TourbookVariable.CountryError).text('Please Select Country').show();
        //    $(TourbookVariable.CountryErrorIcon).show();
        //    IsValid = false;

        //}
        ////else {
        ////    $(TourbookVariable.CountryError).text('Please Select Country').hide();
        ////    $(TourbookVariable.CountryErrorIcon).hide();
        ////    IsValid = false;
        ////}





        var baseid = $("#base").data('base');

        if (IsValid && CheckExpression) {

            $.ajax({
                url: baseid + '/api/TourBookingDetails/PutTourBook/'+details.Id,

                /* url: 'https://localhost:7110/api/TourBookingDetails/PutTourBook/' + details.Id,*/

                type: 'Put',
                data: details,
                success: function (result) {
                    alert(" form Successfully updated");

                    window.location.href = '/Tourcontroller1/TourbookingList';
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                    console.error(error);
                    console.error(status);
                }
            });

        }


    });









  




















