var SlizzardRatio = _SlizzardBase.extend({
  init: function ($el, ratio, moveParent) {
    this._super($el, moveParent);
    this.ratio = ratio;
  },

  upd: function (sd) {
    var top = this.offsets.top;
    var bottom = this.offsets.bottom;
    var sBottom = sd.sBottom;
    var sTop = sd.sTop;

    var ypos = (top - sTop) * -this.ratio;
    this.$el.css({'transform': 'translate3d(0, '+ypos+'px, 0)'});
  },

  reset: function () {
    this.$el.css({'transform': 'translate3d(0, 0, 0);'});
  }
})