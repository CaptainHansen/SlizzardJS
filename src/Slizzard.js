var Slizzard = Class.extend({
  init: function () {},

  add: function (S) {
    if(!(S instanceof _SlizzardBase))
      throw Error('The object you pass in must be an instance of _SlizzardBase');
    this._slizzards.push(S);
  },

  attach: function () {
    var self = this;
    $(window).scroll(function (e) {
      self._updAll(self._sd);
    });
    $(window).resize(function () {
      self.checkWidth();
      self._updAllOffsets(self._sd);
      self._updAll(self._sd);
    });
  },

  enable: function () {
    var self = this;
    $('body').addClass('use-parallax').removeClass('no-parallax');
    setTimeout(function () {
      self._updAllOffsets(self._sd);
      self._updAll(self._sd);
    }, 100);
    this.disabled = false;
  },

  disable: function () {
    $('body').removeClass('use-parallax').addClass('no-parallax');
    this.disabled = true;
    for(i in this._slizzards) {
      this._slizzards[i]._reset();
    }
  },

  checkWidth: function () {
    if(this.minWidth > 0) {
      var width = $(window).width();
      if(width >= this.minWidth && this.disabled) {
        this.enable();
      } else if (width < this.minWidth && !this.disabled) {
        this.disable();
      }
    }
  },

  disabled: true,

  _sd: {
    sTop: 0,
    sBottom: 0,
    wheight: 0
  },
  _slizzards: [],
  minWidth: 0,

  _updAllOffsets: function () {
    if(this.disabled) return false;
    this._sd.wheight = $(window).height();
    for(i in this._slizzards) {
      this._slizzards[i]._newOffsets(this._sd);
    }
  },

  _updAll: function () {
    if(this.disabled) return false;
    this._sd.sTop = $(window).scrollTop();
    this._sd.sBottom = this._sd.sTop + this._sd.wheight;
    for(i in this._slizzards) {
      this._slizzards[i]._upd(this._sd);
    }
  }
})