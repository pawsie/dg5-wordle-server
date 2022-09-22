"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("../game");
describe("test getLetterStates", () => {
    it("All green - guess 'aaaaa' for answer 'aaaaa'", () => {
        expect(game_1.game.getLetterStates("aaaaa", "aaaaa")).toEqual([
            game_1.LetterStates.RightLetterRightPlace,
            game_1.LetterStates.RightLetterRightPlace,
            game_1.LetterStates.RightLetterRightPlace,
            game_1.LetterStates.RightLetterRightPlace,
            game_1.LetterStates.RightLetterRightPlace
        ]);
    });
    it("All green - guess 'uwxyz' for answer 'uwxyz'", () => {
        expect(game_1.game.getLetterStates("uwxyz", "uwxyz")).toEqual([
            game_1.LetterStates.RightLetterRightPlace,
            game_1.LetterStates.RightLetterRightPlace,
            game_1.LetterStates.RightLetterRightPlace,
            game_1.LetterStates.RightLetterRightPlace,
            game_1.LetterStates.RightLetterRightPlace
        ]);
    });
    it("All yellow - guess 'uwxyz' for answer 'zuwxy'", () => {
        expect(game_1.game.getLetterStates("uwxyz", "zuwxy")).toEqual([
            game_1.LetterStates.RightLetterWrongPlace,
            game_1.LetterStates.RightLetterWrongPlace,
            game_1.LetterStates.RightLetterWrongPlace,
            game_1.LetterStates.RightLetterWrongPlace,
            game_1.LetterStates.RightLetterWrongPlace
        ]);
    });
    it("Less non green occurrences in guess 'aabbb' than answer 'acaaa'", () => {
        expect(game_1.game.getLetterStates("aabbb", "acaaa")).toEqual([
            game_1.LetterStates.RightLetterRightPlace,
            game_1.LetterStates.RightLetterWrongPlace,
            game_1.LetterStates.WrongLetter,
            game_1.LetterStates.WrongLetter,
            game_1.LetterStates.WrongLetter
        ]);
    });
    it("More non green occurrences in guess 'abaaa' than answer 'aaccc'", () => {
        expect(game_1.game.getLetterStates("abaaa", "aaccc")).toEqual([
            game_1.LetterStates.RightLetterRightPlace,
            game_1.LetterStates.WrongLetter,
            game_1.LetterStates.RightLetterWrongPlace,
            game_1.LetterStates.WrongLetter,
            game_1.LetterStates.WrongLetter
        ]);
    });
    it("All wrong - guess 'uwxyz' for answer 'abcde'", () => {
        expect(game_1.game.getLetterStates("uwxyz", "abcde")).toEqual([
            game_1.LetterStates.WrongLetter,
            game_1.LetterStates.WrongLetter,
            game_1.LetterStates.WrongLetter,
            game_1.LetterStates.WrongLetter,
            game_1.LetterStates.WrongLetter
        ]);
    });
    it("Guess 'adieu' for answer 'darga'", () => {
        expect(game_1.game.getLetterStates("adieu", "darga")).toEqual([
            game_1.LetterStates.RightLetterWrongPlace,
            game_1.LetterStates.RightLetterWrongPlace,
            game_1.LetterStates.WrongLetter,
            game_1.LetterStates.WrongLetter,
            game_1.LetterStates.WrongLetter
        ]);
    });
});
