'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HoverButton = function () {
  function HoverButton(el) {
    _classCallCheck(this, HoverButton);

    this.el = el;
    this.hover = false;
    this.calculatePosition();
    this.attachEventsListener();
  }

  HoverButton.prototype.attachEventsListener = function attachEventsListener() {
    var _this = this;

    window.addEventListener('mousemove', function (e) {
      return _this.onMouseMove(e);
    });
    window.addEventListener('resize', function (e) {
      return _this.calculatePosition(e);
    });
  };

  HoverButton.prototype.calculatePosition = function calculatePosition() {
    TweenMax.set(this.el, {
      x: 0,
      y: 0,
      scale: 1
    });
    var box = this.el.getBoundingClientRect();
    this.x = box.left + box.width * 0.2;
    this.y = box.top + box.height * 0.2;
    this.width = box.width;
    this.height = box.height;
  };

  HoverButton.prototype.onMouseMove = function onMouseMove(e) {
    var hover = false;
    var hoverArea = this.hover ? 0.5 : 0.3;
    var x = e.clientX - this.x;
    var y = e.clientY - this.y;
    var distance = Math.sqrt(x * x + y * y);
    if (distance < this.width * hoverArea) {
      hover = true;
      if (!this.hover) {
        this.hover = true;
      }
      this.onHover(e.clientX, e.clientY);
    }

    if (!hover && this.hover) {
      this.onLeave();
      this.hover = false;
    }
  };

  HoverButton.prototype.onHover = function onHover(x, y) {
    TweenMax.to(this.el, 0.3, {
      x: (x - this.x) * 0.3,
      y: (y - this.y) * 0.3,
      scale: 1.15,
      ease: Power2.easeOut
    });
    this.el.style.zIndex = 10;
  };

  HoverButton.prototype.onLeave = function onLeave() {
    TweenMax.to(this.el, 0.7, {
      x: 0,
      y: 0,
      scale: 1,
      ease: Elastic.easeOut.config(1.5, 0.8)
    });
    this.el.style.zIndex = 1;
  };

  return HoverButton;
}();

var btn1 = document.querySelector('.round-absolute');
new HoverButton(btn1);

var btn3 = document.querySelector('.title');
new HoverButton(btn3);

var btn2 = document.querySelector('.text-animate');
new HoverButton(btn2);

var btn4 = document.querySelector('.btn-animate');
new HoverButton(btn4);