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

    Country: "#country",
    CountryError: "#countryError",
    CountryErrorIcon: "#CountryErrorIcon",

    City: "#city",
    CityDropdown: "#CityDropdown",

    TimeofIncident: "#Date",
    dateerror: "#dateerror",
    Dateerroricon: "#dateerroricon",

    Howmanypeople: "#howmanypeople",
    HowmanypeopleError: "#howmanypeopleError",
    HowmanypeopleErroricon: "#howmanypeopleErroricon",

    Whichtoursorevents: "#whichtoursorevents",
    Whichtoursoreventserror: "#Whichtoursoreventserror",
    WhichtoursoreventserrorIcon: "#Whichtoursoreventserroricon",

    PhoneNumberError: "#phoneNumberError",

    Phonecheckbox: "#phonecheckbox",
    Emailcheckbox: "#emailcheckbox",
    Eithercheckbox: "#eithercheckbox",

    Eightradio: "#eightradio",
    twlradio: "#twlradio",
    sixradio: "#sixradio",
    radiobuttonstatus: "#radiobuttonstatus",

    statuserror: "#statuserror",
    Statuserroricon: "#statuserroricon",

    besttimeofday: "#Besttimeofday",
    AnythingElse: "#anythingElse",
    HowDidYouHear: "#howDidYouHear",

    btnsubmit: "#submit",
    Updatesubmit: "#updatesubmit",
    radiobtnvalue: ""
    //status:"#status"
};

//function getPreferredContactMethod() {
//    var contactMethod = [];
//    if ($('#phonecheckbox').is(':checked')) {
//        contactMethod.push('phone');
//    }
//    if ($('#emailcheckbox').is(':checked')) {
//        contactMethod.push('email');
//    }
//    if ($('#eithercheckbox').is(':checked')) {
//        contactMethod.push('either');
//    }
//    return contactMethod;
//}


$(document).ready(function () {
    $(TourbookVariable.FirstName).on('input', function () {
        var name = $(TourbookVariable.FirstName).val();
        /*console.log(name)*/
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

    $(TourbookVariable.Country).on('change', function () {

        var country = $(this).val();


        $(TourbookVariable.CityDropdown).empty();

        $.ajax({
            url: '/TourController1/GetCityDropdownList?CountryId=' + country,
            type: 'Get',
            success: function (citys) {

                console.log(citys);
                $.each(citys, function (index, city) {

                    $(TourbookVariable.CityDropdown).append($('<option>', {

                        value: city.cityId,
                        text: city.cityName
                    }));
                });
            },
            error: function () {
            }
        });
    });

    $(TourbookVariable.Howmanypeople).on('change', function () {
        var inputValue = $(this).val();
        var integerPattern = /^\d+$/;
        if (!integerPattern.test(inputValue)) {
            $(TourbookVariable.HowmanypeopleError).text("Plese choose one").show();
            $(TourbookVariable.HowmanypeopleError).show();
            //$(TourbookVariable.HowmanypeopleErroricon).show();
        } else {

            $(TourbookVariable.HowmanypeopleError).hide();
            $(TourbookVariable.HowmanypeopleErroricon).hide();
        }
    });


    $(TourbookVariable.TimeofIncident).on('input', function () {
        var inputValue = $(TourbookVariable.TimeofIncident).val();

        var parsedDate = new Date(inputValue);

        // Check if the parsed date is a valid date and it's not NaN
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
            // Display an error message or perform other validation actions
            // For example, you can show an error message next to the input field
            $(TourbookVariable.Whichtoursoreventserror).text('Please enter which tours or events you are interested in').show();
            $(TourbookVariable.WhichtoursoreventserrorIcon).show();
        } else {
            $(TourbookVariable.Whichtoursoreventserror).hide();
            $(TourbookVariable.WhichtoursoreventserrorIcon).hide();
        }
    });


    $(TourbookVariable.Eightradio).on('change', function () {

        var radio = "";
        console.log('checked');
        radio = "8-11 Am";
        TourbookVariable.radiobtnvalue = "8-11 Am ";
        console.log(TourbookVariable.radiobtnvalue);
        console.log(radio);
    });
    $(TourbookVariable.twlradio).on('change', function () {
        TourbookVariable.radiobtnvalue = "12-4 Pm ";
        console.log(TourbookVariable.radiobtnvalue);

    });
    $(TourbookVariable.sixradio).on('change', function () {

        TourbookVariable.radiobtnvalue = "6-10 pm ";
        console.log(TourbookVariable.radiobtnvalue);

    });


    //function getPreferredContactMethod() {
    //    var contactMethod = [];
    //    if ($(TourbookVariable.Phonecheckbox).is(':checked')) {
    //        contactMethod.push('phone');
    //    }
    //    if ($(TourbookVariable.Emailcheckbox).is(':checked')) {
    //        contactMethod.push('Email');
    //    }
    //    if ($(TourbookVariable.Eithercheckbox).is(':checked')) {
    //        contactMethod.push('Either');
    //    }
    //    return contactMethod;

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



    $(TourbookVariable.btnsubmit).on("click", function (e) {

        //var status='';
        //if ($(TourbookVariable.Phonecheckbox).prop("checked")) {
        //    status += 'Phonecheckbox,';
        //}
        //if ($(TourbookVariable.Emailcheckbox).prop("checked")) {
        //    status += 'Emailcheckbox,';
        //}
        //if ($(TourbookVariable.Eithercheckbox).prop("checked")) {
        //    status += 'Eithercheckbox,';
        //}
        //status = status.replace(/,$/, '');
        //if (status === '') {
        //    $("#statuserror").text('Please select  any one checkbox').show();
        //}
        //else if (status.indexOf(',') !== -1) {
        //    $("#statuserror").text('Please select  only one checkbox').show();
        //}
        //else {
        //    $("#statuserror").hide();
        //}

        var booking = {
            FirstName: $(TourbookVariable.FirstName).val(),
            LastName: $(TourbookVariable.LastName).val(),
            Email: $(TourbookVariable.Email).val(),
            Phone: $(TourbookVariable.PhoneNumber).val(),
            TimeofIncident: $(TourbookVariable.TimeofIncident).val(),
            Howmanypeople: $(TourbookVariable.Howmanypeople).val(),
            Whichtoursorevents: $(TourbookVariable.Whichtoursorevents).val(),
            //bestwaytocontact: $(TourbookVariable.bestwaytocontact).val(),

            //bestwaytocontact: getPreferredContactMethod(),
            bestwaytocontact: statusFunction(),
            besttimeofday: TourbookVariable.radiobtnvalue,

            AnythingElse: $(TourbookVariable.AnythingElse).val(),
            HowDidYouHear: $(TourbookVariable.HowDidYouHear).val(),
            CountryId: parseInt($(TourbookVariable.Country).val(), 0),
            CityId: parseInt($(TourbookVariable.CityDropdown).val(), 0),
        }


        var IsValid = true;
        if (booking.FirstName == '') {
            $(TourbookVariable.FirstnameError).text('Please Enter FirstName').show();
            /*$(TourbookVariable.EsNameErrorIcon).show();*/
            $(TourbookVariable.firstnameErrorIcons).show();
            IsValid = false;
        }
        if (booking.LastName == '') {
            $(TourbookVariable.LastnameError).text('Please Enter LastName').show();
            $(TourbookVariable.LastnameErrorIcons).show();
            $(TourbookVariable.lastnameErrorIcons).show();

            IsValid = false;
        }
        if (booking.Email == '') {
            $(TourbookVariable.EmailError).text('Please Enter Email').show();
            $(TourbookVariable.EmailIcon).show();
            $(TourbookVariable.EmailErrorIcons).show();
            IsValid = false;
        }
        if (booking.Phone == '') {
            $(TourbookVariable.PhoneNumberError).text('Please Enter PhoneNumber').show();
            $(TourbookVariable.DaytimePhoneIcon).show();
            $(TourbookVariable.PhoneNumberErrorIcon).show();
            IsValid = false;
        }

        if (booking.Country == '') {
            $(TourbookVariable.CountryError).text('Please Select Country').show();
            $(TourbookVariable.CountryErrorIcon).show();
        }
        if (booking.City == '') {
            $(TourbookVariable.CitysDropdown).text('Please Select City').show();
            $(TourbookVariable.CitysDropdown).show();
            IsValid = false;
        }

        if (booking.bestwaytocontact = '') {
            //$(TourbookVariable.bestwaytocontact).text('Plese choose one ').show();
            $(TourbookVariable.statuserror).text('Please select  any one checkbox').css('color', 'red').show();
            $(TourbookVariable.Statuserroricon).show();
            //$(TourbookVariable.bestwaytocontact).show();
            IsValid = false;
        }

        if (booking.Howmanypeople == '') {
            $(TourbookVariable.HowmanypeopleError).text('Plese choose one ').show();
            $(TourbookVariable.HowmanypeopleErroricon).show();
            IsValid = false;
        }


        if (booking.TimeofIncident == '') {
            $(TourbookVariable.dateerror).text('Plese choose date').show();
            $(TourbookVariable.Dateerroricon).show();
            IsValid = false;
        }


        if (booking.Whichtoursorevents == '') {
            $(TourbookVariable.Whichtoursoreventserror).text('Plese choose tour or event').show();
            $(TourbookVariable.WhichtoursoreventserrorIcon).show();
            IsValid = false;
        }



        if (IsValid) {

            $.ajax({
                /* url: '/TourController1/PostFormDetails',*/
               
                url: 'https://localhost:7110/api/TourBookingDetails/PostTourBooking',
                type: 'Post',
                //contentType: 'application/json',
                // dataType: 'json',
                data: (booking),
                success: function (result) {
                    alert("Successfully submitted");
                    window.location.href = '/Tourcontroller1/TourbookingList';
                   

                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                    console.error(error);
                    console.error(status);
                    // Handle error appropriately
                }
            });

        }

    });







    $(TourbookVariable.Updatesubmit).on("click", function (e) {


        var booking = {
            FirstName: $(TourbookVariable.FirstName).val(),
            LastName: $(TourbookVariable.LastName).val(),
            Email: $(TourbookVariable.Email).val(),
            Phone: $(TourbookVariable.PhoneNumber).val(),
            TimeofIncident: $(TourbookVariable.TimeofIncident).val(),
            Howmanypeople: $(TourbookVariable.Howmanypeople).val(),
            Whichtoursorevents: $(TourbookVariable.Whichtoursorevents).val(),
            //bestwaytocontact: $(TourbookVariable.bestwaytocontact).val(),
            bestwaytocontact: statusFunction(),
            //bestwaytocontact: getPreferredContactMethod(),
            //bestwaytocontact: statusFunction(),
            besttimeofday: TourbookVariable.radiobtnvalue,

            AnythingElse: $(TourbookVariable.AnythingElse).val(),
            HowDidYouHear: $(TourbookVariable.HowDidYouHear).val(),
            CountryId: parseInt($(TourbookVariable.Country).val(), 0),
            CityId: parseInt($(TourbookVariable.CityDropdown).val(), 0),
            TourBookingId: $('#id').val()
        }


        var IsValid = true;

        if (IsValid) {

            $.ajax({
                url: '/TourBookingDetails/Update',
                type: 'Post',
                //contentType: 'application/json',
                // dataType: 'json',
                data: (booking),
                success: function (result) {
                    alert("Successfully submitted");
                    window.location.href = '/TourBookingDetails/List';

                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                    console.error(error);
                    console.error(status);
                    // Handle error appropriately
                }
            });
        }


    });

});
