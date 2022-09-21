process.env.NODE_ENV = "test";

const chai = require("chai");
let chaiHttp = require("chai-http");
const exp = require("constants");

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
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should DELETE a product", (done) => {
    chai
      .request(baseUrl)
      .delete("/products/1")
      .end(function (err, res) {
        expect(res).to.have.status(204);
        done();
      });
  });


  it("should receive 404 trying to DELETE a product", (done) => {
    chai
      .request(baseUrl)
      .delete("/products/1")
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });

});
