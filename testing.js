var chai = require('chai').expect;



describe("User", function () {
    it("should add a user", function () {
        expect(User(2, 4)).to.equal(8);
    });

    it("should throw when not passed numbers", function () {
        expect(function () {
            multiply(2, "4");
        }).to.throw(Error);
    });
});