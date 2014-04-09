$(document).ready(function () {
	// fires on unfocus. remove the error class
	$("#sender").change(function (e) {
		$("#sender-group").removeClass("has-error");
	})

	var body = '';

	function fullName() {
		return $("#first-name").val() + " " + $("#last-name").val();
	};

	function emailBody(sel) {
		return _.map($("#salutation, " + sel + " p"), function (el) { return $(el).text().trim(); }).join("\n\n");
	};

	// register handler for our one, beautiful button
	$("form").submit(function (e) {
		e.preventDefault();

		var data = {
			body: body,
			sender: $("#sender").val(),
			name: fullName(),
		};
	
		if (!/[a-z|A-Z]+\.[a-z|A-Z]+\@tufts\.edu/.test(data.sender)) {
			$("#sender-group").addClass("has-error");
			$("#error-msg").css("display", "inline");
			return;
		}

		console.log("emailBody = ", body);
		return console.log("Not actually sending emails right now");

		Parse.Cloud.run("send", data, {
			success: function (result) {
				console.log("SUCCESSFUL, BIIIITCHES");
			},
			error: function (error) {
				console.log("Pooping out with error = ", error);
			}	
		})
	})

	var acceptableMajors = ["computer science", "comp sci", "cs"];

	// detect when someone is done typing their major, display appropriate letter
	$("#major").bind('input', function () {
		$("#dont-worry").css("display", "none");
		$("#edit").css("display", "block");
		var major = $(this).val().toLowerCase();
		if (_.contains(acceptableMajors, major)) {
			$("#major-text").css("display", "inline");
			$("#non-major-text").css("display", "none");
			body = emailBody("#major-text");
		} else {
			$("#non-major-text").css("display", "inline");
			$("#major-text").css("display", "none");
			body = emailBody("#non-major-text");
		}

		console.log("emailBody = ", emailBody());
	})

	// add signature
	$("#first-name, #last-name").focusout(function() {
		$("#signature").text(fullName());
	})



})