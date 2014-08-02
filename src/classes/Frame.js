var SlizzardFrame = _SlizzardBase.extend({
  init: function ($el, data, moveParent) {
    this._super($el, moveParent);
    this.frames = data;
  },

  upd: function (sd) {
    var top = this.offsets.top;
    var zero = top - sd.wheight;
    if(zero < 0) zero = 0;
    var full = this.offsets.bottom;
    var sTop = sd.sTop;
    var pcent = (sTop - zero) / (full - zero);

    if(pcent > 1) pcent = 1;

    if(this.frames[0].opacity != undefined) {
      var opcent = (this.frames[100].opacity - this.frames[0].opacity) * pcent + this.frames[0].opacity;
      this.$el.css({'opacity':opcent});
    }
    if(this.frames[0].y != undefined) {
      var yrange = (this.frames[100].y) - (this.frames[0].y);
      var ypos = (pcent * yrange) + this.frames[0].y;
      this.$el.css({'transform': 'translate3d(0, '+ypos+'px, 0)'});
    }
    if(this.frames[0].x != undefined) {
      var xrange = this.frames[100].x - this.frames[0].x;
      var xpos = (pcent * xrange) + this.frames[0].x;
      this.$el.css({'transform': 'translate3d('+xpos+'px, 0, 0)'});
    }
  },

  reset: function () {
    this.$el.css({'transform': 'translate3d(0, 0, 0);'});
    this.$el.css({'opacity':''});
  }
});