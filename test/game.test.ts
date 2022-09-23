import { game, LetterStates } from "../game";

describe("test getLetterStates", () => {
    it("All green - guess 'aaaaa' for answer 'aaaaa'", () => {
        game.initialiseCorrectLetters("aaaaa");
        expect( game.getLetterStates("aaaaa")).toEqual([
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace]);
    });
    it("All green - guess 'uwxyz' for answer 'uwxyz'", () => {
        game.initialiseCorrectLetters("uwxyz");
        expect( game.getLetterStates("uwxyz")).toEqual([
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterRightPlace]);
    });
    it("All yellow - guess 'uwxyz' for answer 'zuwxy'", () => {
        game.initialiseCorrectLetters("zuwxy");
        expect( game.getLetterStates("uwxyz")).toEqual([
            LetterStates.RightLetterWrongPlace,
            LetterStates.RightLetterWrongPlace,
            LetterStates.RightLetterWrongPlace,
            LetterStates.RightLetterWrongPlace,
            LetterStates.RightLetterWrongPlace]);
    });
    it("Less non green occurrences in guess 'aabbb' than answer 'acaaa'", () => {
        game.initialiseCorrectLetters("acaaa");
        expect( game.getLetterStates("aabbb")).toEqual([
            LetterStates.RightLetterRightPlace,
            LetterStates.RightLetterWrongPlace,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter]);
    });
    it("More non green occurrences in guess 'abaaa' than answer 'aaccc'", () => {
        game.initialiseCorrectLetters("aaccc");
        expect( game.getLetterStates("abaaa")).toEqual([
            LetterStates.RightLetterRightPlace,
            LetterStates.WrongLetter,
            LetterStates.RightLetterWrongPlace,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter]);
    });
    it("Guess 'acaaa' for answer 'aabba'", () => {
        game.initialiseCorrectLetters("aabba");
        expect( game.getLetterStates("acaaa")).toEqual([
            LetterStates.RightLetterRightPlace,
            LetterStates.WrongLetter,
            LetterStates.RightLetterWrongPlace,
            LetterStates.WrongLetter,
            LetterStates.RightLetterRightPlace]);
    });
    it("All wrong - guess 'uwxyz' for answer 'abcde'", () => {
        game.initialiseCorrectLetters("abcde");
        expect( game.getLetterStates("uwxyz")).toEqual([
            LetterStates.WrongLetter,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter]);
    });
    it("Guess 'adieu' for answer 'darga'", () => {
        game.initialiseCorrectLetters("darga");
        expect( game.getLetterStates("adieu")).toEqual([
            LetterStates.RightLetterWrongPlace,
            LetterStates.RightLetterWrongPlace,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter,
            LetterStates.WrongLetter]);
    });
});