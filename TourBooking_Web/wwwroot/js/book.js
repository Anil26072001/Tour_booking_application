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
    CountryErrorIcon: "#countryErrorIcon",

    City: "#city",
    CityDropdown: "#CityDropdown",
    CityError: "#cityError",
    CityErrorIcon:"#cityErrorIcon",

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
    sserroricon:    "#serroricon",

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


$(document).ready(function () {
    var CheckExpression = true;
    $(TourbookVariable.FirstName).on('input', function () {
        var name = $(TourbookVariable.FirstName).val();
        /*console.log(name)*/
        if (!/^[a-zA-Z]{1}[a-zA-Z\s]+$/.test(name)) {
            $(TourbookVariable.FirstnameError).text("FirstName should only contain letters").show();
            $(TourbookVariable.firstnameErrorIcons).show();
            CheckExpression = false;

        } else {
            $(TourbookVariable.FirstnameError).hide();
            $(TourbookVariable.firstnameErrorIcons).hide();
            CheckExpression = true;
        }
    });


    $("#country").on("click", function () {
        var countryinputval = $("#country").val();

        console.log(countryinputval);

        if (countryinputval === '') {
            $(TourbookVariable.CountryError).text('Please select Country Dropdownlist').show();
            $(TourbookVariable.CountryErrorIcon).show();
            CheckExpression = false;
        }
        else {
            $(TourbookVariable.CountryError).hide();
            $(TourbookVariable.CountryErrorIcon).hide();
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
    $(TourbookVariable.PhoneNumber).on('input', function () {
        var phoneNumber = $(this).val();
        // Regular expression pattern for phone numbers
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

        

    var ddlCountry = $('#country');

    var baseid = $("#base").data('base');

    $.ajax({
        url: baseid +'/api/TourBookingDetails/Countries',
        type: "GET",
        dataType: 'json',
        success: function (countriesdata) {
            console.log(countriesdata);
            ddlCountry.empty();

            //
            //var defaultOption = $('<option>', {
            //    value: "",
            //    text: "Select a country"
            //}).appendTo(ddlCountry);

            ddlCountry.append($('<option>', {
                value: "",
                text: "Select a country",
                selected: true, 
                disabled: true 
            }));
            
            countriesdata.forEach(function (country) {

                ddlCountry.append($('<option>', {
                    value: country.countryId,
                    text: country.countryName
                }));
            });
            ddlCountry.val(Response.countryId);
        }
    });




    $(TourbookVariable.Country).on('change', function () {

        var selectedcountryid = parseInt($("#country").val(),0);
        var country = $(this).val();


        $(TourbookVariable.CityDropdown).empty();

        var baseid = $("#base").data('base');

        console.log(baseid);

        $.ajax({
            url: baseid +'/api/TourBookingDetails/Cities/' + selectedcountryid,
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
    })





    



    $("#CityDropdown").on("click", function () {
        var city = $("#CityDropdown").val();

        if (city === '') {
            $(TourbookVariable.CityError).text('Please select City Dropdownlist').show();
            $(TourbookVariable.CityErrorIcon).show();
            CheckExpression = false;
        }
        else {
            $(TourbookVariable.CityError).hide();
            $(TourbookVariable.CityErrorIcon).hide();
            CheckExpression = true;

        }
    });


    $(TourbookVariable.TimeofIncident).on('input', function () {
        var inputValue = $(TourbookVariable.TimeofIncident).val();

        var parsedDate = new Date(inputValue);

        // Check if the parsed date is a valid date and it's not NaN
        if (isNaN(parsedDate) || parsedDate.toString() === 'Invalid Date') {
            $(TourbookVariable.dateerror).text('Please enter a valid date').show();
            $(TourbookVariable.dateerroricon).show();
            CheckExpression = false;
        } else {

            $(TourbookVariable.dateerror).hide();
            $(TourbookVariable.Dateerroricon).hide();
            CheckExpression = true;
        }

    });





    $(TourbookVariable.Whichtoursorevents).on('input', function () {
        var inputValue = $(TourbookVariable.Whichtoursorevents).val();
        if (inputValue.trim() === '') {
            // Display an error message or perform other validation actions
            // For example, you can show an error message next to the input field
            $(TourbookVariable.Whichtoursoreventserror).text('Please enter which tours or events you are interested in').show();
            $(TourbookVariable.WhichtoursoreventserrorIcon).show();
            CheckExpression = false;
        } else {
            $(TourbookVariable.Whichtoursoreventserror).hide();
            $(TourbookVariable.WhichtoursoreventserrorIcon).hide();
            CheckExpression = true;
        }
    });
    $(TourbookVariable.Howmanypeople).on('change', function () {
        //var inputValue = $(this).val();
        var inputValue = $(TourbookVariable.Howmanypeople).val();

        var integerPattern = /^-?\d+$/;

        if (!integerPattern.test(inputValue)) {
            $(TourbookVariable.HowmanypeopleError).text("please choose integer values").show();
            $(TourbookVariable.HowmanypeopleError).show();
            $(TourbookVariable.HowmanypeopleErroricon).show();
            CheckExpression = false;

        } else {

            $(TourbookVariable.HowmanypeopleError).hide();
            $(TourbookVariable.HowmanypeopleErroricon).hide();
            CheckExpression = true;
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

    //$(TourbookVariable.cityIdvariable).on("click", function () {
    //    var cityinputval = $(TourbookVariable.cityIdvariable).val()
    //    if (cityinputval === '') {
    //        $(TourbookVariable.CityError).text('Please select Country Dropdownlist First').show();
    //        $(Globalvariable.cityicon).html('<i class="fas  fa-exclamation-circle"></i>').show();
    //    }
    //    else {
    //        $("#citydropdownlisterror").text('Please select Country Dropdownlist First').hide();
    //        $(Globalvariable.cityicon).html('<i class="fas  fa-exclamation-circle"></i>').hide();
    //    }
    //})


    $("input[name='time']").on('change',function () {
        // Hide the error message when any radio button is selected
        $("#statuserrorradio").text("");
    });
    


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

        if (!$("#eightradio").prop("checked") && !$("#twlradio").prop("checked") && !$("#sixradio").prop("checked")) {
         
            $("#statuserrorradio").text("Please select a time for call-back").css("color", "red");
            /*$("#serroricon").show();*/



            IsValid = false;
        } else {
            // If one is checked, clear any previous error message
            $("#statuserrorradio").text("");
            $("#serroricon").hide();

            IsValid = true;
            // You can proceed with further actions here
        }

        if (booking.FirstName == '') {
            $(TourbookVariable.FirstnameError).text('Please Enter FirstName').show();
            /*$(TourbookVariable.EsNameErrorIcon).show();*/
            $(TourbookVariable.firstnameErrorIcons).show();
            IsValid = false;
        }
        else {
            var firstNameRegex = /^[A-Za-z]+$/;
            if (!firstNameRegex.test(booking.FirstName)) {
                $(TourbookVariable.FirstnameError).text('Invalid FirstName').show();
                $(TourbookVariable.firstnameErrorIcons).show();
                IsValid = false;
            }
        }

        if (booking.LastName == '') {
            $(TourbookVariable.LastnameError).text('Please Enter LastName').show();
            $(TourbookVariable.LastnameErrorIcons).show();
            $(TourbookVariable.lastnameErrorIcons).show();

            IsValid = false;
        }
        else {
            var LastRegex = /^[A-Za-z]+$/;
            if (!LastRegex.test(booking.LastName)) {
                $(TourbookVariable.LastnameError).text('Invalid lastName').show();
                $(TourbookVariable.LastnameErrorIcons).show();
                IsValid = false;
            }
        }
        if (booking.Email == '') {
            $(TourbookVariable.EmailError).text('Please Enter Email').show();
            $(TourbookVariable.EmailIcon).show();
            $(TourbookVariable.EmailErrorIcons).show();
            IsValid = false;
        } else {
            var emailRegex = /[a-z]{1}[a-z0-9]+@gmail.com$/;
            if (!emailRegex.test(booking.Email)) {
                $(TourbookVariable.EmailError).text('Invalid Email Format').show();
                $(TourbookVariable.EmailIcon).show();
                $(TourbookVariable.EmailErrorIcons).show();
                IsValid = false;
            }
        }

        if (booking.Phone == '') {
            $(TourbookVariable.PhoneNumberError).text('Please Enter PhoneNumber').show();
            $(TourbookVariable.DaytimePhoneIcon).show();
            $(TourbookVariable.PhoneNumberErrorIcon).show();
            IsValid = false;
        } else {
            var phoneRegex = /^(?:\+?91|0)?[6789]\d{9}$/;
            if (!phoneRegex.test(booking.Phone)) {
                $(TourbookVariable.PhoneNumberError).text('Invalid Phone Number Format').show();
                $(TourbookVariable.DaytimePhoneIcon).show();
                $(TourbookVariable.PhoneNumberErrorIcon).show();
                IsValid = false;
            }
        }
        var cityvalue = $("#CityDropdown").val();
        if (cityvalue === '') {
            $(TourbookVariable.CityError).text('Please Select City').show();
           // $(TourbookVariable.CityDropdown).text('Please Select City').show();
            $(TourbookVariable.CityErrorIcon).show();
            IsValid = false;
        }
        //else {

        //    $(TourbookVariable.CityError).text('Please Select City').hide();
        //    $(TourbookVariable.CityErrorIcon).hide();
        //   IsValid = false;
        //}

        var Countryvalue = $("#country").val();
        if (Countryvalue === null) {
            $(TourbookVariable.CountryError).text('Please Select Country').show();
            $(TourbookVariable.CountryErrorIcon).show();
            IsValid = false;

        } 
        //else {
        //    $(TourbookVariable.CountryError).text('Please Select Country').hide();
        //    $(TourbookVariable.CountryErrorIcon).hide(); 
        //    IsValid = false;
        //}

        





        if (booking.bestwaytocontact = '') {
            //$(TourbookVariable.bestwaytocontact).text('Plese choose one ').show();
            $(TourbookVariable.statuserror).text('Please select  any one checkbox').css('color', 'red').show();
            $(TourbookVariable.Statuserroricon).show();
            //$(TourbookVariable.bestwaytocontact).show();
            IsValid = false;
        }

        if (booking.Howmanypeople == '') {
            $(TourbookVariable.HowmanypeopleError).text('please choose howmany peoples visit ').show();
            $(TourbookVariable.HowmanypeopleErroricon).show();
            IsValid = false;
        } else { 
            var howManyPeopleRegex = /^-?\d+$/;

            // Check if Howmanypeople matches the regular expression
            if (!howManyPeopleRegex.test(booking.Howmanypeople)) {
            $(TourbookVariable.HowmanypeopleError).text('Invalid Howmanypeople Format').show();
            $(TourbookVariable.HowmanypeopleErroricon).show();
            IsValid = false;
        }
        }

        if (booking.TimeofIncident == '') {
            $(TourbookVariable.dateerror).text('Plese choose date').show();
            $(TourbookVariable.Dateerroricon).show();
            IsValid = false;
        }
        else {
            var dateRegex = /^\d{4}-\d{2}-\d{2}$/;

            if (!dateRegex.test(booking.TimeofIncident)) {
                $(TourbookVariable.dateerror).text('Invalid Date Format').show();
                $(TourbookVariable.Dateerroricon).show();
                IsValid = false;
            }
        }

        if (booking.Whichtoursorevents == '') {
            $(TourbookVariable.Whichtoursoreventserror).text('Plese choose tour or event').show();
            $(TourbookVariable.WhichtoursoreventserrorIcon).show();
            IsValid = false;
        }









       /* var baseid = $("#base").data('base');*/

        if (IsValid && CheckExpression) {

            $.ajax({
               
                url: 'https://localhost:7110/api/TourBookingDetails/PostTourBooking',

                /*url: baseid +'/api/TourBookingDetails/PostTourBooking',*/
                type: 'Post',
                
                data: (booking),
                success: function (result) {
                    alert("Successfully submitted");
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
