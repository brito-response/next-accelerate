import { capitalize } from "../src/utils/string";

describe("utils/string", () => {
    it("should capitalize the first letter.", () => {
        const input = "post"; // given
        const result = capitalize(input);  // when
        expect(result).toBe("Post");// then
    });

    it("should not alter the rest of the string", () => {
        const input = "postTitle"; // given
        const result = capitalize(input);  // when
        expect(result).toBe("PostTitle");  // then
    });

    it("should work with a single character", () => {
        const input = "a";  // given
        const result = capitalize(input);  // when
        expect(result).toBe("A"); // then
    });

    it("should return an empty string when given an empty string", () => {
        const input = "";  // given
        const result = capitalize(input); // when
        expect(result).toBe(""); // then
    });

    it("should not modify string that already starts with uppercase", () => {
        const input = "Post";  // given
        const result = capitalize(input); // when
        expect(result).toBe("Post"); // then
    });
});
