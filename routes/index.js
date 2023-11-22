var express = require('express');
var router = express.Router();
var database = require('../database');

var app = express();

app.set('view engine', 'ejs'); // Assuming you are using EJS as your template engine
app.set('views', __dirname + '/views'); 
// Set the views directory

router.use('/public',express.static(__dirname+ '/public'));
router.use('/uploads',express.static(__dirname+ '/uploads'));

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

router.get("/", function(request, response, next) {
    // Query for sample_data
    var querySampleData = "SELECT * FROM sample_data ORDER BY id DESC";

    database.query(querySampleData, function(errorSampleData, dataSampleData) {
        if (errorSampleData) {
            throw errorSampleData;
        } else {
            // Query for risks
            var queryRisks = "SELECT * FROM risks ORDER BY id DESC";

            database.query(queryRisks, function(errorRisks, dataRisks) {
                if (errorRisks) {
                    throw errorRisks;
                } else {
                    // Render your template with both result sets
                    response.render('sample_data', { title: 'policy and risk data', action: 'risktable', sampleData: dataSampleData, risks: dataRisks, message: request.flash('success') });
                }
            });
        }
    });
});


router.get("/add", function(request, response, next) {
    response.render("sample_data", { title: 'policyform', action: 'add' });
});

router.post("/add_sample_data", function(request, response, next) {
    var policy_name = request.body.policy_name;
    var policyRequirement = request.body.Policy_Requirement;
    var assignee = request.body.Assignee;
    var recurrence = request.body.recurrence;
    var department = request.body.Department;
    var entities = request.body.Entities;

    var query = `
        INSERT INTO sample_data 
        (policy_name, Policy_Requirement, Assignee, recurrence, Department, Entities) 
        VALUES ("${policy_name}", "${policyRequirement}", "${assignee}", "${recurrence}", "${department}", "${entities}")
    `;

    database.query(query, function(error, data) {
        if (error) {
            throw error;
        } else {
            request.flash('success', 'policy Inserted');
            response.redirect("/sample_data");
        }
    });
});

router.get('/edit/:id', function(request, response, next) {
    var id = request.params.id;
    var query = `SELECT * FROM sample_data WHERE id = "${id}"`;
    database.query(query, function(error, data) {
        response.render('sample_data', { title: '', action: 'edit', sampleData: data[0] });
    });
});

router.post('/edit/:id', function(request, response, next) {
    var id = request.params.id;
    var policy_name = request.body.policy_name;
    var policyRequirement = request.body.Policy_Requirement;
    var assignee = request.body.Assignee;
    var recurrence = request.body.recurrence;
    var department = request.body.Department;
    var Entities = request.body.Entities;

    var query = `
        UPDATE sample_data 
        SET policy_name = "${policy_name}", 
            Policy_Requirement = "${policyRequirement}", 
            Assignee = "${assignee}", 
            recurrence = "${recurrence}", 
            Department = "${department}", 
            Entities = "${Entities}" 
        WHERE id = "${id}"
    `;

    database.query(query, function(error, data) {
        if (error) {
            throw error;
        } else {
            request.flash('success', 'Sample Data Updated');
            response.redirect('/sample_data');
        }
    });
});



router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM sample_data WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Sample Data Deleted');
			response.redirect("/sample_data");
		}

	});

});
router.get('/details/:id', function(request, response, next) {
    var id = request.params.id;
    var query = `SELECT * FROM sample_data WHERE id = "${id}"`;
    database.query(query, function(error, data) {
        if (error) {
            throw error;
        } else {
            // Assuming data is an array of objects with properties corresponding to table columns
            data.sort((a, b) => (a.Assignee > b.Assignee) ? 1 : -1);
            response.json(data);
        }
    });
});
router.post('/sample_data/details/:id/attachments', function (request, response, next) {
    const id = request.params.id;
    const file = request.files.file;
  
    if (!file) {
      return response.status(400).json({ message: 'No file uploaded' });
    }
  
    const filename = file.name;
    const uploadPath = path.join(__dirname, 'uploads', id, filename);
  
    // Move the file to the specified path
    file.mv(uploadPath, function (error) {
      if (error) {
        return response.status(500).json({ message: 'Error uploading file', error: error.message });
      } else {
        const attachmentsPath = `/uploads/${id}/${filename}`;
  
        // Update the attachment path in the 'sample_data' table
        const query = 'INSERT sample_data SET attachments = ? WHERE id = ?';
  
        database.query(query, [attachmentsPath, id], function (err, result) {
          if (err) {
            return response.status(500).json({ message: 'Error updating database', error: err.message });
          } else {
            return response.json({ message: 'Attachment uploaded and database updated successfully' });
          }
        });
      }
    });
});
app.get('/policy', (req, res) => {
    // Render the sample_data.ejs file
    res.render('sample_data', { title: 'Policy' });
});
// Assuming you have Express and MySQL set up
router.post("/addRisk", function(request, response, next) {
    var potential_Risk = request.body.potential_Risk;
    var policyRequirement = request.body.Policy_Requirement;
    var assignee = request.body.Assignee;
    var category = request.body.Category;
    var department = request.body.Department;
    var applicationName = request.body.Application_Name;

    var query = `
        INSERT INTO risks 
        (potential_Risk, Policy_Requirement, Assignee, Category, Department, Application_Name) 
        VALUES ("${potential_Risk}", "${policyRequirement}", "${assignee}", "${category}", "${department}", "${applicationName}")
    `;

    database.query(query, function(error, data) {
        if (error) {
            throw error;
        } else {
            request.flash('success', 'Risk Inserted');
            response.redirect("/riskManagements"); // Adjust the redirect URL accordingly
        }
    });
});
 


module.exports = router;