var _SlizzardBase = Class.extend({
  init: function ($el, moveParent) {
    this.$el = $el;
    if(moveParent == undefined) moveParent = true;
    this.moveParent = moveParent;
    this.alwaysVisislbe = false;
    this.offsets = {
      top: 0,
      bottom: 0
    };
    this._hidden = false;
    this._staticOffsets = false;
    this.$_offsetParent = this.$el.parent().parent();
  },

  setOffsets: function (top, bottom) {
    this.offsets.top = top;
    this.offsets.bottom = bottom;
    this._staticOffsets = true;
  },

  setOffsetParent: function ($el) {
    this.$_offsetParent = $el;
    this._staticOffsets = false;
  },

  _newOffsets: function (sd) {
    if(this._staticOffsets) return;
    this.offsets.top = this.$_offsetParent.offset().top;
    this.offsets.bottom = this.$_offsetParent.height() + this.offsets.top;
    //this.offsets.visArea = sd.wheight + (this.$el.parent().parent().height() * 2);
  },

  _upd: function (sd) {
    if(this.alwaysVisible) {
      if(this.moveParent)
        this.$el.parent().css({'transform': 'translate3d(0, '+(this.offsets.top - sd.sTop)+'px, 0)'});
      return this.upd(sd);
    }
    if(sd.sBottom > this.offsets.top && sd.sTop < this.offsets.bottom) {
      this.$el.parent().css({'visibility': 'visible'});
      this._hidden = false;
      if(this.moveParent)
        this.$el.parent().css({'transform': 'translate3d(0, '+(this.offsets.top - sd.sTop)+'px, 0)'});
      this.upd(sd);
    } else if(!this._hidden) {
      this.$el.parent().css({'visibility': 'hidden'});
      this._hidden = true;
    }
  },

  _reset: function () {
    if(this._hidden) {
      this.$el.parent().css({'visibility': 'visible'});
      this._hidden = false;
    }
    if(this.moveParent)
      this.$el.parent().css({'transform': 'translate3d(0, 0, 0)'});
    this.reset();
  }
});
