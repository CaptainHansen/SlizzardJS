var SlizzardBGCA = _SlizzardBase.extend({
  init: function ($el, data) {
    this._super($el, false);
    this.data = data;
  },

  upd: function (sd) {
    var top = this.offsets.top;
    var zero = top - sd.wheight;
    if(zero < 0) zero = 0;
    var full = this.offsets.bottom;
    var sTop = sd.sTop;
    var pcent = (sTop - zero) / (full - zero);

    if(pcent > 1) pcent = 1;
    var range = this.data[100] - this.data[0];
    var alpha = range * pcent + this.data[0];
    var bgc = 'rgba('+this.data.r+','+this.data.g+','+this.data.b+','+alpha+')';
    this.$el.css({'background-color':bgc});
  },

  reset: function () {
    this.$el.css({'background-color': ''});
  }
})