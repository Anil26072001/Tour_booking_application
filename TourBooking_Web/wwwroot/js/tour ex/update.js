﻿$(document).ready(function () {
    var radio;
    var id = parseInt($("#tourbookId").val());
    console.log(id);
    $.ajax({
        url: `https://localhost:7110/api/TourBookingDetails/GetDetailsbyId/` + id,
        type: 'Get',
        success: function (Response) {
            console.log(Response);

            $('#FirstName').val(Response.firstName);
            $('#lastname').val(Response.lastName);
            $('#email').val(Response.email);
            $('#cityid').val(Response.cityId);

            $('#countryId').val(Response.countryId);
            cityID = Response.cityId;
            console.log(cityID);

            var CityContainer = $('#Cityid');
            $.ajax({
                url: 'https://localhost:7110/api/TourBookingDetails/ExistingCity/' + id,
                type: "GET",
                success: function (data) {
                    console.log(data);
                    let citydetails = '';
                    citydetails += '<option value="' + cityID + '">' + data + '</option>';
                    CityContainer.html(citydetails);
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                    console.error(status);
                    console.error(error);
                    alert('An error occurred while processing your request.');
                }
            })

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
        },

        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
    $.ajax({
        url: 'https://localhost:7110/api/TourBookingDetails/Countries',

        type: 'GET',
        success: function (response) {
            console.log(response);

            $('#countrySelect').empty();
            $.each(response, function (i, country) {
                $('#countrySelect').append($("<option></option>").val(country.countryId).html(country.countryName));
            });

        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        }

    });

    $("#countrySelect").on("change", function () {
        var countryId = $("#countrySelect").val();
        var citycontainer = $("#Cityid");

        citycontainer.append($('<option></option>').val(''));
        $.ajax({
            url: 'https://localhost:7110/api/TourBookingDetails/Cities/' + countryId,
            type: "GET",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                citycontainer.empty();
                citycontainer.append($("<option></option>").val('').html("--Please select City--"));
                $.each(data, function (i, cities) {
                    citycontainer.append($("<option></option>").val(cities.cityId).html(cities.cityName));

                });
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
                console.error(status);
                console.error(error);
                alert('An error occurred while processing your request.');
            }
        })


    });

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
    $(TourbookVariable.FirstName).on('input', function () {
        var name = $(TourbookVariable.FirstName).val();
        if (!/^[a-zA-Z]{1}[a-zA-Z\s]+$/.test(name)) {
            $(TourbookVariable.FirstnameError).text("FirstName should only contain letters").show();
            $(TourbookVariable.firstnameErrorIcons).show();
        } else {
            $(TourbookVariable.FirstnameError).hide();
            $(TourbookVariable.firstnameErrorIcons).hide();
        }
    });
    $(TourbookVariable.LastName).on('input', function () {
        var lastname = $(TourbookVariable.LastName).val();
        if (!/^[a-zA-Z]{1}[a-zA-Z\s]+$/.test(lastname)) {
            $(TourbookVariable.LastnameError).text("Last Name should only contain letters").show();
            $(TourbookVariable.lastnameErrorIcons).show();
        } else {
            $(TourbookVariable.LastnameError).hide();
            $(TourbookVariable.lastnameErrorIcons).hide();
        }
    });
       $(TourbookVariable.Email).on('input', function () {
        var email = $(this).val();
        if (!/^[a-z]{1}[a-z0-9]+@gmail.com$/.test(email)) {
            $(TourbookVariable.EmailError).text('Enter a valid email address').show();
            $(TourbookVariable.EmailErrorIcons).show();
        } else {
            $(TourbookVariable.EmailError).hide();
            $(TourbookVariable.EmailErrorIcons).hide();
            if (email.trim() !== '') {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid is-invalid');
            }
        }
       });
    $(TourbookVariable.PhoneNumber).on('input', function () {
        var phoneNumber = $(this).val();
        // Regular expression pattern for phone numbers
        var phonePattern = /^(?:\+?91|0)?[6789]\d{9}$/;
        ;
        if (!phonePattern.test(phoneNumber)) {
            $(TourbookVariable.PhoneNumberError).text('Enter a valid phone number').show();
            $(TourbookVariable.PhoneNumberErrorIcon).show();

        } else {
            $(TourbookVariable.PhoneNumberError).hide();
            $(TourbookVariable.PhoneNumberErrorIcon).hide();
            if (phoneNumber.trim() !== '') {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid is-invalid');
            }
        }
    });
    $(TourbookVariable.Howmanypeople).on('change', function () {
        var inputValue = $(this).val();
        var integerPattern = /^\d+$/;
        if (!integerPattern.test(inputValue)) {
            $(TourbookVariable.HowmanypeopleError).text("Plese choose one").show();
            $(TourbookVariable.HowmanypeopleError).show();
        } else {
            $(TourbookVariable.HowmanypeopleError).hide();
            $(TourbookVariable.HowmanypeopleErroricon).hide();
        }
    });
    $(TourbookVariable.TimeofIncident).on('input', function () {
        var inputValue = $(TourbookVariable.TimeofIncident).val();
        var parsedDate = new Date(inputValue);
        if (isNaN(parsedDate) || parsedDate.toString() === 'Invalid Date') {
            $(TourbookVariable.dateerror).text('Please enter a valid date').show();
            $(TourbookVariable.dateerroricon).show();
        } else {

            $(TourbookVariable.dateerror).hide();
            $(TourbookVariable.dateerroricon).hide();
        }
    });
    $(TourbookVariable.Whichtoursorevents).on('input', function () {
        var inputValue = $(TourbookVariable.Whichtoursorevents).val();
        if (inputValue.trim() === '') {
            $(TourbookVariable.Whichtoursoreventserror).text('Please enter which tours or events you are interested in').show();
            $(TourbookVariable.WhichtoursoreventserrorIcon).show();
        } else {
            $(TourbookVariable.Whichtoursoreventserror).hide();
            $(TourbookVariable.WhichtoursoreventserrorIcon).hide();
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

        }
        var IsValid = true;
        if (details.FirstName == '') {
            $(TourbookVariable.FirstnameError).text('Please Enter FirstName').show();
            $(TourbookVariable.firstnameErrorIcons).show();
            IsValid = false;
        }
        else {

        }
        if (details.LastName == '') {
            $(TourbookVariable.LastnameError).text('Please Enter LastName').show();
            $(TourbookVariable.LastnameErrorIcons).show();
            IsValid = false;
        }
        if (details.Email == '') {
            $(TourbookVariable.EmailError).text('Please Enter Email').show();
            $(TourbookVariable.EmailIcon).show();
            $(TourbookVariable.EmailErrorIcons).show();
            IsValid = false;
        }
        if (details.Phone == '') {
            $(TourbookVariable.PhoneNumberError).text('Please Enter PhoneNumber').show();
            $(TourbookVariable.DaytimePhoneIcon).show();
            $(TourbookVariable.PhoneNumberErrorIcon).show();
            IsValid = false;
        }
        if (details.TimeofIncident == '') {
            $(TourbookVariable.dateerror).text('Plese choose date').show();
            $(TourbookVariable.Dateerroricon).show();
            IsValid = false;
        }
        if (details.Howmanypeople == '') {
            $(TourbookVariable.HowmanypeopleError).text('Plese choose one ').show();
            $(TourbookVariable.HowmanypeopleErroricon).show();
            IsValid = false;
        }
        if (details.Whichtoursorevents == '') {
            $(TourbookVariable.Whichtoursoreventserror).text('Plese choose tour or event').show();
            $(TourbookVariable.WhichtoursoreventserrorIcon).show();
            IsValid = false;
        }










        if (IsValid) {

            $.ajax({
                url: 'https://localhost:7110/api/TourBookingDetails/PutTourBook/' + id,
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
});









  






















       