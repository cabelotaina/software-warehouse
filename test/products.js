process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");

const baseUrl = "http://localhost:3000";

chai.use(chaiHttp);

const expect = chai.expect;

// const should = chai.should();

describe("/GET products", () => {
  it("should GET all the products", (done) => {
    chai
      .request(baseUrl)
      .get("/products")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errors");
        res.body.errors.should.have.property("pages");
        res.body.errors.pages.should.have.property("kind").eql("required");
        done();
      });
  });

  it("should DELETE a product", (done) => {
    chai
      .request(baseUrl)
      .delete("/products/1")
      .end(function (err, res) {
        console.log(err);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errors");
        res.body.errors.should.have.property("pages");
        res.body.errors.pages.should.have.property("kind").eql("required");
        done();
      });
  });

  // TODO: Repeatedly calling DELETE API on that resource will not change the outcome – however, 
  // calling DELETE on a resource a second time will return a 404 (NOT FOUND) since it was already removed.
});
