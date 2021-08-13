'use strict';
{
  // ===================================================
  // ==================Panel生成クラス

  class Panel {
    constructor(game) {
      this.game = game;
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
      this.el.addEventListener('click', () => {
        this.check();
      });
    }

    getEl() {
      return this.el;
    }

    activate(num) {
      this.el.classList.remove('pressed');
      this.el.textContent = num;
    }

    check() {
      if (this.game.getCurrentNum() === parseInt(this.el.textContent, 10)) {
        this.el.classList.add('pressed');
        this.game.addCurrentNum();

        if (this.game.getCurrentNum() === this.game.getLevel() ** 2) {
          clearTimeout(this.game.getTimeOutId());
        }
      }
    }
  }

  // ===================================================
  // ==================Panel配置クラス

  class Board {
    constructor(game) {
      this.game = game;
      this.panels = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        this.panels.push(new Panel(this.game));
      }

      this.setUp();
    }

    setUp() {
      const board = document.getElementById('board');
      this.panels.forEach(panel => {
        board.appendChild(panel.getEl());
      });
    }

    activate() {
      const nums = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        nums.push(i);
      }

      this.panels.forEach(panel => {
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num);
      });
    }
  }

  class Game {
    constructor(level) {
      this.level = level;

      this.board = new Board(this);
      this.currentNum = undefined;
      this.startTime = undefined;
      this.timeOutId = undefined;

      const btn = document.getElementById('btn');
      btn.addEventListener('click', () => {
        this.start();
      });
      this.setUp();
    }

    runTimer() {
      const timer = document.getElementById('timer');
      timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);

      this.timeOutId = setTimeout(() => {
        this.runTimer();
      }, 10);
    }

    setUp() {
      const container = document.getElementById('container');
      const PANEL_WIDTH = 50;
      const BOARD_PADDING = 10;
      container.style.width =
        PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px';
    }

    start() {
      if (typeof timeOutId !== 'undefined') {
        clearTimeout(this.timeOutId);
      }
      this.currentNum = 0;
      this.board.activate();
      this.startTime = Date.now();
      this.runTimer();
    }
    addCurrentNum() {
      this.currentNum++;
    }

    getCurrentNum() {
      return this.currentNum;
    }

    getTimeOutId() {
      return this.timeOutId;
    }
    getLevel() {
      return this.level;
    }
  }

  new Game(11);
}
