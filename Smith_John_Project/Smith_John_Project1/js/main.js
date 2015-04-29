/*  
	PWA Project
	Author: John Smith
*/

$(document).ready(function(){
	

	/* Tab Javascript ---------------------------- */

	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})


	/* Modal Javascript -------------------------- */

	$(".modalClick").on("click", function(event) {
		event.preventDefault();
		$("#overlay")
			.fadeIn()
			.find("#modal")
			.fadeIn();
	});

	$(".close").on("click", function(event) {
		event.preventDefault();
		$("#overlay")
			.fadeOut()
			.find("#modal")
			.fadeOut();
	});

	/* SignIn Javascript ------------------------ */

	$("#signinButton").on('click', function(e) {  //FORGOT THE EVENT and On method
		e.preventDefault();
		var user = $("#user").val();
		var pass = $("#pass").val();
		//console.log("This notifies you if the password is working.");
		$.ajax({
			url: "xhr/login.php",
			type: "post",
			dataType: "json",
			data: {
				username: user,
				password: pass
			},
			success:function(response){
				console.log("test user");
				if (response.error){
					alert(response.error);
				}else{
					window.location.assign("admin.html");
				};
			}    //Had )   will cause error
		});
	});

	/* SignOut Javascript ------------------------ */

	$("#logOut").click(function(e){
		e.preventDefault;
		$.get("xhr/logOut.php", function(){
			window.location.assign("index.html")
		})
	});

	/* Register Javascript ------------------------ */

	$("#register").on("click", function(){
		var firstname = $("#first").val(),
			lastname = $("#last").val(),
			username = $("#userName").val(),
			email = $("#email").val(),
			password = $("#password").val();
			console.log(firstname + ' ' + lastname + ' ' + username + ' ' + email + ' ' + password);

		$.ajax({
			url: "xhr/register.php",
			type: "post",
			dataType: "json",
			data: {
				firstname: firstname,
				lastname: lastname,
				username: username,
				email: email,
				password: password
			},

			success: function(response){
				if (response.error){
					alert(response.error);
				}else{
					window.location.assign("admin.html");
				}
			}
		});
	});

	/* Projects Button Javascript ------------------------ */

	$(".projectsbtn").on("click", function(e) {
		e.preventDefault();
		window.location.assign("projects.html");
	});

	/* Display Username Javascript ------------------------ */

	$.getJSON("xhr/check_login.php", function(data){
		console.log(data);
		$.each(data, function(key, val){
			console.log(val.first_name);
			$(".userid").html("Welcome User: " + val.first_name);
		})
	});

	/* Add New Projects Javascript ------------------------ */

	$("#addButton").on("click", function(){
		var projName = $("#projectName").val(),
		projDesc = $("#projectDescription").val(),
		projDue = $("#projectDueDate").val(),
		status = $("input[name = 'status']:checked").prop("id");

		$.ajax({
			url: "xhr/new_project.php",
			type: "post",
			dataType: "json",
			data: {
				projectName: projName,
				projectDescripion: projDesc,
				dueDate: projDue,
				status: status
			},
			success: function(response) {
				console.log("Testing for success");

				if(response.error) {
					alert(response.error);
				} else {
					for(var i=0, j=response.projects.length; i < j; i++){
						var result = response.projects[i];

						$(".projects").append(
							' <div id="sortable" class="ui-state-default">' +
							" <input class='projectid' type='hidden' value='" + result.id + "'>" +
							" Project Name: " + result.projectName + "<br>" +
							" Project Description: " + result.projectDescription + "<br>" +
							" Project Due Date: " + result.dueDate + "<br>" +
							" Project Status: " + result.status + "<br>" +
							' <button class="deletebtn ui-state-default">Delete</button>' +
							' <button class="editbtn ui-state-default">Edit</button>' +
							' </div> <br>'
						);
					};

						$('.deletebtn').on('click', function(e){
							var pid = $(this).parent().find(".projectid").val();
							console.log('test delete');
								alert("You have successfully deleted the project");
							$.ajax({
								url: 'xhr/delete_project.php',
								data: {
									projectID: pid
								},
								type: 'POST',
								dataType: 'json',
								success: function(response){
									console.log('Testing for success');

									if(response.error) {
										alert(response.error);
									} else {
										window.location.assign("projects.html")
									};
								}
							});
						}); //End delete
						
						$('.editbtn').on('click', function(e){
							e.preventDefault();

							$('#editor')
								.fadeIn()
								.find('#editmodal')
								.fadeIn();

						});
				};
			}
		});
	});

	/* Plugins Javascript ------------------------ */

	 $( ".datepicker" ).datepicker();

	 $( "#sortable" ).sortable();

     $( "#sortable" ).disableSelection();


});