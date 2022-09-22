import { game, LetterStates } from "../game";

describe("test getLetterStates", () => {
    it("All green - guess 'aaaaa' for answer 'aaaaa'", () => {
        expect( game.getLetterStates("aaaaa", "aaaaa")).toEqual([
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace]);
    });
    it("All green - guess 'uwxyz' for answer 'uwxyz'", () => {
        expect( game.getLetterStates("uwxyz", "uwxyz")).toEqual([
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace]);
    });
    it("All yellow - guess 'uwxyz' for answer 'zuwxy'", () => {
        expect( game.getLetterStates("uwxyz", "zuwxy")).toEqual([
            LetterStates.RightLetterWrongPlace,
            LetterStates.RightLetterWrongPlace,
            LetterStates.RightLetterWrongPlace,
            LetterStates.RightLetterWrongPlace,
            LetterStates.RightLetterWrongPlace]);
    });
    it("Less non green occurrences in guess 'aabbb' than answer 'acaaa'", () => {
        expect( game.getLetterStates("aabbb", "acaaa")).toEqual([
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterWrongPlace,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter]);
    });
    it("More non green occurrences in guess 'abaaa' than answer 'aaccc'", () => {
        expect( game.getLetterStates("abaaa", "aaccc")).toEqual([
            LetterStates.RightLetterRightPlace,
            LetterStates.WrongLetter,
            LetterStates.RightLetterWrongPlace,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter]);
    });
    it("All wrong - guess 'uwxyz' for answer 'abcde'", () => {
        expect( game.getLetterStates("uwxyz", "abcde")).toEqual([
            LetterStates.WrongLetter,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter]);
    });
    it("Guess 'adieu' for answer 'darga'", () => {
        expect( game.getLetterStates("adieu", "darga")).toEqual([
            LetterStates.RightLetterWrongPlace,
            LetterStates.RightLetterWrongPlace,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter]);
    });
});