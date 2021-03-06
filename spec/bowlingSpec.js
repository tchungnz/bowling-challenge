function useStrict () {
  'use strict';
}

describe('BowlingGame', function() {
  var bowlingGame;

  beforeEach(function () {
    bowlingGame = new BowlingGame();
  });

  describe('when constructed it', function() {
    it('has a total score of 0', function() {
      expect(bowlingGame.totalScore).toEqual(0);
    });
    it('has an empty array of frames', function() {
      expect(bowlingGame.allFrameScores).toEqual([]);
    });
    it('starts on the first frame', function() {
      expect(bowlingGame.currentFrame).toEqual(1);
    });
    it('has an empty array of bonuses', function() {
      expect(bowlingGame.bonuses).toEqual([]);
    });
    it('starts with a first bowl', function() {
      expect(bowlingGame.currentBowl).toEqual(1);
    });
  });

  describe('on a players first bowl', function() {
    it('the score is increased by the number of pins knocked over', function () {
      bowlingGame.playerTurn(5);
      expect(bowlingGame.currentFrameScore).toEqual(5);
    });
    it('if a strike is bowled "X" is added to bonuses', function() {
      bowlingGame.playerTurn(10);
      expect(bowlingGame.bonuses).toEqual(["X"]);
    });
  });

  describe('on a players second bowl', function() {
    it('the score is increased by the combined number of pins knocked over', function() {
      bowlingGame.playerTurn(5);
      bowlingGame.playerTurn(4);
      expect(bowlingGame.allFrameScores).toEqual([9]);
      expect(bowlingGame.bonuses).toEqual([" "]);
    });
    it('if a spare is bowled "/" is added to bonuses', function() {
      bowlingGame.playerTurn(5);
      bowlingGame.playerTurn(5);
      expect(bowlingGame.bonuses).toEqual(["/"]);
    });
    it('the number of pins gets added to the total score', function() {
      bowlingGame.playerTurn(5);
      bowlingGame.playerTurn(5);
      expect(bowlingGame.totalScore).toEqual(10);
    });
  });

  describe('if a player gets a spare', function() {
    it('the following bowl is doubled', function() {
      bowlingGame.playerTurn(9);
      bowlingGame.playerTurn(1);
      bowlingGame.playerTurn(10);
      expect(bowlingGame.totalScore).toEqual(30);
    });
  });

  describe('if a player gets a strike', function() {
    it('the next two bowls are doubled', function() {
      bowlingGame.playerTurn(10);
      bowlingGame.playerTurn(5);
      bowlingGame.playerTurn(3);
      expect(bowlingGame.totalScore).toEqual(26);
    });
    it('the next two bowls are doubled, even if they are strikes', function() {
      bowlingGame.playerTurn(10);
      bowlingGame.playerTurn(10);
      bowlingGame.playerTurn(10);
      expect(bowlingGame.totalScore).toEqual(60);
    });
  });

  describe('when a frame is completed', function() {
    it('the current frame is increased', function() {
      bowlingGame.playerTurn(10);
      expect(bowlingGame.currentFrame).toEqual(2);
    });
      it('the current frame score is reset to 0', function() {
        bowlingGame.playerTurn(10);
        expect(bowlingGame.currentFrameScore).toEqual(0);
    });
    it('the total score is updated', function() {
      bowlingGame.playerTurn(10);
      expect(bowlingGame.totalScore).toEqual(10);
  });
    it('the current bowl is reset to 1', function() {
      bowlingGame.playerTurn(10);
      expect(bowlingGame.currentBowl).toEqual(1);
    });
  });

  describe('edge cases', function() {
    it('the max score a player can get is 300', function () {
      for(i=0;i<12;i++) {
        bowlingGame.playerTurn(10);
      }
    expect(bowlingGame.totalScore).toEqual(300);
    });
    it('the player is given three bowls in the last frame', function () {
      for(i=0;i<9;i++) {
        bowlingGame.playerTurn(10);
      }
      bowlingGame.playerTurn(5);
      bowlingGame.playerTurn(5);
      bowlingGame.playerTurn(5);
      expect(bowlingGame.allFrameScores[9]).toEqual(15);
      expect(bowlingGame.totalScore).toEqual(270);
    });
  });

});
