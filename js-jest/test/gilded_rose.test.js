const {Shop, Item} = require("../src/gilded_rose");

const updateItem = (item) => {
  const gildedRose = new Shop([item]);
  gildedRose.updateQuality();
  return item;
};

describe("Gilded Rose", function() {
  describe("default class", () => {
    it("should reduce in quality by one point per day unless other rules", () => {
      expect(updateItem(new Item("foo", 10, 10)).quality).toBe(9);
    });
    it("should never make quality less than zero", () => {
      expect(updateItem(new Item("foo", 10, 0)).quality).toBe(0);
    });
    it("should decrease quality twice as fast once past sell by date", () => {
      expect(updateItem(new Item("foo", -1, 10)).quality).toBe(8);
    });
  });
  describe("aged brie", () => {
    it("should increase in quality as it gets older", () => {
      expect(updateItem(new Item("Aged Brie", 10, 10)).quality).toBe(11);
    });
    it("should never increase in quality over 50", () => {
      expect(updateItem(new Item("Aged Brie", 10, 50)).quality).toBe(50);
    });
  });
  describe("sufaras", () => {
    it("never descreases in quality", () => {
      expect(updateItem(new Item("Sulfuras", 10, 10)).quality).toBe(10);
    });
    it("never descreases in sellin", () => {
      expect(updateItem(new Item("Sulfuras", 10, 10)).sellIn).toBe(10);
    });
  });
  describe("Backstage passes", () => {
    it("Increases in quality as sellin approaches (by 1 if >= 10 days", () => {
      expect(updateItem(new Item("Backstage passes", 11, 10)).quality).toBe(11);
    });
    it("Increases in quality as sellin approaches (by 2 if <= 10 days and > 5 days)", () => {
      expect(updateItem(new Item("Backstage passes", 10, 10)).quality).toBe(12);
      expect(updateItem(new Item("Backstage passes", 9, 10)).quality).toBe(12);
      expect(updateItem(new Item("Backstage passes", 6, 10)).quality).toBe(12);
    });
    it("Increases in quality as sellin approaches (by 3 if 5 days or less)", () => {
      expect(updateItem(new Item("Backstage passes", 5, 10)).quality).toBe(13);
      expect(updateItem(new Item("Backstage passes", 4, 10)).quality).toBe(13);
    });
  });
  describe("conjured", () => {
    it("degrades twice as fast as a normal item", () => {
      expect(updateItem(new Item("Conjured",10, 10)).quality).toBe(8);
    });
  });
});
