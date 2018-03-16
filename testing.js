//require chai
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();

const router = require('./controllers/controller.js');

chai.use(chaiHttp);

// testing API Routes


describe('get all sets', function () {
    it('should get all sets', function() {
        router.get('/allsets', (req, res) => {
            var sendData = getAllSets();
            res.should.render('sets', sendData);
        })
    })
});


//To test run "mocha testing.js" in command line