const activeSection = require("./active-section");

it("should not add a class to the homepage link", () => {
  expect(activeSection("/", "/")).toEqual("");
});

it("should not add a class to items that aren't a part of the section", () => {
  expect(
    activeSection(
      "/mongolian-throat-singing/vocalisations-for-beginners/",
      "/underwater-basket-weaving/"
    )
  ).toEqual("");
});

it("should add a class to items that are a part of the section", () => {
  expect(
    activeSection(
      "/mongolian-throat-singing/",
      "/mongolian-throat-singing/kargyraa"
    )
  ).toEqual('class="current"');
});
