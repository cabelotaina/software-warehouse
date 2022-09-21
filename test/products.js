const chai = require("chai");
let chaiHttp = require("chai-http");

const baseUrl = "http://localhost:3000/api";

chai.use(chaiHttp);

const expect = chai.expect;

let productSelected = null;

describe("products", () => {
  it("should GET all the products", (done) => {
    chai
      .request(baseUrl)
      .get("/products")
      .end(function (err, res) {
        expect(err).to.be.a("null");
        expect(res).to.have.status(200);
        res.body.map((product) => {
          expect(product).to.have.property("id");
          expect(product).to.have.property("name");
          expect(product).to.have.property("total");
        });

        productSelected = res.body[1];
        done();
      });
  });

  it("should DELETE a product", (done) => {
    chai
      .request(baseUrl)
      .delete("/products/" + productSelected.id)
      .end(function (err, res) {
        expect(err).to.be.a("null");
        expect(res).to.have.status(204);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should receive 404 trying to DELETE a product", (done) => {
    chai
      .request(baseUrl)
      .delete("/products/" + productSelected.id)
      .end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.be.equal("Product out of stock");
        done();
      });
  });

  it("should receive 404 trying to DELETE a product", (done) => {
    chai
      .request(baseUrl)
      .delete("/products/632b4fe3298f7946a0a6fe7c")
      .end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.be.equal("Not found");
        done();
      });
  });

});
