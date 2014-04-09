// returns the selector to get the body of the email
function letterSelector() {
	majorHidden = $("#major-text").hasClass("hidden")
	return majorHidden ? "#non-major-text" : "#major-text";
}

$(document).ready(function () {
	// fires on unfocus. remove the error class
	$("#sender").change(function (e) {
		$("#sender-group").removeClass("has-error");
	})

	function fullName() {
		return $("#first-name").val() + " " + $("#last-name").val();
	};

	function emailBody(sel) {
		var b = _.map($(sel + " p"), function (el) { return $(el).text().trim(); }).join("\n\n");
		if (!b) {
			return null;
		}

		var name = "My name is " + fullName() + " and I am a " + $("#class").val() + " majoring in " + $("#major").val() + ".";
		var salute = $("#salutation").text();
		var sig = $("#signature").text();

		return [salute.trim(), name.trim(), b, sig.trim()].join("\n\n");
	};

	// register handler for our one, beautiful button
	$("form").submit(function (e) {
		e.preventDefault();

		var data = {
			body: emailBody(letterSelector()),
			sender: $("#sender").val(),
			name: fullName(),
		};
	
		if (!/[a-z|A-Z]+\.[a-z|A-Z]+\@tufts\.edu/.test(data.sender)) {
			$("#sender-group").addClass("has-error");
			$("#error-msg").css("display", "inline");
			return;
		}

		//console.log(data.body)
		//return console.log("Not actually sending emails right now");

		$("#send").addClass("disabled");
		Parse.Cloud.run("send", data, {
			success: function (result) {
				console.log("great success");

				$("#feedback").text("Successfully sent. El Prez should be responding any minute now...");
				$("#feedback").removeClass("hidden").addClass("alert-success");
				$("#send").addClass("hidden")
			},
			error: function (error) {
				console.log("to err is human. err = ", error);

				$("#feedback").text("Error in sending message: " + error + ". Please contact Tufts facilities M-F 9am-5pm at (617) 627-3496")
				$("#feedback").removeClass("hidden").addClass("alert-error");

				$("#send").removeClass("disabled hidden")
			}	
		})
	})

	var acceptableMajors = ["computer science", "comp sci", "cs"];

	// detect when someone is done typing their major, display appropriate letter
	$("#major").bind('input', function () {
		$("#dont-worry").addClass("hidden");
		$("#edit").removeClass("hidden")
		var major = $(this).val().toLowerCase();
		if (_.contains(acceptableMajors, major)) {
			$("#major-text").removeClass("hidden")
			$("#non-major-text").addClass("hidden")
		} else {
			$("#non-major-text").removeClass("hidden")
			$("#major-text").addClass("hidden")
		}
		$("#signature").removeClass("hidden")
	});

	// add signature
	$("#first-name, #last-name").focusout(function() {
		$("#signature").text(fullName());
	});
})
