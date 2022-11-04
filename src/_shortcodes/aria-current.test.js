const ariaCurrent = require("./aria-current");

it("should not add aria-current if the current link doesn't match identically", () => {
  expect(ariaCurrent("/1", "/2")).toEqual("");
});

it("should add aria-current if the current link matches identically", () => {
  expect(ariaCurrent("/", "/")).toEqual('aria-current="page"');
  expect(ariaCurrent("/blog/", "/blog/")).toEqual('aria-current="page"');
  expect(
    ariaCurrent(
      "/blog/mongolian-throat-singing",
      "/blog/mongolian-throat-singing"
    )
  ).toEqual('aria-current="page"');
});
