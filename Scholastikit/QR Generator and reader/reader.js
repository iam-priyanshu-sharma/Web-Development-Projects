function getLazarSoftScanner() {
  var e = {};

  function t(e, t) {
    (this.count = e),
      (this.dataCodewords = t),
      this.__defineGetter__("Count", function () {
        return this.count;
      }),
      this.__defineGetter__("DataCodewords", function () {
        return this.dataCodewords;
      });
  }

  function n(e, t, n) {
    (this.ecCodewordsPerBlock = e),
      (this.ecBlocks = n ? new Array(t, n) : new Array(t)),
      this.__defineGetter__("ECCodewordsPerBlock", function () {
        return this.ecCodewordsPerBlock;
      }),
      this.__defineGetter__("TotalECCodewords", function () {
        return this.ecCodewordsPerBlock * this.NumBlocks;
      }),
      this.__defineGetter__("NumBlocks", function () {
        for (var e = 0, t = 0; t < this.ecBlocks.length; t++)
          e += this.ecBlocks[t].length;
        return e;
      }),
      (this.getECBlocks = function () {
        return this.ecBlocks;
      });
  }

  function r(e, t, n, r, i, a) {
    (this.versionNumber = e),
      (this.alignmentPatternCenters = t),
      (this.ecBlocks = new Array(n, r, i, a));
    for (
      var o = 0, s = n.ECCodewordsPerBlock, h = n.getECBlocks(), w = 0;
      w < h.length;
      w++
    ) {
      var f = h[w];
      o += f.Count * (f.DataCodewords + s);
    }
    (this.totalCodewords = o),
      this.__defineGetter__("VersionNumber", function () {
        return this.versionNumber;
      }),
      this.__defineGetter__("AlignmentPatternCenters", function () {
        return this.alignmentPatternCenters;
      }),
      this.__defineGetter__("TotalCodewords", function () {
        return this.totalCodewords;
      }),
      this.__defineGetter__("DimensionForVersion", function () {
        return 17 + 4 * this.versionNumber;
      }),
      (this.buildFunctionPattern = function () {
        var e = this.DimensionForVersion,
          t = new v(e);
        t.setRegion(0, 0, 9, 9),
          t.setRegion(e - 8, 0, 8, 9),
          t.setRegion(0, e - 8, 9, 8);
        for (var n = this.alignmentPatternCenters.length, r = 0; r < n; r++)
          for (var i = this.alignmentPatternCenters[r] - 2, a = 0; a < n; a++)
            (0 == r && (0 == a || a == n - 1)) ||
              (r == n - 1 && 0 == a) ||
              t.setRegion(this.alignmentPatternCenters[a] - 2, i, 5, 5);
        return (
          t.setRegion(6, 9, 1, e - 17),
          t.setRegion(9, 6, e - 17, 1),
          this.versionNumber > 6 &&
            (t.setRegion(e - 11, 0, 3, 6), t.setRegion(0, e - 11, 6, 3)),
          t
        );
      }),
      (this.getECBlocksForLevel = function (e) {
        return this.ecBlocks[e.ordinal()];
      });
  }

  function i(e, t, n, r, a, o, s, h, w) {
    (this.a11 = e),
      (this.a12 = r),
      (this.a13 = s),
      (this.a21 = t),
      (this.a22 = a),
      (this.a23 = h),
      (this.a31 = n),
      (this.a32 = o),
      (this.a33 = w),
      (this.transformPoints1 = function (e) {
        for (
          var t = e.length,
            n = this.a11,
            r = this.a12,
            i = this.a13,
            a = this.a21,
            o = this.a22,
            s = this.a23,
            h = this.a31,
            w = this.a32,
            f = this.a33,
            u = 0;
          u < t;
          u += 2
        ) {
          var d = e[u],
            l = e[u + 1],
            c = i * d + s * l + f;
          (e[u] = (n * d + a * l + h) / c),
            (e[u + 1] = (r * d + o * l + w) / c);
        }
      }),
      (this.transformPoints2 = function (e, t) {
        for (var n = e.length, r = 0; r < n; r++) {
          var i = e[r],
            a = t[r],
            o = this.a13 * i + this.a23 * a + this.a33;
          (e[r] = (this.a11 * i + this.a21 * a + this.a31) / o),
            (t[r] = (this.a12 * i + this.a22 * a + this.a32) / o);
        }
      }),
      (this.buildAdjoint = function () {
        return new i(
          this.a22 * this.a33 - this.a23 * this.a32,
          this.a23 * this.a31 - this.a21 * this.a33,
          this.a21 * this.a32 - this.a22 * this.a31,
          this.a13 * this.a32 - this.a12 * this.a33,
          this.a11 * this.a33 - this.a13 * this.a31,
          this.a12 * this.a31 - this.a11 * this.a32,
          this.a12 * this.a23 - this.a13 * this.a22,
          this.a13 * this.a21 - this.a11 * this.a23,
          this.a11 * this.a22 - this.a12 * this.a21
        );
      }),
      (this.times = function (e) {
        return new i(
          this.a11 * e.a11 + this.a21 * e.a12 + this.a31 * e.a13,
          this.a11 * e.a21 + this.a21 * e.a22 + this.a31 * e.a23,
          this.a11 * e.a31 + this.a21 * e.a32 + this.a31 * e.a33,
          this.a12 * e.a11 + this.a22 * e.a12 + this.a32 * e.a13,
          this.a12 * e.a21 + this.a22 * e.a22 + this.a32 * e.a23,
          this.a12 * e.a31 + this.a22 * e.a32 + this.a32 * e.a33,
          this.a13 * e.a11 + this.a23 * e.a12 + this.a33 * e.a13,
          this.a13 * e.a21 + this.a23 * e.a22 + this.a33 * e.a23,
          this.a13 * e.a31 + this.a23 * e.a32 + this.a33 * e.a33
        );
      });
  }

  function a(e, t) {
    (this.bits = e), (this.points = t);
  }

  function o(t) {
    (this.image = t),
      (this.resultPointCallback = null),
      (this.sizeOfBlackWhiteBlackRun = function (e, t, n, r) {
        var i = Math.abs(r - t) > Math.abs(n - e);
        if (i) {
          var a = e;
          (e = t), (t = a), (a = n), (n = r), (r = a);
        }
        for (
          var o = Math.abs(n - e),
            s = Math.abs(r - t),
            h = -o >> 1,
            w = t < r ? 1 : -1,
            f = e < n ? 1 : -1,
            u = 0,
            d = e,
            l = t;
          d != n;
          d += f
        ) {
          var c = i ? l : d,
            g = i ? d : l;
          if (
            (1 == u
              ? this.image[c + g * A.width] && u++
              : this.image[c + g * A.width] || u++,
            3 == u)
          ) {
            var v = d - e,
              m = l - t;
            return Math.sqrt(v * v + m * m);
          }
          if ((h += s) > 0) {
            if (l == r) break;
            (l += w), (h -= o);
          }
        }
        var b = n - e,
          y = r - t;
        return Math.sqrt(b * b + y * y);
      }),
      (this.sizeOfBlackWhiteBlackRunBothWays = function (e, t, n, r) {
        var i = this.sizeOfBlackWhiteBlackRun(e, t, n, r),
          a = 1,
          o = e - (n - e);
        o < 0
          ? ((a = e / (e - o)), (o = 0))
          : o >= A.width &&
            ((a = (A.width - 1 - e) / (o - e)), (o = A.width - 1));
        var s = Math.floor(t - (r - t) * a);
        return (
          (a = 1),
          s < 0
            ? ((a = t / (t - s)), (s = 0))
            : s >= A.height &&
              ((a = (A.height - 1 - t) / (s - t)), (s = A.height - 1)),
          (o = Math.floor(e + (o - e) * a)),
          (i += this.sizeOfBlackWhiteBlackRun(e, t, o, s)) - 1
        );
      }),
      (this.calculateModuleSizeOneWay = function (e, t) {
        var n = this.sizeOfBlackWhiteBlackRunBothWays(
            Math.floor(e.X),
            Math.floor(e.Y),
            Math.floor(t.X),
            Math.floor(t.Y)
          ),
          r = this.sizeOfBlackWhiteBlackRunBothWays(
            Math.floor(t.X),
            Math.floor(t.Y),
            Math.floor(e.X),
            Math.floor(e.Y)
          );
        return isNaN(n) ? r / 7 : isNaN(r) ? n / 7 : (n + r) / 14;
      }),
      (this.calculateModuleSize = function (e, t, n) {
        return (
          (this.calculateModuleSizeOneWay(e, t) +
            this.calculateModuleSizeOneWay(e, n)) /
          2
        );
      }),
      (this.distance = function (e, t) {
        var n = e.X - t.X,
          r = e.Y - t.Y;
        return Math.sqrt(n * n + r * r);
      }),
      (this.computeDimension = function (e, t, n, r) {
        var i =
          7 +
          ((Math.round(this.distance(e, t) / r) +
            Math.round(this.distance(e, n) / r)) >>
            1);
        switch (3 & i) {
          case 0:
            i++;
            break;
          case 2:
            i--;
            break;
          case 3:
            throw "Error";
        }
        return i;
      }),
      (this.findAlignmentInRegion = function (e, t, n, r) {
        var i = Math.floor(r * e),
          a = Math.max(0, t - i),
          o = Math.min(A.width - 1, t + i);
        if (o - a < 3 * e) throw "Error";
        var s = Math.max(0, n - i),
          h = Math.min(A.height - 1, n + i);
        return new F(
          this.image,
          a,
          s,
          o - a,
          h - s,
          e,
          this.resultPointCallback
        ).find();
      }),
      (this.createTransform = function (e, t, n, r, a) {
        var o,
          s,
          h,
          w,
          f = a - 3.5;
        return (
          null != r
            ? ((o = r.X), (s = r.Y), (h = w = f - 3))
            : ((o = t.X - e.X + n.X), (s = t.Y - e.Y + n.Y), (h = w = f)),
          i.quadrilateralToQuadrilateral(
            3.5,
            3.5,
            f,
            3.5,
            h,
            w,
            3.5,
            f,
            e.X,
            e.Y,
            t.X,
            t.Y,
            o,
            s,
            n.X,
            n.Y
          )
        );
      }),
      (this.sampleGrid = function (t, n, r) {
        return e.sampleGrid3(t, r, n);
      }),
      (this.processFinderPatternInfo = function (e) {
        var t = e.TopLeft,
          n = e.TopRight,
          i = e.BottomLeft,
          o = this.calculateModuleSize(t, n, i);
        if (o < 1) throw "Error";
        var s = this.computeDimension(t, n, i, o),
          h = r.getProvisionalVersionForDimension(s),
          w = h.DimensionForVersion - 7,
          f = null;
        if (h.AlignmentPatternCenters.length > 0)
          for (
            var u = n.X - t.X + i.X,
              d = n.Y - t.Y + i.Y,
              l = 1 - 3 / w,
              c = Math.floor(t.X + l * (u - t.X)),
              g = Math.floor(t.Y + l * (d - t.Y)),
              v = 4;
            v <= 16;
            v <<= 1
          ) {
            f = this.findAlignmentInRegion(o, c, g, v);
            break;
          }
        var m = this.createTransform(t, n, i, f, s);
        return new a(
          this.sampleGrid(this.image, m, s),
          null == f ? new Array(i, t, n) : new Array(i, t, n, f)
        );
      }),
      (this.detect = function () {
        var e = new D().findFinderPattern(this.image);
        return this.processFinderPatternInfo(e);
      });
  }
  (e.checkAndNudgePoints = function (e, t) {
    for (
      var n = A.width, r = A.height, i = !0, a = 0;
      a < t.length && i;
      a += 2
    ) {
      var o = Math.floor(t[a]),
        s = Math.floor(t[a + 1]);
      if (o < -1 || o > n || s < -1 || s > r)
        throw "Error.checkAndNudgePoints ";
      (i = !1),
        -1 == o ? ((t[a] = 0), (i = !0)) : o == n && ((t[a] = n - 1), (i = !0)),
        -1 == s
          ? ((t[a + 1] = 0), (i = !0))
          : s == r && ((t[a + 1] = r - 1), (i = !0));
    }
    i = !0;
    for (a = t.length - 2; a >= 0 && i; a -= 2) {
      (o = Math.floor(t[a])), (s = Math.floor(t[a + 1]));
      if (o < -1 || o > n || s < -1 || s > r)
        throw "Error.checkAndNudgePoints ";
      (i = !1),
        -1 == o ? ((t[a] = 0), (i = !0)) : o == n && ((t[a] = n - 1), (i = !0)),
        -1 == s
          ? ((t[a + 1] = 0), (i = !0))
          : s == r && ((t[a + 1] = r - 1), (i = !0));
    }
  }),
    (e.sampleGrid3 = function (t, n, r) {
      for (var i = new v(n), a = new Array(n << 1), o = 0; o < n; o++) {
        for (var s = a.length, h = o + 0.5, w = 0; w < s; w += 2)
          (a[w] = 0.5 + (w >> 1)), (a[w + 1] = h);
        r.transformPoints1(a), e.checkAndNudgePoints(t, a);
        try {
          for (w = 0; w < s; w += 2) {
            t[Math.floor(a[w]) + A.width * Math.floor(a[w + 1])] &&
              i.set_Renamed(w >> 1, o);
          }
        } catch (e) {
          throw "Error.checkAndNudgePoints";
        }
      }
      return i;
    }),
    (e.sampleGridx = function (
      t,
      n,
      r,
      a,
      o,
      s,
      h,
      w,
      f,
      u,
      d,
      l,
      c,
      g,
      v,
      m,
      b,
      y
    ) {
      var C = i.quadrilateralToQuadrilateral(
        r,
        a,
        o,
        s,
        h,
        w,
        f,
        u,
        d,
        l,
        c,
        g,
        v,
        m,
        b,
        y
      );
      return e.sampleGrid3(t, n, C);
    }),
    (r.VERSION_DECODE_INFO = new Array(
      31892,
      34236,
      39577,
      42195,
      48118,
      51042,
      55367,
      58893,
      63784,
      68472,
      70749,
      76311,
      79154,
      84390,
      87683,
      92361,
      96236,
      102084,
      102881,
      110507,
      110734,
      117786,
      119615,
      126325,
      127568,
      133589,
      136944,
      141498,
      145311,
      150283,
      152622,
      158308,
      161089,
      167017
    )),
    (r.VERSIONS = new Array(
      new r(
        1,
        new Array(),
        new n(7, new t(1, 19)),
        new n(10, new t(1, 16)),
        new n(13, new t(1, 13)),
        new n(17, new t(1, 9))
      ),
      new r(
        2,
        new Array(6, 18),
        new n(10, new t(1, 34)),
        new n(16, new t(1, 28)),
        new n(22, new t(1, 22)),
        new n(28, new t(1, 16))
      ),
      new r(
        3,
        new Array(6, 22),
        new n(15, new t(1, 55)),
        new n(26, new t(1, 44)),
        new n(18, new t(2, 17)),
        new n(22, new t(2, 13))
      ),
      new r(
        4,
        new Array(6, 26),
        new n(20, new t(1, 80)),
        new n(18, new t(2, 32)),
        new n(26, new t(2, 24)),
        new n(16, new t(4, 9))
      ),
      new r(
        5,
        new Array(6, 30),
        new n(26, new t(1, 108)),
        new n(24, new t(2, 43)),
        new n(18, new t(2, 15), new t(2, 16)),
        new n(22, new t(2, 11), new t(2, 12))
      ),
      new r(
        6,
        new Array(6, 34),
        new n(18, new t(2, 68)),
        new n(16, new t(4, 27)),
        new n(24, new t(4, 19)),
        new n(28, new t(4, 15))
      ),
      new r(
        7,
        new Array(6, 22, 38),
        new n(20, new t(2, 78)),
        new n(18, new t(4, 31)),
        new n(18, new t(2, 14), new t(4, 15)),
        new n(26, new t(4, 13), new t(1, 14))
      ),
      new r(
        8,
        new Array(6, 24, 42),
        new n(24, new t(2, 97)),
        new n(22, new t(2, 38), new t(2, 39)),
        new n(22, new t(4, 18), new t(2, 19)),
        new n(26, new t(4, 14), new t(2, 15))
      ),
      new r(
        9,
        new Array(6, 26, 46),
        new n(30, new t(2, 116)),
        new n(22, new t(3, 36), new t(2, 37)),
        new n(20, new t(4, 16), new t(4, 17)),
        new n(24, new t(4, 12), new t(4, 13))
      ),
      new r(
        10,
        new Array(6, 28, 50),
        new n(18, new t(2, 68), new t(2, 69)),
        new n(26, new t(4, 43), new t(1, 44)),
        new n(24, new t(6, 19), new t(2, 20)),
        new n(28, new t(6, 15), new t(2, 16))
      ),
      new r(
        11,
        new Array(6, 30, 54),
        new n(20, new t(4, 81)),
        new n(30, new t(1, 50), new t(4, 51)),
        new n(28, new t(4, 22), new t(4, 23)),
        new n(24, new t(3, 12), new t(8, 13))
      ),
      new r(
        12,
        new Array(6, 32, 58),
        new n(24, new t(2, 92), new t(2, 93)),
        new n(22, new t(6, 36), new t(2, 37)),
        new n(26, new t(4, 20), new t(6, 21)),
        new n(28, new t(7, 14), new t(4, 15))
      ),
      new r(
        13,
        new Array(6, 34, 62),
        new n(26, new t(4, 107)),
        new n(22, new t(8, 37), new t(1, 38)),
        new n(24, new t(8, 20), new t(4, 21)),
        new n(22, new t(12, 11), new t(4, 12))
      ),
      new r(
        14,
        new Array(6, 26, 46, 66),
        new n(30, new t(3, 115), new t(1, 116)),
        new n(24, new t(4, 40), new t(5, 41)),
        new n(20, new t(11, 16), new t(5, 17)),
        new n(24, new t(11, 12), new t(5, 13))
      ),
      new r(
        15,
        new Array(6, 26, 48, 70),
        new n(22, new t(5, 87), new t(1, 88)),
        new n(24, new t(5, 41), new t(5, 42)),
        new n(30, new t(5, 24), new t(7, 25)),
        new n(24, new t(11, 12), new t(7, 13))
      ),
      new r(
        16,
        new Array(6, 26, 50, 74),
        new n(24, new t(5, 98), new t(1, 99)),
        new n(28, new t(7, 45), new t(3, 46)),
        new n(24, new t(15, 19), new t(2, 20)),
        new n(30, new t(3, 15), new t(13, 16))
      ),
      new r(
        17,
        new Array(6, 30, 54, 78),
        new n(28, new t(1, 107), new t(5, 108)),
        new n(28, new t(10, 46), new t(1, 47)),
        new n(28, new t(1, 22), new t(15, 23)),
        new n(28, new t(2, 14), new t(17, 15))
      ),
      new r(
        18,
        new Array(6, 30, 56, 82),
        new n(30, new t(5, 120), new t(1, 121)),
        new n(26, new t(9, 43), new t(4, 44)),
        new n(28, new t(17, 22), new t(1, 23)),
        new n(28, new t(2, 14), new t(19, 15))
      ),
      new r(
        19,
        new Array(6, 30, 58, 86),
        new n(28, new t(3, 113), new t(4, 114)),
        new n(26, new t(3, 44), new t(11, 45)),
        new n(26, new t(17, 21), new t(4, 22)),
        new n(26, new t(9, 13), new t(16, 14))
      ),
      new r(
        20,
        new Array(6, 34, 62, 90),
        new n(28, new t(3, 107), new t(5, 108)),
        new n(26, new t(3, 41), new t(13, 42)),
        new n(30, new t(15, 24), new t(5, 25)),
        new n(28, new t(15, 15), new t(10, 16))
      ),
      new r(
        21,
        new Array(6, 28, 50, 72, 94),
        new n(28, new t(4, 116), new t(4, 117)),
        new n(26, new t(17, 42)),
        new n(28, new t(17, 22), new t(6, 23)),
        new n(30, new t(19, 16), new t(6, 17))
      ),
      new r(
        22,
        new Array(6, 26, 50, 74, 98),
        new n(28, new t(2, 111), new t(7, 112)),
        new n(28, new t(17, 46)),
        new n(30, new t(7, 24), new t(16, 25)),
        new n(24, new t(34, 13))
      ),
      new r(
        23,
        new Array(6, 30, 54, 74, 102),
        new n(30, new t(4, 121), new t(5, 122)),
        new n(28, new t(4, 47), new t(14, 48)),
        new n(30, new t(11, 24), new t(14, 25)),
        new n(30, new t(16, 15), new t(14, 16))
      ),
      new r(
        24,
        new Array(6, 28, 54, 80, 106),
        new n(30, new t(6, 117), new t(4, 118)),
        new n(28, new t(6, 45), new t(14, 46)),
        new n(30, new t(11, 24), new t(16, 25)),
        new n(30, new t(30, 16), new t(2, 17))
      ),
      new r(
        25,
        new Array(6, 32, 58, 84, 110),
        new n(26, new t(8, 106), new t(4, 107)),
        new n(28, new t(8, 47), new t(13, 48)),
        new n(30, new t(7, 24), new t(22, 25)),
        new n(30, new t(22, 15), new t(13, 16))
      ),
      new r(
        26,
        new Array(6, 30, 58, 86, 114),
        new n(28, new t(10, 114), new t(2, 115)),
        new n(28, new t(19, 46), new t(4, 47)),
        new n(28, new t(28, 22), new t(6, 23)),
        new n(30, new t(33, 16), new t(4, 17))
      ),
      new r(
        27,
        new Array(6, 34, 62, 90, 118),
        new n(30, new t(8, 122), new t(4, 123)),
        new n(28, new t(22, 45), new t(3, 46)),
        new n(30, new t(8, 23), new t(26, 24)),
        new n(30, new t(12, 15), new t(28, 16))
      ),
      new r(
        28,
        new Array(6, 26, 50, 74, 98, 122),
        new n(30, new t(3, 117), new t(10, 118)),
        new n(28, new t(3, 45), new t(23, 46)),
        new n(30, new t(4, 24), new t(31, 25)),
        new n(30, new t(11, 15), new t(31, 16))
      ),
      new r(
        29,
        new Array(6, 30, 54, 78, 102, 126),
        new n(30, new t(7, 116), new t(7, 117)),
        new n(28, new t(21, 45), new t(7, 46)),
        new n(30, new t(1, 23), new t(37, 24)),
        new n(30, new t(19, 15), new t(26, 16))
      ),
      new r(
        30,
        new Array(6, 26, 52, 78, 104, 130),
        new n(30, new t(5, 115), new t(10, 116)),
        new n(28, new t(19, 47), new t(10, 48)),
        new n(30, new t(15, 24), new t(25, 25)),
        new n(30, new t(23, 15), new t(25, 16))
      ),
      new r(
        31,
        new Array(6, 30, 56, 82, 108, 134),
        new n(30, new t(13, 115), new t(3, 116)),
        new n(28, new t(2, 46), new t(29, 47)),
        new n(30, new t(42, 24), new t(1, 25)),
        new n(30, new t(23, 15), new t(28, 16))
      ),
      new r(
        32,
        new Array(6, 34, 60, 86, 112, 138),
        new n(30, new t(17, 115)),
        new n(28, new t(10, 46), new t(23, 47)),
        new n(30, new t(10, 24), new t(35, 25)),
        new n(30, new t(19, 15), new t(35, 16))
      ),
      new r(
        33,
        new Array(6, 30, 58, 86, 114, 142),
        new n(30, new t(17, 115), new t(1, 116)),
        new n(28, new t(14, 46), new t(21, 47)),
        new n(30, new t(29, 24), new t(19, 25)),
        new n(30, new t(11, 15), new t(46, 16))
      ),
      new r(
        34,
        new Array(6, 34, 62, 90, 118, 146),
        new n(30, new t(13, 115), new t(6, 116)),
        new n(28, new t(14, 46), new t(23, 47)),
        new n(30, new t(44, 24), new t(7, 25)),
        new n(30, new t(59, 16), new t(1, 17))
      ),
      new r(
        35,
        new Array(6, 30, 54, 78, 102, 126, 150),
        new n(30, new t(12, 121), new t(7, 122)),
        new n(28, new t(12, 47), new t(26, 48)),
        new n(30, new t(39, 24), new t(14, 25)),
        new n(30, new t(22, 15), new t(41, 16))
      ),
      new r(
        36,
        new Array(6, 24, 50, 76, 102, 128, 154),
        new n(30, new t(6, 121), new t(14, 122)),
        new n(28, new t(6, 47), new t(34, 48)),
        new n(30, new t(46, 24), new t(10, 25)),
        new n(30, new t(2, 15), new t(64, 16))
      ),
      new r(
        37,
        new Array(6, 28, 54, 80, 106, 132, 158),
        new n(30, new t(17, 122), new t(4, 123)),
        new n(28, new t(29, 46), new t(14, 47)),
        new n(30, new t(49, 24), new t(10, 25)),
        new n(30, new t(24, 15), new t(46, 16))
      ),
      new r(
        38,
        new Array(6, 32, 58, 84, 110, 136, 162),
        new n(30, new t(4, 122), new t(18, 123)),
        new n(28, new t(13, 46), new t(32, 47)),
        new n(30, new t(48, 24), new t(14, 25)),
        new n(30, new t(42, 15), new t(32, 16))
      ),
      new r(
        39,
        new Array(6, 26, 54, 82, 110, 138, 166),
        new n(30, new t(20, 117), new t(4, 118)),
        new n(28, new t(40, 47), new t(7, 48)),
        new n(30, new t(43, 24), new t(22, 25)),
        new n(30, new t(10, 15), new t(67, 16))
      ),
      new r(
        40,
        new Array(6, 30, 58, 86, 114, 142, 170),
        new n(30, new t(19, 118), new t(6, 119)),
        new n(28, new t(18, 47), new t(31, 48)),
        new n(30, new t(34, 24), new t(34, 25)),
        new n(30, new t(20, 15), new t(61, 16))
      )
    )),
    (r.getVersionForNumber = function (e) {
      if (e < 1 || e > 40) throw "ArgumentException";
      return r.VERSIONS[e - 1];
    }),
    (r.getProvisionalVersionForDimension = function (e) {
      if (e % 4 != 1) throw "Error getProvisionalVersionForDimension";
      try {
        return r.getVersionForNumber((e - 17) >> 2);
      } catch (e) {
        throw "Error getVersionForNumber";
      }
    }),
    (r.decodeVersionInformation = function (e) {
      for (
        var t = 4294967295, n = 0, i = 0;
        i < r.VERSION_DECODE_INFO.length;
        i++
      ) {
        var a = r.VERSION_DECODE_INFO[i];
        if (a == e) return this.getVersionForNumber(i + 7);
        var o = w.numBitsDiffering(e, a);
        o < t && ((n = i + 7), (t = o));
      }
      return t <= 3 ? this.getVersionForNumber(n) : null;
    }),
    (i.quadrilateralToQuadrilateral = function (
      e,
      t,
      n,
      r,
      i,
      a,
      o,
      s,
      h,
      w,
      f,
      u,
      d,
      l,
      c,
      g
    ) {
      var v = this.quadrilateralToSquare(e, t, n, r, i, a, o, s);
      return this.squareToQuadrilateral(h, w, f, u, d, l, c, g).times(v);
    }),
    (i.squareToQuadrilateral = function (e, t, n, r, a, o, s, h) {
      var w = h - o,
        f = t - r + o - h;
      if (0 == w && 0 == f)
        return new i(n - e, a - n, e, r - t, o - r, t, 0, 0, 1);
      var u = n - a,
        d = s - a,
        l = e - n + a - s,
        c = r - o,
        g = u * w - d * c,
        v = (l * w - d * f) / g,
        m = (u * f - l * c) / g;
      return new i(
        n - e + v * n,
        s - e + m * s,
        e,
        r - t + v * r,
        h - t + m * h,
        t,
        v,
        m,
        1
      );
    }),
    (i.quadrilateralToSquare = function (e, t, n, r, i, a, o, s) {
      return this.squareToQuadrilateral(e, t, n, r, i, a, o, s).buildAdjoint();
    });
  var s = new Array(
      new Array(21522, 0),
      new Array(20773, 1),
      new Array(24188, 2),
      new Array(23371, 3),
      new Array(17913, 4),
      new Array(16590, 5),
      new Array(20375, 6),
      new Array(19104, 7),
      new Array(30660, 8),
      new Array(29427, 9),
      new Array(32170, 10),
      new Array(30877, 11),
      new Array(26159, 12),
      new Array(25368, 13),
      new Array(27713, 14),
      new Array(26998, 15),
      new Array(5769, 16),
      new Array(5054, 17),
      new Array(7399, 18),
      new Array(6608, 19),
      new Array(1890, 20),
      new Array(597, 21),
      new Array(3340, 22),
      new Array(2107, 23),
      new Array(13663, 24),
      new Array(12392, 25),
      new Array(16177, 26),
      new Array(14854, 27),
      new Array(9396, 28),
      new Array(8579, 29),
      new Array(11994, 30),
      new Array(11245, 31)
    ),
    h = new Array(0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4);

  function w(e) {
    (this.errorCorrectionLevel = f.forBits((e >> 3) & 3)),
      (this.dataMask = 7 & e),
      this.__defineGetter__("ErrorCorrectionLevel", function () {
        return this.errorCorrectionLevel;
      }),
      this.__defineGetter__("DataMask", function () {
        return this.dataMask;
      }),
      (this.GetHashCode = function () {
        return (this.errorCorrectionLevel.ordinal() << 3) | this.dataMask;
      }),
      (this.Equals = function (e) {
        var t = e;
        return (
          this.errorCorrectionLevel == t.errorCorrectionLevel &&
          this.dataMask == t.dataMask
        );
      });
  }

  function f(e, t, n) {
    (this.ordinal_Renamed_Field = e),
      (this.bits = t),
      (this.name = n),
      this.__defineGetter__("Bits", function () {
        return this.bits;
      }),
      this.__defineGetter__("Name", function () {
        return this.name;
      }),
      (this.ordinal = function () {
        return this.ordinal_Renamed_Field;
      });
  }
  (w.numBitsDiffering = function (e, t) {
    return (
      h[15 & (e ^= t)] +
      h[15 & M(e, 4)] +
      h[15 & M(e, 8)] +
      h[15 & M(e, 12)] +
      h[15 & M(e, 16)] +
      h[15 & M(e, 20)] +
      h[15 & M(e, 24)] +
      h[15 & M(e, 28)]
    );
  }),
    (w.decodeFormatInformation = function (e) {
      var t = w.doDecodeFormatInformation(e);
      return null != t ? t : w.doDecodeFormatInformation(21522 ^ e);
    }),
    (w.doDecodeFormatInformation = function (e) {
      for (var t = 4294967295, n = 0, r = 0; r < s.length; r++) {
        var i = s[r],
          a = i[0];
        if (a == e) return new w(i[1]);
        var o = this.numBitsDiffering(e, a);
        o < t && ((n = i[1]), (t = o));
      }
      return t <= 3 ? new w(n) : null;
    }),
    (f.forBits = function (e) {
      if (e < 0 || e >= g.length) throw "ArgumentException";
      return g[e];
    });
  var u = new f(0, 1, "L"),
    d = new f(1, 0, "M"),
    l = new f(2, 3, "Q"),
    c = new f(3, 2, "H"),
    g = new Array(d, u, c, l);

  function v(e, t) {
    if ((t || (t = e), e < 1 || t < 1))
      throw "Both dimensions must be greater than 0";
    (this.width = e), (this.height = t);
    var n = e >> 5;
    0 != (31 & e) && n++, (this.rowSize = n), (this.bits = new Array(n * t));
    for (var r = 0; r < this.bits.length; r++) this.bits[r] = 0;
    this.__defineGetter__("Width", function () {
      return this.width;
    }),
      this.__defineGetter__("Height", function () {
        return this.height;
      }),
      this.__defineGetter__("Dimension", function () {
        if (this.width != this.height)
          throw "Can't call getDimension() on a non-square matrix";
        return this.width;
      }),
      (this.get_Renamed = function (e, t) {
        var n = t * this.rowSize + (e >> 5);
        return 0 != (1 & M(this.bits[n], 31 & e));
      }),
      (this.set_Renamed = function (e, t) {
        var n = t * this.rowSize + (e >> 5);
        this.bits[n] |= 1 << (31 & e);
      }),
      (this.flip = function (e, t) {
        var n = t * this.rowSize + (e >> 5);
        this.bits[n] ^= 1 << (31 & e);
      }),
      (this.clear = function () {
        for (var e = this.bits.length, t = 0; t < e; t++) this.bits[t] = 0;
      }),
      (this.setRegion = function (e, t, n, r) {
        if (t < 0 || e < 0) throw "Left and top must be nonnegative";
        if (r < 1 || n < 1) throw "Height and width must be at least 1";
        var i = e + n,
          a = t + r;
        if (a > this.height || i > this.width)
          throw "The region must fit inside the matrix";
        for (var o = t; o < a; o++)
          for (var s = o * this.rowSize, h = e; h < i; h++)
            this.bits[s + (h >> 5)] |= 1 << (31 & h);
      });
  }

  function m(e, t) {
    (this.numDataCodewords = e),
      (this.codewords = t),
      this.__defineGetter__("NumDataCodewords", function () {
        return this.numDataCodewords;
      }),
      this.__defineGetter__("Codewords", function () {
        return this.codewords;
      });
  }

  function b(e) {
    var t = e.Dimension;
    if (t < 21 || 1 != (3 & t)) throw "Error BitMatrixParser";
    (this.bitMatrix = e),
      (this.parsedVersion = null),
      (this.parsedFormatInfo = null),
      (this.copyBit = function (e, t, n) {
        return this.bitMatrix.get_Renamed(e, t) ? (n << 1) | 1 : n << 1;
      }),
      (this.readFormatInformation = function () {
        if (null != this.parsedFormatInfo) return this.parsedFormatInfo;
        for (var e = 0, t = 0; t < 6; t++) e = this.copyBit(t, 8, e);
        (e = this.copyBit(7, 8, e)),
          (e = this.copyBit(8, 8, e)),
          (e = this.copyBit(8, 7, e));
        for (var n = 5; n >= 0; n--) e = this.copyBit(8, n, e);
        if (
          ((this.parsedFormatInfo = w.decodeFormatInformation(e)),
          null != this.parsedFormatInfo)
        )
          return this.parsedFormatInfo;
        var r = this.bitMatrix.Dimension;
        e = 0;
        var i = r - 8;
        for (t = r - 1; t >= i; t--) e = this.copyBit(t, 8, e);
        for (n = r - 7; n < r; n++) e = this.copyBit(8, n, e);
        if (
          ((this.parsedFormatInfo = w.decodeFormatInformation(e)),
          null != this.parsedFormatInfo)
        )
          return this.parsedFormatInfo;
        throw "Error readFormatInformation";
      }),
      (this.readVersion = function () {
        if (null != this.parsedVersion) return this.parsedVersion;
        var e = this.bitMatrix.Dimension,
          t = (e - 17) >> 2;
        if (t <= 6) return r.getVersionForNumber(t);
        for (var n = 0, i = e - 11, a = 5; a >= 0; a--)
          for (var o = e - 9; o >= i; o--) n = this.copyBit(o, a, n);
        if (
          ((this.parsedVersion = r.decodeVersionInformation(n)),
          null != this.parsedVersion &&
            this.parsedVersion.DimensionForVersion == e)
        )
          return this.parsedVersion;
        n = 0;
        for (o = 5; o >= 0; o--)
          for (a = e - 9; a >= i; a--) n = this.copyBit(o, a, n);
        if (
          ((this.parsedVersion = r.decodeVersionInformation(n)),
          null != this.parsedVersion &&
            this.parsedVersion.DimensionForVersion == e)
        )
          return this.parsedVersion;
        throw "Error readVersion";
      }),
      (this.readCodewords = function () {
        var e = this.readFormatInformation(),
          t = this.readVersion(),
          n = y.forReference(e.DataMask),
          r = this.bitMatrix.Dimension;
        n.unmaskBitMatrix(this.bitMatrix, r);
        for (
          var i = t.buildFunctionPattern(),
            a = !0,
            o = new Array(t.TotalCodewords),
            s = 0,
            h = 0,
            w = 0,
            f = r - 1;
          f > 0;
          f -= 2
        ) {
          6 == f && f--;
          for (var u = 0; u < r; u++)
            for (var d = a ? r - 1 - u : u, l = 0; l < 2; l++)
              i.get_Renamed(f - l, d) ||
                (w++,
                (h <<= 1),
                this.bitMatrix.get_Renamed(f - l, d) && (h |= 1),
                8 == w && ((o[s++] = h), (w = 0), (h = 0)));
          a ^= !0;
        }
        if (s != t.TotalCodewords) throw "Error readCodewords";
        return o;
      });
  }
  m.getDataBlocks = function (e, t, n) {
    if (e.length != t.TotalCodewords) throw "ArgumentException";
    for (
      var r = t.getECBlocksForLevel(n), i = 0, a = r.getECBlocks(), o = 0;
      o < a.length;
      o++
    )
      i += a[o].Count;
    for (var s = new Array(i), h = 0, w = 0; w < a.length; w++) {
      var f = a[w];
      for (o = 0; o < f.Count; o++) {
        var u = f.DataCodewords,
          d = r.ECCodewordsPerBlock + u;
        s[h++] = new m(u, new Array(d));
      }
    }
    for (var l = s[0].codewords.length, c = s.length - 1; c >= 0; ) {
      if (s[c].codewords.length == l) break;
      c--;
    }
    c++;
    var g = l - r.ECCodewordsPerBlock,
      v = 0;
    for (o = 0; o < g; o++) for (w = 0; w < h; w++) s[w].codewords[o] = e[v++];
    for (w = c; w < h; w++) s[w].codewords[g] = e[v++];
    var b = s[0].codewords.length;
    for (o = g; o < b; o++)
      for (w = 0; w < h; w++) {
        var y = w < c ? o : o + 1;
        s[w].codewords[y] = e[v++];
      }
    return s;
  };
  var y = {};

  function C(e, t) {
    if (null == t || 0 == t.length) throw "System.ArgumentException";
    this.field = e;
    var n = t.length;
    if (n > 1 && 0 == t[0]) {
      for (var r = 1; r < n && 0 == t[r]; ) r++;
      if (r == n) this.coefficients = e.Zero.coefficients;
      else {
        this.coefficients = new Array(n - r);
        for (var i = 0; i < this.coefficients.length; i++)
          this.coefficients[i] = 0;
        for (var a = 0; a < this.coefficients.length; a++)
          this.coefficients[a] = t[r + a];
      }
    } else this.coefficients = t;
    this.__defineGetter__("Zero", function () {
      return 0 == this.coefficients[0];
    }),
      this.__defineGetter__("Degree", function () {
        return this.coefficients.length - 1;
      }),
      this.__defineGetter__("Coefficients", function () {
        return this.coefficients;
      }),
      (this.getCoefficient = function (e) {
        return this.coefficients[this.coefficients.length - 1 - e];
      }),
      (this.evaluateAt = function (e) {
        if (0 == e) return this.getCoefficient(0);
        var t = this.coefficients.length;
        if (1 == e) {
          for (var n = 0, r = 0; r < t; r++)
            n = _.addOrSubtract(n, this.coefficients[r]);
          return n;
        }
        var i = this.coefficients[0];
        for (r = 1; r < t; r++)
          i = _.addOrSubtract(this.field.multiply(e, i), this.coefficients[r]);
        return i;
      }),
      (this.addOrSubtract = function (t) {
        if (this.field != t.field)
          throw "GF256Polys do not have same GF256 field";
        if (this.Zero) return t;
        if (t.Zero) return this;
        var n = this.coefficients,
          r = t.coefficients;
        if (n.length > r.length) {
          var i = n;
          (n = r), (r = i);
        }
        for (
          var a = new Array(r.length), o = r.length - n.length, s = 0;
          s < o;
          s++
        )
          a[s] = r[s];
        for (var h = o; h < r.length; h++)
          a[h] = _.addOrSubtract(n[h - o], r[h]);
        return new C(e, a);
      }),
      (this.multiply1 = function (e) {
        if (this.field != e.field)
          throw "GF256Polys do not have same GF256 field";
        if (this.Zero || e.Zero) return this.field.Zero;
        for (
          var t = this.coefficients,
            n = t.length,
            r = e.coefficients,
            i = r.length,
            a = new Array(n + i - 1),
            o = 0;
          o < n;
          o++
        )
          for (var s = t[o], h = 0; h < i; h++)
            a[o + h] = _.addOrSubtract(a[o + h], this.field.multiply(s, r[h]));
        return new C(this.field, a);
      }),
      (this.multiply2 = function (e) {
        if (0 == e) return this.field.Zero;
        if (1 == e) return this;
        for (
          var t = this.coefficients.length, n = new Array(t), r = 0;
          r < t;
          r++
        )
          n[r] = this.field.multiply(this.coefficients[r], e);
        return new C(this.field, n);
      }),
      (this.multiplyByMonomial = function (e, t) {
        if (e < 0) throw "System.ArgumentException";
        if (0 == t) return this.field.Zero;
        for (
          var n = this.coefficients.length, r = new Array(n + e), i = 0;
          i < r.length;
          i++
        )
          r[i] = 0;
        for (i = 0; i < n; i++)
          r[i] = this.field.multiply(this.coefficients[i], t);
        return new C(this.field, r);
      }),
      (this.divide = function (e) {
        if (this.field != e.field)
          throw "GF256Polys do not have same GF256 field";
        if (e.Zero) throw "Divide by 0";
        for (
          var t = this.field.Zero,
            n = this,
            r = e.getCoefficient(e.Degree),
            i = this.field.inverse(r);
          n.Degree >= e.Degree && !n.Zero;

        ) {
          var a = n.Degree - e.Degree,
            o = this.field.multiply(n.getCoefficient(n.Degree), i),
            s = e.multiplyByMonomial(a, o),
            h = this.field.buildMonomial(a, o);
          (t = t.addOrSubtract(h)), (n = n.addOrSubtract(s));
        }
        return new Array(t, n);
      });
  }

  function _(e) {
    (this.expTable = new Array(256)), (this.logTable = new Array(256));
    for (var t = 1, n = 0; n < 256; n++)
      (this.expTable[n] = t), (t <<= 1) >= 256 && (t ^= e);
    for (n = 0; n < 255; n++) this.logTable[this.expTable[n]] = n;
    var r = new Array(1);
    (r[0] = 0), (this.zero = new C(this, new Array(r)));
    var i = new Array(1);
    (i[0] = 1),
      (this.one = new C(this, new Array(i))),
      this.__defineGetter__("Zero", function () {
        return this.zero;
      }),
      this.__defineGetter__("One", function () {
        return this.one;
      }),
      (this.buildMonomial = function (e, t) {
        if (e < 0) throw "System.ArgumentException";
        if (0 == t) return this.zero;
        for (var n = new Array(e + 1), r = 0; r < n.length; r++) n[r] = 0;
        return (n[0] = t), new C(this, n);
      }),
      (this.exp = function (e) {
        return this.expTable[e];
      }),
      (this.log = function (e) {
        if (0 == e) throw "System.ArgumentException";
        return this.logTable[e];
      }),
      (this.inverse = function (e) {
        if (0 == e) throw "System.ArithmeticException";
        return this.expTable[255 - this.logTable[e]];
      }),
      (this.multiply = function (e, t) {
        return 0 == e || 0 == t
          ? 0
          : 1 == e
          ? t
          : 1 == t
          ? e
          : this.expTable[(this.logTable[e] + this.logTable[t]) % 255];
      });
  }
  (y.forReference = function (e) {
    if (e < 0 || e > 7) throw "System.ArgumentException";
    return y.DATA_MASKS[e];
  }),
    (y.DATA_MASKS = new Array(
      new (function () {
        (this.unmaskBitMatrix = function (e, t) {
          for (var n = 0; n < t; n++)
            for (var r = 0; r < t; r++) this.isMasked(n, r) && e.flip(r, n);
        }),
          (this.isMasked = function (e, t) {
            return 0 == ((e + t) & 1);
          });
      })(),
      new (function () {
        (this.unmaskBitMatrix = function (e, t) {
          for (var n = 0; n < t; n++)
            for (var r = 0; r < t; r++) this.isMasked(n, r) && e.flip(r, n);
        }),
          (this.isMasked = function (e, t) {
            return 0 == (1 & e);
          });
      })(),
      new (function () {
        (this.unmaskBitMatrix = function (e, t) {
          for (var n = 0; n < t; n++)
            for (var r = 0; r < t; r++) this.isMasked(n, r) && e.flip(r, n);
        }),
          (this.isMasked = function (e, t) {
            return t % 3 == 0;
          });
      })(),
      new (function () {
        (this.unmaskBitMatrix = function (e, t) {
          for (var n = 0; n < t; n++)
            for (var r = 0; r < t; r++) this.isMasked(n, r) && e.flip(r, n);
        }),
          (this.isMasked = function (e, t) {
            return (e + t) % 3 == 0;
          });
      })(),
      new (function () {
        (this.unmaskBitMatrix = function (e, t) {
          for (var n = 0; n < t; n++)
            for (var r = 0; r < t; r++) this.isMasked(n, r) && e.flip(r, n);
        }),
          (this.isMasked = function (e, t) {
            return 0 == ((M(e, 1) + t / 3) & 1);
          });
      })(),
      new (function () {
        (this.unmaskBitMatrix = function (e, t) {
          for (var n = 0; n < t; n++)
            for (var r = 0; r < t; r++) this.isMasked(n, r) && e.flip(r, n);
        }),
          (this.isMasked = function (e, t) {
            var n = e * t;
            return (1 & n) + (n % 3) == 0;
          });
      })(),
      new (function () {
        (this.unmaskBitMatrix = function (e, t) {
          for (var n = 0; n < t; n++)
            for (var r = 0; r < t; r++) this.isMasked(n, r) && e.flip(r, n);
        }),
          (this.isMasked = function (e, t) {
            var n = e * t;
            return 0 == (((1 & n) + (n % 3)) & 1);
          });
      })(),
      new (function () {
        (this.unmaskBitMatrix = function (e, t) {
          for (var n = 0; n < t; n++)
            for (var r = 0; r < t; r++) this.isMasked(n, r) && e.flip(r, n);
        }),
          (this.isMasked = function (e, t) {
            return 0 == ((((e + t) & 1) + ((e * t) % 3)) & 1);
          });
      })()
    )),
    (_.QR_CODE_FIELD = new _(285)),
    (_.DATA_MATRIX_FIELD = new _(301)),
    (_.addOrSubtract = function (e, t) {
      return e ^ t;
    });
  var p = {};
  (p.rsDecoder = new (function (e) {
    (this.field = e),
      (this.decode = function (e, t) {
        for (
          var n = new C(this.field, e), r = new Array(t), i = 0;
          i < r.length;
          i++
        )
          r[i] = 0;
        var a = !0;
        for (i = 0; i < t; i++) {
          var o = n.evaluateAt(this.field.exp(i));
          (r[r.length - 1 - i] = o), 0 != o && (a = !1);
        }
        if (!a) {
          var s = new C(this.field, r),
            h = this.runEuclideanAlgorithm(
              this.field.buildMonomial(t, 1),
              s,
              t
            ),
            w = h[0],
            f = h[1],
            u = this.findErrorLocations(w),
            d = this.findErrorMagnitudes(f, u, !1);
          for (i = 0; i < u.length; i++) {
            var l = e.length - 1 - this.field.log(u[i]);
            if (l < 0) throw "ReedSolomonException Bad error location";
            e[l] = _.addOrSubtract(e[l], d[i]);
          }
        }
      }),
      (this.runEuclideanAlgorithm = function (e, t, n) {
        if (e.Degree < t.Degree) {
          var r = e;
          (e = t), (t = r);
        }
        for (
          var i = e,
            a = t,
            o = this.field.One,
            s = this.field.Zero,
            h = this.field.Zero,
            w = this.field.One;
          a.Degree >= Math.floor(n / 2);

        ) {
          var f = i,
            u = o,
            d = h;
          if (((o = s), (h = w), (i = a).Zero)) throw "r_{i-1} was zero";
          a = f;
          for (
            var l = this.field.Zero,
              c = i.getCoefficient(i.Degree),
              g = this.field.inverse(c);
            a.Degree >= i.Degree && !a.Zero;

          ) {
            var v = a.Degree - i.Degree,
              m = this.field.multiply(a.getCoefficient(a.Degree), g);
            (l = l.addOrSubtract(this.field.buildMonomial(v, m))),
              (a = a.addOrSubtract(i.multiplyByMonomial(v, m)));
          }
          (s = l.multiply1(o).addOrSubtract(u)),
            (w = l.multiply1(h).addOrSubtract(d));
        }
        var b = w.getCoefficient(0);
        if (0 == b) throw "ReedSolomonException sigmaTilde(0) was zero";
        var y = this.field.inverse(b),
          C = w.multiply2(y),
          _ = a.multiply2(y);
        return new Array(C, _);
      }),
      (this.findErrorLocations = function (e) {
        var t = e.Degree;
        if (1 == t) return new Array(e.getCoefficient(1));
        for (var n = new Array(t), r = 0, i = 1; i < 256 && r < t; i++)
          0 == e.evaluateAt(i) && ((n[r] = this.field.inverse(i)), r++);
        if (r != t) throw "Error locator degree does not match number of roots";
        return n;
      }),
      (this.findErrorMagnitudes = function (e, t, n) {
        for (var r = t.length, i = new Array(r), a = 0; a < r; a++) {
          for (var o = this.field.inverse(t[a]), s = 1, h = 0; h < r; h++)
            a != h &&
              (s = this.field.multiply(
                s,
                _.addOrSubtract(1, this.field.multiply(t[h], o))
              ));
          (i[a] = this.field.multiply(e.evaluateAt(o), this.field.inverse(s))),
            n && (i[a] = this.field.multiply(i[a], o));
        }
        return i;
      });
  })(_.QR_CODE_FIELD)),
    (p.correctErrors = function (e, t) {
      for (var n = e.length, r = new Array(n), i = 0; i < n; i++)
        r[i] = 255 & e[i];
      var a = e.length - t;
      try {
        p.rsDecoder.decode(r, a);
      } catch (e) {
        throw e;
      }
      for (i = 0; i < t; i++) e[i] = r[i];
    }),
    (p.decode = function (e) {
      for (
        var t = new b(e),
          n = t.readVersion(),
          r = t.readFormatInformation().ErrorCorrectionLevel,
          i = t.readCodewords(),
          a = m.getDataBlocks(i, n, r),
          o = 0,
          s = 0;
        s < a.length;
        s++
      )
        o += a[s].NumDataCodewords;
      for (var h = new Array(o), w = 0, f = 0; f < a.length; f++) {
        var u = a[f],
          d = u.Codewords,
          l = u.NumDataCodewords;
        p.correctErrors(d, l);
        for (s = 0; s < l; s++) h[w++] = d[s];
      }
      return new I(h, n.VersionNumber, r.Bits);
    });
  var A = {};

  function M(e, t) {
    return e >= 0 ? e >> t : (e >> t) + (2 << ~t);
  }
  (A.imagedata = null),
    (A.width = 0),
    (A.height = 0),
    (A.qrCodeSymbol = null),
    (A.debug = !1),
    (A.maxImgSize = 1048576),
    (A.sizeOfDataLengthInfo = [
      [10, 9, 8, 8],
      [12, 11, 16, 10],
      [14, 13, 16, 12],
    ]),
    (A.callback = null),
    (A.vidSuccess = function (e) {
      (A.localstream = e),
        A.webkit
          ? (A.video.src = window.webkitURL.createObjectURL(e))
          : A.moz
          ? ((A.video.mozSrcObject = e), A.video.play())
          : (A.video.src = e),
        (A.gUM = !0),
        (A.canvas_qr2 = document.createElement("canvas")),
        (A.canvas_qr2.id = "qr-canvas"),
        (A.qrcontext2 = A.canvas_qr2.getContext("2d")),
        (A.canvas_qr2.width = A.video.videoWidth),
        (A.canvas_qr2.height = A.video.videoHeight),
        setTimeout(A.captureToCanvas, 500);
    }),
    (A.vidError = function (e) {
      A.gUM = !1;
    }),
    (A.captureToCanvas = function () {
      if (A.gUM)
        try {
          if (0 == A.video.videoWidth)
            return void setTimeout(A.captureToCanvas, 500);
          (A.canvas_qr2.width = A.video.videoWidth),
            (A.canvas_qr2.height = A.video.videoHeight),
            A.qrcontext2.drawImage(A.video, 0, 0);
          try {
            A.decode();
          } catch (e) {
            console.log(e), setTimeout(A.captureToCanvas, 500);
          }
        } catch (e) {
          console.log(e), setTimeout(A.captureToCanvas, 500);
        }
    }),
    (A.setWebcam = function (e) {
      var t = navigator;
      A.video = document.getElementById(e);
      var n = !0;
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)
        try {
          navigator.mediaDevices.enumerateDevices().then(function (e) {
            e.forEach(function (e) {
              console.log("deb1"),
                "videoinput" === e.kind &&
                  e.label.toLowerCase().search("back") > -1 &&
                  (n = [
                    {
                      sourceId: e.deviceId,
                    },
                  ]),
                console.log(e.kind + ": " + e.label + " id = " + e.deviceId);
            });
          });
        } catch (e) {
          console.log(e);
        }
      else console.log("no navigator.mediaDevices.enumerateDevices");
      t.getUserMedia
        ? t.getUserMedia(
            {
              video: n,
              audio: !1,
            },
            A.vidSuccess,
            A.vidError
          )
        : t.webkitGetUserMedia
        ? ((A.webkit = !0),
          t.webkitGetUserMedia(
            {
              video: n,
              audio: !1,
            },
            A.vidSuccess,
            A.vidError
          ))
        : t.mozGetUserMedia &&
          ((A.moz = !0),
          t.mozGetUserMedia(
            {
              video: n,
              audio: !1,
            },
            A.vidSuccess,
            A.vidError
          ));
    }),
    (A.decode = function (e) {
      if (0 == arguments.length) {
        if (A.canvas_qr2)
          var t = A.canvas_qr2,
            n = A.qrcontext2;
        else n = (t = document.getElementById("qr-canvas")).getContext("2d");
        return (
          (A.width = t.width),
          (A.height = t.height),
          (A.imagedata = n.getImageData(0, 0, A.width, A.height)),
          (A.result = A.process(n)),
          null != A.callback && A.callback(A.result),
          A.result
        );
      }
      var r = new Image();
      (r.crossOrigin = "Anonymous"),
        (r.onload = function () {
          var e = document.getElementById("out-canvas");
          if (null != e) {
            var t = e.getContext("2d");
            t.clearRect(0, 0, 320, 240), t.drawImage(r, 0, 0, 320, 240);
          }
          var n = document.createElement("canvas"),
            i = n.getContext("2d"),
            a = r.height,
            o = r.width;
          if (r.width * r.height > A.maxImgSize) {
            var s = r.width / r.height;
            o = s * (a = Math.sqrt(A.maxImgSize / s));
          }
          (n.width = o),
            (n.height = a),
            i.drawImage(r, 0, 0, n.width, n.height),
            (A.width = n.width),
            (A.height = n.height);
          try {
            A.imagedata = i.getImageData(0, 0, n.width, n.height);
          } catch (e) {
            return (
              (A.result =
                "Cross domain image reading not supported in your browser! Save it to your computer then drag and drop the file!"),
              void (null != A.callback && A.callback(A.result))
            );
          }
          try {
            A.result = A.process(i);
          } catch (e) {
            console.log(e), (A.result = "error decoding QR Code");
          }
          null != A.callback && A.callback(A.result);
        }),
        (r.onerror = function () {
          null != A.callback && A.callback("Failed to load the image");
        }),
        (r.src = e);
    }),
    (A.isUrl = function (e) {
      return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
        e
      );
    }),
    (A.decode_url = function (e) {
      var t = "";
      try {
        t = escape(e);
      } catch (n) {
        console.log(n), (t = e);
      }
      var n = "";
      try {
        n = decodeURIComponent(t);
      } catch (e) {
        console.log(e), (n = t);
      }
      return n;
    }),
    (A.decode_utf8 = function (e) {
      return A.isUrl(e) ? A.decode_url(e) : e;
    }),
    (A.process = function (e) {
      var t = new Date().getTime(),
        n = A.grayScaleToBitmap(A.grayscale());
      if (A.debug) {
        for (var r = 0; r < A.height; r++)
          for (var i = 0; i < A.width; i++) {
            var a = 4 * i + r * A.width * 4;
            (A.imagedata.data[a] = (n[i + r * A.width], 0)),
              (A.imagedata.data[a + 1] = (n[i + r * A.width], 0)),
              (A.imagedata.data[a + 2] = n[i + r * A.width] ? 255 : 0);
          }
        e.putImageData(A.imagedata, 0, 0);
      }
      var s = new o(n).detect();
      if (A.debug) {
        for (r = 0; r < s.bits.Height; r++)
          for (i = 0; i < s.bits.Width; i++) {
            a = 4 * i * 2 + 2 * r * A.width * 4;
            (A.imagedata.data[a] = (s.bits.get_Renamed(i, r), 0)),
              (A.imagedata.data[a + 1] = (s.bits.get_Renamed(i, r), 0)),
              (A.imagedata.data[a + 2] = s.bits.get_Renamed(i, r) ? 255 : 0);
          }
        e.putImageData(A.imagedata, 0, 0);
      }
      for (var h = p.decode(s.bits).DataByte, w = "", f = 0; f < h.length; f++)
        for (var u = 0; u < h[f].length; u++) w += String.fromCharCode(h[f][u]);
      var d = new Date().getTime() - t;
      return console.log(d), A.decode_utf8(w);
    }),
    (A.getPixel = function (e, t) {
      if (A.width < e) throw "point error";
      if (A.height < t) throw "point error";
      var n = 4 * e + t * A.width * 4;
      return (
        (33 * A.imagedata.data[n] +
          34 * A.imagedata.data[n + 1] +
          33 * A.imagedata.data[n + 2]) /
        100
      );
    }),
    (A.binarize = function (e) {
      for (var t = new Array(A.width * A.height), n = 0; n < A.height; n++)
        for (var r = 0; r < A.width; r++) {
          var i = A.getPixel(r, n);
          t[r + n * A.width] = i <= e;
        }
      return t;
    }),
    (A.getMiddleBrightnessPerArea = function (e) {
      for (
        var t = Math.floor(A.width / 4),
          n = Math.floor(A.height / 4),
          r = new Array(4),
          i = 0;
        i < 4;
        i++
      ) {
        r[i] = new Array(4);
        for (var a = 0; a < 4; a++) r[i][a] = new Array(0, 0);
      }
      for (var o = 0; o < 4; o++)
        for (var s = 0; s < 4; s++) {
          r[s][o][0] = 255;
          for (var h = 0; h < n; h++)
            for (var w = 0; w < t; w++) {
              var f = e[t * s + w + (n * o + h) * A.width];
              f < r[s][o][0] && (r[s][o][0] = f),
                f > r[s][o][1] && (r[s][o][1] = f);
            }
        }
      for (var u = new Array(4), d = 0; d < 4; d++) u[d] = new Array(4);
      for (o = 0; o < 4; o++)
        for (s = 0; s < 4; s++)
          u[s][o] = Math.floor((r[s][o][0] + r[s][o][1]) / 2);
      return u;
    }),
    (A.grayScaleToBitmap = function (e) {
      for (
        var t = A.getMiddleBrightnessPerArea(e),
          n = t.length,
          r = Math.floor(A.width / n),
          i = Math.floor(A.height / n),
          a = new ArrayBuffer(A.width * A.height),
          o = new Uint8Array(a),
          s = 0;
        s < n;
        s++
      )
        for (var h = 0; h < n; h++)
          for (var w = 0; w < i; w++)
            for (var f = 0; f < r; f++)
              o[r * h + f + (i * s + w) * A.width] =
                e[r * h + f + (i * s + w) * A.width] < t[h][s];
      return o;
    }),
    (A.grayscale = function () {
      for (
        var e = new ArrayBuffer(A.width * A.height),
          t = new Uint8Array(e),
          n = 0;
        n < A.height;
        n++
      )
        for (var r = 0; r < A.width; r++) {
          var i = A.getPixel(r, n);
          t[r + n * A.width] = i;
        }
      return t;
    });
  var k = 3,
    P = 57,
    S = 8,
    B = 2;

  function N(e, t, n) {
    (this.x = e),
      (this.y = t),
      (this.count = 1),
      (this.estimatedModuleSize = n),
      this.__defineGetter__("EstimatedModuleSize", function () {
        return this.estimatedModuleSize;
      }),
      this.__defineGetter__("Count", function () {
        return this.count;
      }),
      this.__defineGetter__("X", function () {
        return this.x;
      }),
      this.__defineGetter__("Y", function () {
        return this.y;
      }),
      (this.incrementCount = function () {
        this.count++;
      }),
      (this.aboutEquals = function (e, t, n) {
        if (Math.abs(t - this.y) <= e && Math.abs(n - this.x) <= e) {
          var r = Math.abs(e - this.estimatedModuleSize);
          return r <= 1 || r / this.estimatedModuleSize <= 1;
        }
        return !1;
      });
  }

  function E(e) {
    (this.bottomLeft = e[0]),
      (this.topLeft = e[1]),
      (this.topRight = e[2]),
      this.__defineGetter__("BottomLeft", function () {
        return this.bottomLeft;
      }),
      this.__defineGetter__("TopLeft", function () {
        return this.topLeft;
      }),
      this.__defineGetter__("TopRight", function () {
        return this.topRight;
      });
  }

  function D() {
    (this.image = null),
      (this.possibleCenters = []),
      (this.hasSkipped = !1),
      (this.crossCheckStateCount = new Array(0, 0, 0, 0, 0)),
      (this.resultPointCallback = null),
      this.__defineGetter__("CrossCheckStateCount", function () {
        return (
          (this.crossCheckStateCount[0] = 0),
          (this.crossCheckStateCount[1] = 0),
          (this.crossCheckStateCount[2] = 0),
          (this.crossCheckStateCount[3] = 0),
          (this.crossCheckStateCount[4] = 0),
          this.crossCheckStateCount
        );
      }),
      (this.foundPatternCross = function (e) {
        for (var t = 0, n = 0; n < 5; n++) {
          var r = e[n];
          if (0 == r) return !1;
          t += r;
        }
        if (t < 7) return !1;
        var i = Math.floor((t << S) / 7),
          a = Math.floor(i / 2);
        return (
          Math.abs(i - (e[0] << S)) < a &&
          Math.abs(i - (e[1] << S)) < a &&
          Math.abs(3 * i - (e[2] << S)) < 3 * a &&
          Math.abs(i - (e[3] << S)) < a &&
          Math.abs(i - (e[4] << S)) < a
        );
      }),
      (this.centerFromEnd = function (e, t) {
        return t - e[4] - e[3] - e[2] / 2;
      }),
      (this.crossCheckVertical = function (e, t, n, r) {
        for (
          var i = this.image,
            a = A.height,
            o = this.CrossCheckStateCount,
            s = e;
          s >= 0 && i[t + s * A.width];

        )
          o[2]++, s--;
        if (s < 0) return NaN;
        for (; s >= 0 && !i[t + s * A.width] && o[1] <= n; ) o[1]++, s--;
        if (s < 0 || o[1] > n) return NaN;
        for (; s >= 0 && i[t + s * A.width] && o[0] <= n; ) o[0]++, s--;
        if (o[0] > n) return NaN;
        for (s = e + 1; s < a && i[t + s * A.width]; ) o[2]++, s++;
        if (s == a) return NaN;
        for (; s < a && !i[t + s * A.width] && o[3] < n; ) o[3]++, s++;
        if (s == a || o[3] >= n) return NaN;
        for (; s < a && i[t + s * A.width] && o[4] < n; ) o[4]++, s++;
        if (o[4] >= n) return NaN;
        var h = o[0] + o[1] + o[2] + o[3] + o[4];
        return 5 * Math.abs(h - r) >= 2 * r
          ? NaN
          : this.foundPatternCross(o)
          ? this.centerFromEnd(o, s)
          : NaN;
      }),
      (this.crossCheckHorizontal = function (e, t, n, r) {
        for (
          var i = this.image, a = A.width, o = this.CrossCheckStateCount, s = e;
          s >= 0 && i[s + t * A.width];

        )
          o[2]++, s--;
        if (s < 0) return NaN;
        for (; s >= 0 && !i[s + t * A.width] && o[1] <= n; ) o[1]++, s--;
        if (s < 0 || o[1] > n) return NaN;
        for (; s >= 0 && i[s + t * A.width] && o[0] <= n; ) o[0]++, s--;
        if (o[0] > n) return NaN;
        for (s = e + 1; s < a && i[s + t * A.width]; ) o[2]++, s++;
        if (s == a) return NaN;
        for (; s < a && !i[s + t * A.width] && o[3] < n; ) o[3]++, s++;
        if (s == a || o[3] >= n) return NaN;
        for (; s < a && i[s + t * A.width] && o[4] < n; ) o[4]++, s++;
        if (o[4] >= n) return NaN;
        var h = o[0] + o[1] + o[2] + o[3] + o[4];
        return 5 * Math.abs(h - r) >= r
          ? NaN
          : this.foundPatternCross(o)
          ? this.centerFromEnd(o, s)
          : NaN;
      }),
      (this.handlePossibleCenter = function (e, t, n) {
        var r = e[0] + e[1] + e[2] + e[3] + e[4],
          i = this.centerFromEnd(e, n),
          a = this.crossCheckVertical(t, Math.floor(i), e[2], r);
        if (
          !isNaN(a) &&
          ((i = this.crossCheckHorizontal(
            Math.floor(i),
            Math.floor(a),
            e[2],
            r
          )),
          !isNaN(i))
        ) {
          for (
            var o = r / 7, s = !1, h = this.possibleCenters.length, w = 0;
            w < h;
            w++
          ) {
            var f = this.possibleCenters[w];
            if (f.aboutEquals(o, a, i)) {
              f.incrementCount(), (s = !0);
              break;
            }
          }
          if (!s) {
            var u = new N(i, a, o);
            this.possibleCenters.push(u),
              null != this.resultPointCallback &&
                this.resultPointCallback.foundPossibleResultPoint(u);
          }
          return !0;
        }
        return !1;
      }),
      (this.selectBestPatterns = function () {
        var e = this.possibleCenters.length;
        if (e < 3)
          throw "Couldn't find enough finder patterns (found " + e + ")";
        if (e > 3) {
          for (var t = 0, n = 0, r = 0; r < e; r++) {
            var i = this.possibleCenters[r].EstimatedModuleSize;
            (t += i), (n += i * i);
          }
          var a = t / e;
          this.possibleCenters.sort(function (e, t) {
            var n = Math.abs(t.EstimatedModuleSize - a),
              r = Math.abs(e.EstimatedModuleSize - a);
            return n < r ? -1 : n == r ? 0 : 1;
          });
          var o = Math.sqrt(n / e - a * a),
            s = Math.max(0.2 * a, o);
          for (r = this.possibleCenters.length - 1; r >= 0; r--) {
            var h = this.possibleCenters[r];
            Math.abs(h.EstimatedModuleSize - a) > s &&
              this.possibleCenters.splice(r, 1);
          }
        }
        return (
          this.possibleCenters.length > 3 &&
            this.possibleCenters.sort(function (e, t) {
              return e.count > t.count ? -1 : e.count < t.count ? 1 : 0;
            }),
          new Array(
            this.possibleCenters[0],
            this.possibleCenters[1],
            this.possibleCenters[2]
          )
        );
      }),
      (this.findRowSkip = function () {
        var e = this.possibleCenters.length;
        if (e <= 1) return 0;
        for (var t = null, n = 0; n < e; n++) {
          var r = this.possibleCenters[n];
          if (r.Count >= B) {
            if (null != t)
              return (
                (this.hasSkipped = !0),
                Math.floor((Math.abs(t.X - r.X) - Math.abs(t.Y - r.Y)) / 2)
              );
            t = r;
          }
        }
        return 0;
      }),
      (this.haveMultiplyConfirmedCenters = function () {
        for (
          var e = 0, t = 0, n = this.possibleCenters.length, r = 0;
          r < n;
          r++
        ) {
          var i = this.possibleCenters[r];
          i.Count >= B && (e++, (t += i.EstimatedModuleSize));
        }
        if (e < 3) return !1;
        var a = t / n,
          o = 0;
        for (r = 0; r < n; r++)
          (i = this.possibleCenters[r]),
            (o += Math.abs(i.EstimatedModuleSize - a));
        return o <= 0.05 * t;
      }),
      (this.findFinderPattern = function (e) {
        this.image = e;
        var t = A.height,
          n = A.width,
          r = Math.floor((3 * t) / (4 * P));
        r < k && (r = k);
        for (var i = !1, a = new Array(5), o = r - 1; o < t && !i; o += r) {
          (a[0] = 0), (a[1] = 0), (a[2] = 0), (a[3] = 0), (a[4] = 0);
          for (var s = 0, h = 0; h < n; h++)
            if (e[h + o * A.width]) 1 == (1 & s) && s++, a[s]++;
            else if (0 == (1 & s))
              if (4 == s)
                if (this.foundPatternCross(a)) {
                  if (this.handlePossibleCenter(a, o, h))
                    if (((r = 2), this.hasSkipped))
                      i = this.haveMultiplyConfirmedCenters();
                    else {
                      var w = this.findRowSkip();
                      w > a[2] && ((o += w - a[2] - r), (h = n - 1));
                    }
                  else {
                    do {
                      h++;
                    } while (h < n && !e[h + o * A.width]);
                    h--;
                  }
                  (s = 0),
                    (a[0] = 0),
                    (a[1] = 0),
                    (a[2] = 0),
                    (a[3] = 0),
                    (a[4] = 0);
                } else
                  (a[0] = a[2]),
                    (a[1] = a[3]),
                    (a[2] = a[4]),
                    (a[3] = 1),
                    (a[4] = 0),
                    (s = 3);
              else a[++s]++;
            else a[s]++;
          if (this.foundPatternCross(a))
            this.handlePossibleCenter(a, o, n) &&
              ((r = a[0]),
              this.hasSkipped && (i = this.haveMultiplyConfirmedCenters()));
        }
        var f = this.selectBestPatterns();
        return A.orderBestPatterns(f), new E(f);
      });
  }

  function x(e, t, n) {
    (this.x = e),
      (this.y = t),
      (this.count = 1),
      (this.estimatedModuleSize = n),
      this.__defineGetter__("EstimatedModuleSize", function () {
        return this.estimatedModuleSize;
      }),
      this.__defineGetter__("Count", function () {
        return this.count;
      }),
      this.__defineGetter__("X", function () {
        return Math.floor(this.x);
      }),
      this.__defineGetter__("Y", function () {
        return Math.floor(this.y);
      }),
      (this.incrementCount = function () {
        this.count++;
      }),
      (this.aboutEquals = function (e, t, n) {
        if (Math.abs(t - this.y) <= e && Math.abs(n - this.x) <= e) {
          var r = Math.abs(e - this.estimatedModuleSize);
          return r <= 1 || r / this.estimatedModuleSize <= 1;
        }
        return !1;
      });
  }

  function F(e, t, n, r, i, a, o) {
    (this.image = e),
      (this.possibleCenters = new Array()),
      (this.startX = t),
      (this.startY = n),
      (this.width = r),
      (this.height = i),
      (this.moduleSize = a),
      (this.crossCheckStateCount = new Array(0, 0, 0)),
      (this.resultPointCallback = o),
      (this.centerFromEnd = function (e, t) {
        return t - e[2] - e[1] / 2;
      }),
      (this.foundPatternCross = function (e) {
        for (var t = this.moduleSize, n = t / 2, r = 0; r < 3; r++)
          if (Math.abs(t - e[r]) >= n) return !1;
        return !0;
      }),
      (this.crossCheckVertical = function (e, t, n, r) {
        var i = this.image,
          a = A.height,
          o = this.crossCheckStateCount;
        (o[0] = 0), (o[1] = 0), (o[2] = 0);
        for (var s = e; s >= 0 && i[t + s * A.width] && o[1] <= n; )
          o[1]++, s--;
        if (s < 0 || o[1] > n) return NaN;
        for (; s >= 0 && !i[t + s * A.width] && o[0] <= n; ) o[0]++, s--;
        if (o[0] > n) return NaN;
        for (s = e + 1; s < a && i[t + s * A.width] && o[1] <= n; ) o[1]++, s++;
        if (s == a || o[1] > n) return NaN;
        for (; s < a && !i[t + s * A.width] && o[2] <= n; ) o[2]++, s++;
        if (o[2] > n) return NaN;
        var h = o[0] + o[1] + o[2];
        return 5 * Math.abs(h - r) >= 2 * r
          ? NaN
          : this.foundPatternCross(o)
          ? this.centerFromEnd(o, s)
          : NaN;
      }),
      (this.handlePossibleCenter = function (e, t, n) {
        var r = e[0] + e[1] + e[2],
          i = this.centerFromEnd(e, n),
          a = this.crossCheckVertical(t, Math.floor(i), 2 * e[1], r);
        if (!isNaN(a)) {
          for (
            var o = (e[0] + e[1] + e[2]) / 3,
              s = this.possibleCenters.length,
              h = 0;
            h < s;
            h++
          ) {
            if (this.possibleCenters[h].aboutEquals(o, a, i))
              return new x(i, a, o);
          }
          var w = new x(i, a, o);
          this.possibleCenters.push(w),
            null != this.resultPointCallback &&
              this.resultPointCallback.foundPossibleResultPoint(w);
        }
        return null;
      }),
      (this.find = function () {
        for (
          var t = this.startX,
            i = this.height,
            a = t + r,
            o = n + (i >> 1),
            s = new Array(0, 0, 0),
            h = 0;
          h < i;
          h++
        ) {
          var w = o + (0 == (1 & h) ? (h + 1) >> 1 : -((h + 1) >> 1));
          (s[0] = 0), (s[1] = 0), (s[2] = 0);
          for (var f = t; f < a && !e[f + A.width * w]; ) f++;
          for (var u = 0; f < a; ) {
            if (e[f + w * A.width])
              if (1 == u) s[u]++;
              else if (2 == u) {
                var d;
                if (this.foundPatternCross(s))
                  if (null != (d = this.handlePossibleCenter(s, w, f)))
                    return d;
                (s[0] = s[2]), (s[1] = 1), (s[2] = 0), (u = 1);
              } else s[++u]++;
            else 1 == u && u++, s[u]++;
            f++;
          }
          if (this.foundPatternCross(s))
            if (null != (d = this.handlePossibleCenter(s, w, a))) return d;
        }
        if (0 != this.possibleCenters.length) return this.possibleCenters[0];
        throw "Couldn't find enough alignment patterns";
      });
  }

  function I(e, t, n) {
    (this.blockPointer = 0),
      (this.bitPointer = 7),
      (this.dataLength = 0),
      (this.blocks = e),
      (this.numErrorCorrectionCode = n),
      t <= 9
        ? (this.dataLengthMode = 0)
        : t >= 10 && t <= 26
        ? (this.dataLengthMode = 1)
        : t >= 27 && t <= 40 && (this.dataLengthMode = 2),
      (this.getNextBits = function (e) {
        var t = 0;
        if (e < this.bitPointer + 1) {
          for (var n = 0, r = 0; r < e; r++) n += 1 << r;
          return (
            (n <<= this.bitPointer - e + 1),
            (t =
              (this.blocks[this.blockPointer] & n) >>
              (this.bitPointer - e + 1)),
            (this.bitPointer -= e),
            t
          );
        }
        if (e < this.bitPointer + 1 + 8) {
          var i = 0;
          for (r = 0; r < this.bitPointer + 1; r++) i += 1 << r;
          return (
            (t =
              (this.blocks[this.blockPointer] & i) <<
              (e - (this.bitPointer + 1))),
            this.blockPointer++,
            (t +=
              this.blocks[this.blockPointer] >>
              (8 - (e - (this.bitPointer + 1)))),
            (this.bitPointer = this.bitPointer - (e % 8)),
            this.bitPointer < 0 && (this.bitPointer = 8 + this.bitPointer),
            t
          );
        }
        if (e < this.bitPointer + 1 + 16) {
          i = 0;
          var a = 0;
          for (r = 0; r < this.bitPointer + 1; r++) i += 1 << r;
          var o =
            (this.blocks[this.blockPointer] & i) << (e - (this.bitPointer + 1));
          this.blockPointer++;
          var s =
            this.blocks[this.blockPointer] << (e - (this.bitPointer + 1 + 8));
          this.blockPointer++;
          for (r = 0; r < e - (this.bitPointer + 1 + 8); r++) a += 1 << r;
          return (
            (a <<= 8 - (e - (this.bitPointer + 1 + 8))),
            (t =
              o +
              s +
              ((this.blocks[this.blockPointer] & a) >>
                (8 - (e - (this.bitPointer + 1 + 8))))),
            (this.bitPointer = this.bitPointer - ((e - 8) % 8)),
            this.bitPointer < 0 && (this.bitPointer = 8 + this.bitPointer),
            t
          );
        }
        return 0;
      }),
      (this.NextMode = function () {
        return this.blockPointer >
          this.blocks.length - this.numErrorCorrectionCode - 2
          ? 0
          : this.getNextBits(4);
      }),
      (this.getDataLength = function (e) {
        for (var t = 0; e >> t != 1; ) t++;
        return this.getNextBits(A.sizeOfDataLengthInfo[this.dataLengthMode][t]);
      }),
      (this.getRomanAndFigureString = function (e) {
        var t = e,
          n = 0,
          r = "",
          i = new Array(
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            " ",
            "$",
            "%",
            "*",
            "+",
            "-",
            ".",
            "/",
            ":"
          );
        do {
          if (t > 1) {
            var a = (n = this.getNextBits(11)) % 45;
            (r += i[Math.floor(n / 45)]), (r += i[a]), (t -= 2);
          } else 1 == t && ((r += i[(n = this.getNextBits(6))]), (t -= 1));
        } while (t > 0);
        return r;
      }),
      (this.getFigureString = function (e) {
        var t = e,
          n = 0,
          r = "";
        do {
          t >= 3
            ? ((n = this.getNextBits(10)) < 100 && (r += "0"),
              n < 10 && (r += "0"),
              (t -= 3))
            : 2 == t
            ? ((n = this.getNextBits(7)) < 10 && (r += "0"), (t -= 2))
            : 1 == t && ((n = this.getNextBits(4)), (t -= 1)),
            (r += n);
        } while (t > 0);
        return r;
      }),
      (this.get8bitByteArray = function (e) {
        var t = e,
          n = 0,
          r = new Array();
        do {
          (n = this.getNextBits(8)), r.push(n), t--;
        } while (t > 0);
        return r;
      }),
      (this.getKanjiString = function (e) {
        var t = e,
          n = 0,
          r = "";
        do {
          var i = (((n = this.getNextBits(13)) / 192) << 8) + (n % 192),
            a = 0;
          (a = i + 33088 <= 40956 ? i + 33088 : i + 49472),
            (r += String.fromCharCode(a)),
            t--;
        } while (t > 0);
        return r;
      }),
      (this.parseECIValue = function () {
        var e = 0,
          t = this.getNextBits(8);
        (0 == (128 & t) && (e = 127 & t), 128 == (192 & t)) &&
          (e = ((63 & t) << 8) | this.getNextBits(8));
        192 == (224 & t) && (e = ((31 & t) << 16) | this.getNextBits(8));
        return e;
      }),
      this.__defineGetter__("DataByte", function () {
        for (var e = new Array(); ; ) {
          var t = this.NextMode();
          if (0 == t) {
            if (e.length > 0) break;
            throw "Empty data block";
          }
          if (1 != t && 2 != t && 4 != t && 8 != t && 7 != t)
            throw (
              "Invalid mode: " +
              t +
              " in (block:" +
              this.blockPointer +
              " bit:" +
              this.bitPointer +
              ")"
            );
          if (7 == t) var n = this.parseECIValue();
          else {
            var r = this.getDataLength(t);
            if (r < 1) throw "Invalid data length: " + r;
            switch (t) {
              case 1:
                for (
                  var i = this.getFigureString(r),
                    a = new Array(i.length),
                    o = 0;
                  o < i.length;
                  o++
                )
                  a[o] = i.charCodeAt(o);
                e.push(a);
                break;
              case 2:
                for (
                  i = this.getRomanAndFigureString(r),
                    a = new Array(i.length),
                    o = 0;
                  o < i.length;
                  o++
                )
                  a[o] = i.charCodeAt(o);
                e.push(a);
                break;
              case 4:
                n = this.get8bitByteArray(r);
                e.push(n);
                break;
              case 8:
                i = this.getKanjiString(r);
                e.push(i);
            }
          }
        }
        return e;
      });
  }
  return (
    (A.orderBestPatterns = function (e) {
      function t(e, t) {
        var n = e.X - t.X,
          r = e.Y - t.Y;
        return Math.sqrt(n * n + r * r);
      }
      var n,
        r,
        i,
        a = t(e[0], e[1]),
        o = t(e[1], e[2]),
        s = t(e[0], e[2]);
      if (
        (o >= a && o >= s
          ? ((r = e[0]), (n = e[1]), (i = e[2]))
          : s >= o && s >= a
          ? ((r = e[1]), (n = e[0]), (i = e[2]))
          : ((r = e[2]), (n = e[0]), (i = e[1])),
        (function (e, t, n) {
          var r = t.x,
            i = t.y;
          return (n.x - r) * (e.y - i) - (n.y - i) * (e.x - r);
        })(n, r, i) < 0)
      ) {
        var h = n;
        (n = i), (i = h);
      }
      (e[0] = n), (e[1] = r), (e[2] = i);
    }),
    A
  );
}

/** Html5Qrcode From here */
("use strict");

function _typeof(a) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (a) {
            return typeof a;
          }
        : function (a) {
            return a &&
              "function" == typeof Symbol &&
              a.constructor === Symbol &&
              a !== Symbol.prototype
              ? "symbol"
              : typeof a;
          }),
    _typeof(a)
  );
}

function _classCallCheck(a, b) {
  if (!(a instanceof b))
    throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(a, b) {
  for (var c, d = 0; d < b.length; d++)
    (c = b[d]),
      (c.enumerable = c.enumerable || !1),
      (c.configurable = !0),
      "value" in c && (c.writable = !0),
      Object.defineProperty(a, c.key, c);
}

function _createClass(a, b, c) {
  return (
    b && _defineProperties(a.prototype, b), c && _defineProperties(a, c), a
  );
}

function _defineProperty(a, b, c) {
  return (
    b in a
      ? Object.defineProperty(a, b, {
          value: c,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (a[b] = c),
    a
  );
}
var Html5Qrcode = (function () {
  function a(b, c) {
    if ((_classCallCheck(this, a), !getLazarSoftScanner))
      throw "Use html5qrcode.min.js without edit, getLazarSoftScannernot found.";
    if (((this.qrcode = getLazarSoftScanner()), !this.qrcode))
      throw "qrcode is not defined, use the minified/html5-qrcode.min.js for proper support";
    (this._elementId = b),
      (this._foreverScanTimeout = null),
      (this._localMediaStream = null),
      (this._shouldScan = !0),
      (this._url =
        window.URL || window.webkitURL || window.mozURL || window.msURL),
      (this._userMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia),
      (this._isScanning = !1),
      (a.VERBOSE = !0 === c);
  }
  return (
    _createClass(
      a,
      [
        {
          key: "start",
          value: function (b, c, d, e) {
            var f = this;
            if (!b) throw "cameraIdOrConfig is required";
            if (!d || "function" != typeof d)
              throw "qrCodeSuccessCallback is required and should be a function.";
            e || (e = console.log), this._clearElement();
            var g = this,
              h = c ? c : {};
            h.fps = h.fps ? h.fps : a.SCAN_DEFAULT_FPS;
            var i = !1;
            h.videoConstraints &&
              (this._isMediaStreamConstraintsValid(h.videoConstraints)
                ? (i = !0)
                : a._logError(
                    "'videoConstraints' is not valid 'MediaStreamConstraints, it will be ignored.'",
                    !0
                  ));
            var j = i,
              k = null != h.qrbox,
              l = document.getElementById(this._elementId),
              m = l.clientWidth ? l.clientWidth : a.DEFAULT_WIDTH;
            if (
              ((l.style.position = "relative"),
              (this._shouldScan = !0),
              (this._element = l),
              (this.qrcode.callback = d),
              k)
            ) {
              var n = h.qrbox;
              if (n < a.MIN_QR_BOX_SIZE)
                throw (
                  "minimum size of 'config.qrbox' is" +
                  " ".concat(a.MIN_QR_BOX_SIZE, "px.")
                );
              if (n > m)
                throw "'config.qrbox' should not be greater than the width of the HTML element.";
            }
            var o = function (a, b) {
                var c = h.qrbox;
                c > b &&
                  console.warn(
                    "[Html5Qrcode] config.qrboxsize is greater than video height. Shading will be ignored"
                  );
                var d = k && c <= b,
                  e = d
                    ? f._getShadedRegionBounds(a, b, c)
                    : {
                        x: 0,
                        y: 0,
                        width: a,
                        height: b,
                      },
                  i = f._createCanvasElement(e.width, e.height),
                  j = i.getContext("2d");
                (j.canvas.width = e.width),
                  (j.canvas.height = e.height),
                  l.append(i),
                  d && f._possiblyInsertShadingElement(l, a, b, c),
                  (g._qrRegion = e),
                  (g._context = j),
                  (g._canvasElement = i);
              },
              p = function () {
                try {
                  return g.qrcode.decode(), f._possiblyUpdateShaders(!0), !0;
                } catch (a) {
                  return (
                    f._possiblyUpdateShaders(!1),
                    e("QR code parse error, error = ".concat(a)),
                    !1
                  );
                }
              },
              q = function b() {
                if (g._shouldScan) {
                  if (g._localMediaStream) {
                    var c = g._videoElement,
                      d = c.videoWidth / c.clientWidth,
                      e = c.videoHeight / c.clientHeight,
                      i = g._qrRegion.width * d,
                      j = g._qrRegion.height * e,
                      k = g._qrRegion.x * d,
                      l = g._qrRegion.y * e;
                    g._context.drawImage(
                      g._videoElement,
                      k,
                      l,
                      i,
                      j,
                      0,
                      0,
                      g._qrRegion.width,
                      g._qrRegion.height
                    ),
                      p() ||
                        !0 === h.disableFlip ||
                        (f._context.translate(f._context.canvas.width, 0),
                        f._context.scale(-1, 1),
                        p());
                  }
                  g._foreverScanTimeout = setTimeout(
                    b,
                    a._getTimeoutFps(h.fps)
                  );
                }
              },
              r = function (a) {
                return new Promise(function (b, c) {
                  var d = function () {
                    var d = f._createVideoElement(m);
                    g._element.append(d),
                      (d.onabort = c),
                      (d.onerror = c),
                      (d.onplaying = function () {
                        var a = d.clientWidth,
                          c = d.clientHeight;
                        o(a, c), q(), b();
                      }),
                      (d.srcObject = a),
                      d.play(),
                      (g._videoElement = d);
                  };
                  if (((g._localMediaStream = a), j || !h.aspectRatio)) d();
                  else {
                    var e = {
                        aspectRatio: h.aspectRatio,
                      },
                      i = a.getVideoTracks()[0];
                    i.applyConstraints(e)
                      .then(function () {
                        return d();
                      })
                      ["catch"](function (a) {
                        console.log(
                          "[Warning] [Html5Qrcode] Constriants could not be satisfied, ignoring constraints",
                          a
                        ),
                          d();
                      });
                  }
                });
              };
            return new Promise(function (a, c) {
              if (
                navigator.mediaDevices &&
                navigator.mediaDevices.getUserMedia
              ) {
                var d = j ? h.videoConstraints : g._createVideoConstraints(b);
                navigator.mediaDevices
                  .getUserMedia({
                    audio: !1,
                    video: d,
                  })
                  .then(function (b) {
                    r(b)
                      .then(function () {
                        (g._isScanning = !0), a();
                      })
                      ["catch"](c);
                  })
                  ["catch"](function (a) {
                    c("Error getting userMedia, error = ".concat(a));
                  });
              } else if (navigator.getUserMedia) {
                if ("string" != typeof b)
                  throw "The device doesn't support navigator.mediaDevices, only supported cameraIdOrConfig in this case is deviceId parameter (string).";
                navigator.getUserMedia(
                  {
                    video: {
                      optional: [
                        {
                          sourceId: b,
                        },
                      ],
                    },
                  },
                  function (b) {
                    r(b)
                      .then(function () {
                        (g._isScanning = !0), a();
                      })
                      ["catch"](c);
                  },
                  function (a) {
                    c("Error getting userMedia, error = ".concat(a));
                  }
                );
              } else c("Web camera streaming not supported by the browser.");
            });
          },
        },
        {
          key: "stop",
          value: function () {
            (this._shouldScan = !1), clearTimeout(this._foreverScanTimeout);
            var b = this;
            return new Promise(function (c) {
              b.qrcode.callback = null;
              var d = b._localMediaStream.getVideoTracks().length,
                e = 0,
                f = function () {
                  for (
                    ;
                    b._element.getElementsByClassName(a.SHADED_REGION_CLASSNAME)
                      .length;

                  ) {
                    var c = b._element.getElementsByClassName(
                      a.SHADED_REGION_CLASSNAME
                    )[0];
                    b._element.removeChild(c);
                  }
                },
                g = function () {
                  (b._localMediaStream = null),
                    b._element.removeChild(b._videoElement),
                    b._element.removeChild(b._canvasElement),
                    f(),
                    (b._isScanning = !1),
                    b._qrRegion && (b._qrRegion = null),
                    b._context && (b._context = null),
                    c(!0);
                };
              b._localMediaStream.getVideoTracks().forEach(function (a) {
                a.stop(), ++e, e >= d && g();
              });
            });
          },
        },
        {
          key: "scanFile",
          value: function (b, c) {
            var d = this;
            if (!b || !(b instanceof File))
              throw "imageFile argument is mandatory and should be instance of File. Use 'event.target.files[0]'";
            if (((c = void 0 === c || c), d._isScanning))
              throw "Close ongoing scan before scanning a file.";
            var e = function b(c, d, e, f) {
              if (c <= e && d <= f) {
                var g = (e - c) / 2,
                  h = (f - d) / 2;
                return {
                  x: g,
                  y: h,
                  width: c,
                  height: d,
                };
              }
              var i = c,
                j = d;
              return (
                c > e && ((d = (e / c) * d), (c = e)),
                d > f && ((c = (f / d) * c), (d = f)),
                a._log(
                  "Image downsampled from " +
                    "".concat(i, "X").concat(j) +
                    " to ".concat(c, "X").concat(d, ".")
                ),
                b(c, d, e, f)
              );
            };
            return new Promise(function (f, g) {
              d._possiblyCloseLastScanImageFile(),
                d._clearElement(),
                (d._lastScanImageFile = b);
              var h = new Image();
              (h.onload = function () {
                var b = Math.max,
                  i = h.width,
                  j = h.height,
                  k = document.getElementById(d._elementId),
                  l = k.clientWidth ? k.clientWidth : a.DEFAULT_WIDTH,
                  m = b(
                    k.clientHeight ? k.clientHeight : j,
                    a.FILE_SCAN_MIN_HEIGHT
                  ),
                  n = e(i, j, l, m);
                if (c) {
                  var o = d._createCanvasElement(l, m, "qr-canvas-visible");
                  (o.style.display = "inline-block"), k.appendChild(o);
                  var p = o.getContext("2d");
                  (p.canvas.width = l),
                    (p.canvas.height = m),
                    p.drawImage(h, 0, 0, i, j, n.x, n.y, n.width, n.height);
                }
                var q = d._createCanvasElement(n.width, n.height);
                k.appendChild(q);
                var r = q.getContext("2d");
                (r.canvas.width = n.width),
                  (r.canvas.height = n.height),
                  r.drawImage(h, 0, 0, i, j, 0, 0, n.width, n.height);
                try {
                  f(d.qrcode.decode());
                } catch (a) {
                  g("QR code parse error, error = ".concat(a));
                }
              }),
                (h.onerror = g),
                (h.onabort = g),
                (h.onstalled = g),
                (h.onsuspend = g),
                (h.src = URL.createObjectURL(b));
            });
          },
        },
        {
          key: "clear",
          value: function () {
            this._clearElement();
          },
        },
        {
          key: "getRunningTrackCapabilities",
          value: function () {
            if (null == this._localMediaStream)
              throw "Scanning is not in running state, call this API only when QR code scanning using camera is in running state.";
            if (0 == this._localMediaStream.getVideoTracks().length)
              throw "No video tracks found";
            var a = this._localMediaStream.getVideoTracks()[0];
            return a.getCapabilities();
          },
        },
        {
          key: "applyVideoConstraints",
          value: function (a) {
            var b = this;
            if (!a) throw "videoConstaints is required argument.";
            else if (!this._isMediaStreamConstraintsValid(a))
              throw "invalid videoConstaints passed, check logs for more details";
            if (null == this._localMediaStream)
              throw "Scanning is not in running state, call this API only when QR code scanning using camera is in running state.";
            if (0 == this._localMediaStream.getVideoTracks().length)
              throw "No video tracks found";
            return new Promise(function (c, d) {
              if ("aspectRatio" in a)
                return void d(
                  "Chaning 'aspectRatio' in run-time is not yet supported."
                );
              var e = b._localMediaStream.getVideoTracks()[0];
              e.applyConstraints(a)
                .then(function (a) {
                  c(a);
                })
                ["catch"](function (a) {
                  d(a);
                });
            });
          },
        },
        {
          key: "_clearElement",
          value: function () {
            if (this._isScanning)
              throw "Cannot clear while scan is ongoing, close it first.";
            var a = document.getElementById(this._elementId);
            a.innerHTML = "";
          },
        },
        {
          key: "_createCanvasElement",
          value: function (a, b, c) {
            var d = document.createElement("canvas");
            return (
              (d.style.width = "".concat(a, "px")),
              (d.style.height = "".concat(b, "px")),
              (d.style.display = "none"),
              (d.id = null == c ? "qr-canvas" : c),
              d
            );
          },
        },
        {
          key: "_createVideoElement",
          value: function (a) {
            var b = document.createElement("video");
            return (
              (b.style.width = "".concat(a, "px")),
              (b.muted = !0),
              (b.playsInline = !0),
              b
            );
          },
        },
        {
          key: "_getShadedRegionBounds",
          value: function (a, b, c) {
            if (c > a || c > b)
              throw "'config.qrbox' should not be greater than the width and height of the HTML element.";
            return {
              x: (a - c) / 2,
              y: (b - c) / 2,
              width: c,
              height: c,
            };
          },
        },
        {
          key: "_possiblyInsertShadingElement",
          value: function (b, c, d, e) {
            if (!(1 > c - e || 1 > d - e)) {
              var f = document.createElement("div");
              if (
                ((f.style.position = "absolute"),
                (f.style.borderLeft = "".concat(
                  (c - e) / 2,
                  "px solid #0000007a"
                )),
                (f.style.borderRight = "".concat(
                  (c - e) / 2,
                  "px solid #0000007a"
                )),
                (f.style.borderTop = "".concat(
                  (d - e) / 2,
                  "px solid #0000007a"
                )),
                (f.style.borderBottom = "".concat(
                  (d - e) / 2,
                  "px solid #0000007a"
                )),
                (f.style.boxSizing = "border-box"),
                (f.style.top = "0px"),
                (f.style.bottom = "0px"),
                (f.style.left = "0px"),
                (f.style.right = "0px"),
                (f.id = "".concat(a.SHADED_REGION_CLASSNAME)),
                11 > c - e || 11 > d - e)
              )
                this.hasBorderShaders = !1;
              else {
                this._insertShaderBorders(f, 40, 5, -5, 0, !0),
                  this._insertShaderBorders(f, 40, 5, -5, 0, !1),
                  this._insertShaderBorders(f, 40, 5, e + 5, 0, !0),
                  this._insertShaderBorders(f, 40, 5, e + 5, 0, !1),
                  this._insertShaderBorders(f, 5, 45, -5, -5, !0),
                  this._insertShaderBorders(f, 5, 45, e + 5 - 40, -5, !0),
                  this._insertShaderBorders(f, 5, 45, -5, -5, !1),
                  this._insertShaderBorders(f, 5, 45, e + 5 - 40, -5, !1),
                  (this.hasBorderShaders = !0);
              }
              b.append(f);
            }
          },
        },
        {
          key: "_insertShaderBorders",
          value: function (b, c, d, e, f, g) {
            var h = document.createElement("div");
            (h.style.position = "absolute"),
              (h.style.backgroundColor = a.BORDER_SHADER_DEFAULT_COLOR),
              (h.style.width = "".concat(c, "px")),
              (h.style.height = "".concat(d, "px")),
              (h.style.top = "".concat(e, "px")),
              g
                ? (h.style.left = "".concat(f, "px"))
                : (h.style.right = "".concat(f, "px")),
              this.borderShaders || (this.borderShaders = []),
              this.borderShaders.push(h),
              b.appendChild(h);
          },
        },
        {
          key: "_possiblyUpdateShaders",
          value: function (b) {
            this.qrMatch === b ||
              (this.hasBorderShaders &&
                this.borderShaders &&
                this.borderShaders.length &&
                this.borderShaders.forEach(function (c) {
                  c.style.backgroundColor = b
                    ? a.BORDER_SHADER_MATCH_COLOR
                    : a.BORDER_SHADER_DEFAULT_COLOR;
                }),
              (this.qrMatch = b));
          },
        },
        {
          key: "_possiblyCloseLastScanImageFile",
          value: function () {
            this._lastScanImageFile &&
              (URL.revokeObjectURL(this._lastScanImageFile),
              (this._lastScanImageFile = null));
          },
        },
        {
          key: "_createVideoConstraints",
          value: function (a) {
            if ("string" == typeof a)
              return {
                deviceId: {
                  exact: a,
                },
              };
            if ("object" == _typeof(a)) {
              var b = {
                  user: !0,
                  environment: !0,
                },
                c = function (a) {
                  if (a in b) return !0;
                  throw (
                    "config has invalid 'facingMode' value = " +
                    "'".concat(a, "'")
                  );
                },
                d = Object.keys(a);
              if (1 != d.length)
                throw (
                  "'cameraIdOrConfig' object should have exactly 1 key," +
                  " if passed as an object, found ".concat(d.length, " keys")
                );
              var e = Object.keys(a)[0];
              if ("facingMode" != e && "deviceId" != e)
                throw (
                  "Only '"
                    .concat("facingMode", "' and '")
                    .concat("deviceId", "' ") +
                  " are supported for 'cameraIdOrConfig'"
                );
              if ("facingMode" == e) {
                var f = a[e];
                if ("string" == typeof f) {
                  if (c(f))
                    return {
                      facingMode: f,
                    };
                } else if ("object" != _typeof(f)) {
                  var g = _typeof(f);
                  throw "Invalid type of 'facingMode' = ".concat(g);
                } else if (!("exact" in f))
                  throw (
                    "'facingMode' should be string or object with" +
                    " ".concat("exact", " as key.")
                  );
                else if (c(f.exact))
                  return {
                    facingMode: {
                      exact: f.exact,
                    },
                  };
              } else {
                var h = a[e];
                if ("string" == typeof h)
                  return {
                    deviceId: h,
                  };
                if ("object" == _typeof(h)) {
                  if ("exact" in h)
                    return {
                      deviceId: {
                        exact: h.exact,
                      },
                    };
                  throw (
                    "'deviceId' should be string or object with" +
                    " ".concat("exact", " as key.")
                  );
                } else {
                  var i = _typeof(h);
                  throw "Invalid type of 'deviceId' = ".concat(i);
                }
              }
            } else {
              var j = _typeof(a);
              throw "Invalid type of 'cameraIdOrConfig' = ".concat(j);
            }
          },
        },
        {
          key: "_isMediaStreamConstraintsValid",
          value: function (b) {
            if (!b) return a._logError("Empty videoConstraints", !0), !1;
            if ("object" !== _typeof(b)) {
              var c = _typeof(b);
              return (
                a._logError(
                  "videoConstraints should be of type object, the " +
                    "object passed is of type ".concat(c, "."),
                  !0
                ),
                !1
              );
            }
            for (
              var d,
                e = [
                  "autoGainControl",
                  "channelCount",
                  "echoCancellation",
                  "latency",
                  "noiseSuppression",
                  "sampleRate",
                  "sampleSize",
                  "volume",
                ],
                f = new Set(e),
                g = Object.keys(b),
                h = 0;
              h < g.length;
              h++
            )
              if (((d = g[h]), f.has(d)))
                return (
                  a._logError(
                    "".concat(d, " is not supported videoConstaints."),
                    !0
                  ),
                  !1
                );
            return !0;
          },
        },
      ],
      [
        {
          key: "getCameras",
          value: function () {
            var a = this;
            return new Promise(function (b, c) {
              if (
                navigator.mediaDevices &&
                navigator.mediaDevices.enumerateDevices &&
                navigator.mediaDevices.getUserMedia
              )
                a._log("navigator.mediaDevices used"),
                  navigator.mediaDevices
                    .getUserMedia({
                      audio: !1,
                      video: !0,
                    })
                    .then(function (d) {
                      d.oninactive = function () {
                        return a._log("All streams closed");
                      };
                      var e = function (a) {
                        for (
                          var b, c = a.getVideoTracks(), d = 0;
                          d < c.length;
                          d++
                        )
                          (b = c[d]),
                            (b.enabled = !1),
                            b.stop(),
                            a.removeTrack(b);
                      };
                      navigator.mediaDevices
                        .enumerateDevices()
                        .then(function (c) {
                          for (var f, g = [], h = 0; h < c.length; h++)
                            (f = c[h]),
                              "videoinput" == f.kind &&
                                g.push({
                                  id: f.deviceId,
                                  label: f.label,
                                });
                          a._log("".concat(g.length, " results found")),
                            e(d),
                            b(g);
                        })
                        ["catch"](function (a) {
                          c("".concat(a.name, " : ").concat(a.message));
                        });
                    })
                    ["catch"](function (a) {
                      c("".concat(a.name, " : ").concat(a.message));
                    });
              else if (MediaStreamTrack && MediaStreamTrack.getSources) {
                a._log("MediaStreamTrack.getSources used");
                var d = function (c) {
                  for (var d, e = [], f = 0; f !== c.length; ++f)
                    (d = c[f]),
                      "video" === d.kind &&
                        e.push({
                          id: d.id,
                          label: d.label,
                        });
                  a._log("".concat(e.length, " results found")), b(e);
                };
                MediaStreamTrack.getSources(d);
              } else
                a._log("unable to query supported devices."),
                  c("unable to query supported devices.");
            });
          },
        },
        {
          key: "_getTimeoutFps",
          value: function (a) {
            return 1e3 / a;
          },
        },
        {
          key: "_log",
          value: function (b) {
            a.VERBOSE && console.log(b);
          },
        },
        {
          key: "_logError",
          value: function (b, c) {
            (a.VERBOSE || !0 === c) && console.error(b);
          },
        },
      ]
    ),
    a
  );
})();
_defineProperty(Html5Qrcode, "DEFAULT_WIDTH", 300),
  _defineProperty(Html5Qrcode, "DEFAULT_WIDTH_OFFSET", 2),
  _defineProperty(Html5Qrcode, "FILE_SCAN_MIN_HEIGHT", 300),
  _defineProperty(Html5Qrcode, "SCAN_DEFAULT_FPS", 2),
  _defineProperty(Html5Qrcode, "MIN_QR_BOX_SIZE", 50),
  _defineProperty(Html5Qrcode, "SHADED_LEFT", 1),
  _defineProperty(Html5Qrcode, "SHADED_RIGHT", 2),
  _defineProperty(Html5Qrcode, "SHADED_TOP", 3),
  _defineProperty(Html5Qrcode, "SHADED_BOTTOM", 4),
  _defineProperty(Html5Qrcode, "SHADED_REGION_CLASSNAME", "qr-shaded-region"),
  _defineProperty(Html5Qrcode, "VERBOSE", !1),
  _defineProperty(Html5Qrcode, "BORDER_SHADER_DEFAULT_COLOR", "#ffffff"),
  _defineProperty(Html5Qrcode, "BORDER_SHADER_MATCH_COLOR", "rgb(90, 193, 56)");

/** Html5QrcodeScanner **/
("use strict");

function _classCallCheck(a, b) {
  if (!(a instanceof b))
    throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(a, b) {
  for (var c, d = 0; d < b.length; d++)
    (c = b[d]),
      (c.enumerable = c.enumerable || !1),
      (c.configurable = !0),
      "value" in c && (c.writable = !0),
      Object.defineProperty(a, c.key, c);
}

function _createClass(a, b, c) {
  return (
    b && _defineProperties(a.prototype, b), c && _defineProperties(a, c), a
  );
}

function _defineProperty(a, b, c) {
  return (
    b in a
      ? Object.defineProperty(a, b, {
          value: c,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (a[b] = c),
    a
  );
}
var Html5QrcodeScanner = (function () {
  function a(b, c, d) {
    if (
      (_classCallCheck(this, a),
      (this.elementId = b),
      (this.config = c),
      (this.verbose = !0 === d),
      !document.getElementById(b))
    )
      throw "HTML Element with id=".concat(b, " not found");
    (this.currentScanType = a.SCAN_TYPE_CAMERA),
      (this.sectionSwapAllowed = !0),
      (this.section = void 0),
      (this.html5Qrcode = void 0),
      (this.qrCodeSuccessCallback = void 0),
      (this.qrCodeErrorCallback = void 0);
  }
  return (
    _createClass(a, [
      {
        key: "render",
        value: function (b, c) {
          var d = this;
          (this.lastMatchFound = void 0),
            (this.qrCodeSuccessCallback = function (c) {
              if ((d.__setStatus("MATCH", a.STATUS_SUCCESS), b)) b(c);
              else {
                if (d.lastMatchFound == c) return;
                (d.lastMatchFound = c),
                  d.__setHeaderMessage(
                    "Last Match: ".concat(c),
                    a.STATUS_SUCCESS
                  );
              }
            }),
            (this.qrCodeErrorCallback = function (a) {
              d.__setStatus("Scanning"), c && c(a);
            });
          var e = document.getElementById(this.elementId);
          (e.innerHTML = ""),
            this.__createBasicLayout(e),
            (this.html5Qrcode = new Html5Qrcode(
              this.__getScanRegionId(),
              this.verbose
            ));
        },
      },
      {
        key: "clear",
        value: function () {
          var a = this,
            b = this,
            c = function () {
              var b = document.getElementById(a.elementId);
              b && ((b.innerHTML = ""), a.__resetBasicLayout(b));
            };
          if (this.html5Qrcode)
            return new Promise(function (a, d) {
              b.html5Qrcode._isScanning &&
                b.html5Qrcode
                  .stop()
                  .then(function () {
                    b.html5Qrcode.clear(), c(), a();
                  })
                  ["catch"](function (a) {
                    b.verbose &&
                      console.error("Unable to stop qrcode scanner", a),
                      d(a);
                  });
            });
        },
      },
      {
        key: "__createBasicLayout",
        value: function (a) {
          (a.style.position = "relative"),
            (a.style.padding = "0px"),
            (a.style.border = "1px solid silver"),
            this.__createHeader(a);
          var b = document.createElement("div"),
            c = this.__getScanRegionId();
          (b.id = c),
            (b.style.width = "100%"),
            (b.style.minHeight = "100px"),
            (b.style.textAlign = "center"),
            a.appendChild(b),
            this.__insertCameraScanImageToScanRegion();
          var d = document.createElement("div"),
            e = this.__getDashboardId();
          (d.id = e),
            (d.style.width = "100%"),
            a.appendChild(d),
            this.__setupInitialDashboard(d);
        },
      },
      {
        key: "__resetBasicLayout",
        value: function (a) {
          a.style.border = "none";
        },
      },
      {
        key: "__setupInitialDashboard",
        value: function (a) {
          this.__createSection(a),
            this.__createSectionControlPanel(),
            this.__createSectionSwap();
        },
      },
      {
        key: "__createHeader",
        value: function (a) {
          var b = document.createElement("div");
          (b.style.textAlign = "left"),
            (b.style.margin = "0px"),
            (b.style.padding = "5px"),
            (b.style.fontSize = "20px"),
            (b.style.borderBottom = "1px solid rgba(192, 192, 192, 0.18)"),
            a.appendChild(b);
          var c = document.createElement("span");
          (c.innerHTML = "QR Code Scanner"), b.appendChild(c);
          c.style.textAlign = "center";
          var d = document.createElement("span");
          (d.id = this.__getStatusSpanId()),
            (d.style.float = "right"),
            (d.style.padding = "5px 7px"),
            (d.style.fontSize = "14px"),
            (d.style.background = "#dedede6b"),
            (d.style.border = "1px solid #00000000"),
            (d.style.color = "rgb(17, 17, 17)"),
            b.appendChild(d),
            this.__setStatus("IDLE");
          var e = document.createElement("div");
          (e.id = this.__getHeaderMessageContainerId()),
            (e.style.display = "none"),
            (e.style.fontSize = "14px"),
            (e.style.padding = "2px 10px"),
            (e.style.marginTop = "4px"),
            (e.style.borderTop = "1px solid #f6f6f6"),
            b.appendChild(e);
        },
      },
      {
        key: "__createSection",
        value: function (a) {
          var b = document.createElement("div");
          (b.id = this.__getDashboardSectionId()),
            (b.style.width = "100%"),
            (b.style.padding = "10px"),
            (b.style.textAlign = "left"),
            a.appendChild(b);
        },
      },
      {
        key: "__createSectionControlPanel",
        value: function () {
          var b = this,
            c = document.getElementById(this.__getDashboardSectionId()),
            d = document.createElement("div");
          c.appendChild(d);
          var e = document.createElement("div");
          (e.id = this.__getDashboardSectionCameraScanRegionId()),
            (e.style.display =
              this.currentScanType == a.SCAN_TYPE_CAMERA ? "block" : "none"),
            d.appendChild(e);
          var f = document.createElement("div");
          f.style.textAlign = "center";
          var g = document.createElement("button");
          (g.innerHTML = "Request Camera Permissions"),
            g.addEventListener("click", function () {
              (g.disabled = !0),
                b.__setStatus("PERMISSION"),
                b.__setHeaderMessage("Requesting camera permissions..."),
                Html5Qrcode.getCameras()
                  .then(function (c) {
                    b.__setStatus("IDLE"),
                      b.__resetHeaderMessage(),
                      c && 0 != c.length
                        ? (e.removeChild(f), b.__renderCameraSelection(c))
                        : b.__setStatus("No Cameras", a.STATUS_WARNING);
                  })
                  ["catch"](function (c) {
                    (g.disabled = !1),
                      b.__setStatus("IDLE"),
                      b.__setHeaderMessage(c, a.STATUS_WARNING);
                  });
            }),
            f.appendChild(g),
            e.appendChild(f);
          var h = document.createElement("div");
          (h.id = this.__getDashboardSectionFileScanRegionId()),
            (h.style.textAlign = "center"),
            (h.style.display =
              this.currentScanType == a.SCAN_TYPE_CAMERA ? "none" : "block"),
            d.appendChild(h);
          var i = document.createElement("input");
          (i.id = this.__getFileScanInputId()),
            (i.accept = "image/*"),
            (i.type = "file"),
            (i.style.width = "200px"),
            (i.disabled = this.currentScanType == a.SCAN_TYPE_CAMERA);
          var j = document.createElement("span");
          (j.innerHTML = "&nbsp; Select Image"),
            h.appendChild(i),
            h.appendChild(j),
            i.addEventListener("change", function (c) {
              if (
                b.currentScanType === a.SCAN_TYPE_FILE &&
                0 != c.target.files.length
              ) {
                var d = c.target.files[0];
                b.html5Qrcode
                  .scanFile(d, !0)
                  .then(function (a) {
                    b.__resetHeaderMessage(), b.qrCodeSuccessCallback(a);
                  })
                  ["catch"](function (c) {
                    b.__setStatus("ERROR", a.STATUS_WARNING),
                      b.__setHeaderMessage(c, a.STATUS_WARNING),
                      b.qrCodeErrorCallback(c);
                  });
              }
            });
        },
      },
      {
        key: "__renderCameraSelection",
        value: function (b) {
          var c = this,
            d = document.getElementById(
              this.__getDashboardSectionCameraScanRegionId()
            );
          d.style.textAlign = "center";
          var e = document.createElement("span");
          (e.innerHTML = "Select Camera (".concat(b.length, ") &nbsp;")),
            (e.style.marginRight = "10px");
          var f = document.createElement("select");
          f.id = this.__getCameraSelectionId();
          for (var g = 0; g < b.length; g++) {
            var h = b[g],
              j = h.id,
              k = null == h.label ? j : h.label,
              l = document.createElement("option");
            (l.value = j), (l.innerHTML = k), f.appendChild(l);
          }
          e.appendChild(f), d.appendChild(e);
          var m = document.createElement("span"),
            n = document.createElement("button");
          (n.innerHTML = "Start Scanning"), m.appendChild(n);
          var o = document.createElement("button");
          (o.innerHTML = "Stop Scanning"),
            (o.style.display = "none"),
            (o.disabled = !0),
            m.appendChild(o),
            d.appendChild(m),
            n.addEventListener("click", function () {
              (f.disabled = !0),
                (n.disabled = !0),
                c._showHideScanTypeSwapLink(!1);
              var b = c.config
                  ? c.config
                  : {
                      fps: 10,
                      qrbox: 250,
                    },
                d = f.value;
              c.html5Qrcode
                .start(d, b, c.qrCodeSuccessCallback, c.qrCodeErrorCallback)
                .then(function () {
                  (o.disabled = !1),
                    (o.style.display = "inline-block"),
                    (n.style.display = "none"),
                    c.__setStatus("Scanning");
                })
                ["catch"](function (b) {
                  c._showHideScanTypeSwapLink(!0),
                    (f.disabled = !1),
                    (n.disabled = !1),
                    c.__setStatus("IDLE"),
                    c.__setHeaderMessage(b, a.STATUS_WARNING);
                });
            }),
            o.addEventListener("click", function () {
              (o.disabled = !0),
                c.html5Qrcode
                  .stop()
                  .then(function () {
                    c._showHideScanTypeSwapLink(!0),
                      (f.disabled = !1),
                      (n.disabled = !1),
                      (o.style.display = "none"),
                      (n.style.display = "inline-block"),
                      c.__setStatus("IDLE"),
                      c.__insertCameraScanImageToScanRegion();
                  })
                  ["catch"](function (b) {
                    (o.disabled = !1),
                      c.__setStatus("ERROR", a.STATUS_WARNING),
                      c.__setHeaderMessage(b, a.STATUS_WARNING);
                  });
            });
        },
      },
      {
        key: "__createSectionSwap",
        value: function () {
          var b = this,
            c = "Upload an Image File",
            d = "Scan using camera",
            e = document.getElementById(this.__getDashboardSectionId()),
            f = document.createElement("div");
          f.style.textAlign = "center";

          var g = document.createElement("a");
          g.style.backgroundColor = "#4CAF50";
          g.style.padding = "15px 32px";
          g.style.color = "white";

          g.style.display = "inline-block";
          g.style.marginTop = "40px";
          (g.style.textDecoration = "none"),
            (g.id = this.__getDashboardSectionSwapLinkId()),
            (g.innerHTML = this.currentScanType == a.SCAN_TYPE_CAMERA ? c : d),
            (g.href = "#scan-using-file"),
            g.addEventListener("click", function () {
              return b.sectionSwapAllowed
                ? void (b.__setStatus("IDLE"),
                  b.__resetHeaderMessage(),
                  (b.__getFileScanInput().value = ""),
                  (b.sectionSwapAllowed = !1),
                  b.currentScanType == a.SCAN_TYPE_CAMERA
                    ? (b.__clearScanRegion(),
                      (b.__getFileScanInput().disabled = !1),
                      (b.__getCameraScanRegion().style.display = "none"),
                      (b.__getFileScanRegion().style.display = "block"),
                      (g.innerHTML = d),
                      (b.currentScanType = a.SCAN_TYPE_FILE),
                      b.__insertFileScanImageToScanRegion())
                    : (b.__clearScanRegion(),
                      (b.__getFileScanInput().disabled = !0),
                      (b.__getCameraScanRegion().style.display = "block"),
                      (b.__getFileScanRegion().style.display = "none"),
                      (g.innerHTML = c),
                      (b.currentScanType = a.SCAN_TYPE_CAMERA),
                      b.__insertCameraScanImageToScanRegion()),
                  (b.sectionSwapAllowed = !0))
                : void (
                    b.verbose &&
                    console.error("Section swap called when not allowed")
                  );
            }),
            f.appendChild(g),
            e.appendChild(f);
        },
      },
      {
        key: "__setStatus",
        value: function (b, c) {
          c || (c = a.STATUS_DEFAULT);
          var d = document.getElementById(this.__getStatusSpanId());
          switch (((d.innerHTML = b), c)) {
            case a.STATUS_SUCCESS:
              (d.style.background = "#6aaf5042"), (d.style.color = "#477735");

              break;
            case a.STATUS_WARNING:
              (d.style.background = "#cb243124"), (d.style.color = "#cb2431");
              break;
            case a.STATUS_DEFAULT:
            default:
              (d.style.background = "#eef"),
                (d.style.color = "rgb(17, 17, 17)");
          }
        },
      },
      {
        key: "__resetHeaderMessage",
        value: function () {
          var a = document.getElementById(this.__getHeaderMessageContainerId());
          a.style.display = "none";
        },
      },
      {
        key: "__setHeaderMessage",
        value: function (b, c) {
          c || (c = a.STATUS_DEFAULT);
          var d = document.getElementById(this.__getHeaderMessageContainerId());
          switch (((d.innerHTML = b), (d.style.display = "block"), c)) {
            case a.STATUS_SUCCESS:
              (d.style.background = "#6aaf5042"), (d.style.color = "#477735");
              break;
            case a.STATUS_WARNING:
              (d.style.background = "#cb243124"), (d.style.color = "#cb2431");
              break;
            case a.STATUS_DEFAULT:
            default:
              (d.style.background = "#00000000"),
                (d.style.color = "rgb(17, 17, 17)");
          }
        },
      },
      {
        key: "_showHideScanTypeSwapLink",
        value: function (a) {
          !0 !== a && (a = !1),
            (this.sectionSwapAllowed = a),
            (this.__getDashboardSectionSwapLink().style.display = a
              ? "inline-block"
              : "none");
        },
      },
      {
        key: "__insertCameraScanImageToScanRegion",
        value: function () {
          var b = this,
            c = document.getElementById(this.__getScanRegionId());
          return this.cameraScanImage
            ? ((c.innerHTML = "<br>"), void c.appendChild(this.cameraScanImage))
            : void ((this.cameraScanImage = new Image()),
              (this.cameraScanImage.onload = function () {
                (c.innerHTML = "<br>"), c.appendChild(b.cameraScanImage);
              }),
              (this.cameraScanImage.width = 64),
              (this.cameraScanImage.style.opacity = 0.3),
              (this.cameraScanImage.src = a.ASSET_CAMERA_SCAN));
        },
      },
      {
        key: "__insertFileScanImageToScanRegion",
        value: function () {
          var b = this,
            c = document.getElementById(this.__getScanRegionId());
          return this.fileScanImage
            ? ((c.innerHTML = "<br>"), void c.appendChild(this.fileScanImage))
            : void ((this.fileScanImage = new Image()),
              (this.fileScanImage.onload = function () {
                (c.innerHTML = "<br>"), c.appendChild(b.fileScanImage);
              }),
              (this.fileScanImage.width = 64),
              (this.fileScanImage.style.opacity = 0.3),
              (this.fileScanImage.src = a.ASSET_FILE_SCAN));
        },
      },
      {
        key: "__clearScanRegion",
        value: function () {
          var a = document.getElementById(this.__getScanRegionId());
          a.innerHTML = "";
        },
      },
      {
        key: "__getDashboardSectionId",
        value: function () {
          return "".concat(this.elementId, "__dashboard_section");
        },
      },
      {
        key: "__getDashboardSectionCameraScanRegionId",
        value: function () {
          return "".concat(this.elementId, "__dashboard_section_csr");
        },
      },
      {
        key: "__getDashboardSectionFileScanRegionId",
        value: function () {
          return "".concat(this.elementId, "__dashboard_section_fsr");
        },
      },
      {
        key: "__getDashboardSectionSwapLinkId",
        value: function () {
          return "".concat(this.elementId, "__dashboard_section_swaplink");
        },
      },
      {
        key: "__getScanRegionId",
        value: function () {
          return "".concat(this.elementId, "__scan_region");
        },
      },
      {
        key: "__getDashboardId",
        value: function () {
          return "".concat(this.elementId, "__dashboard");
        },
      },
      {
        key: "__getFileScanInputId",
        value: function () {
          return "".concat(this.elementId, "__filescan_input");
        },
      },
      {
        key: "__getStatusSpanId",
        value: function () {
          return "".concat(this.elementId, "__status_span");
        },
      },
      {
        key: "__getHeaderMessageContainerId",
        value: function () {
          return "".concat(this.elementId, "__header_message");
        },
      },
      {
        key: "__getCameraSelectionId",
        value: function () {
          return "".concat(this.elementId, "__camera_selection");
        },
      },
      {
        key: "__getCameraScanRegion",
        value: function () {
          return document.getElementById(
            this.__getDashboardSectionCameraScanRegionId()
          );
        },
      },
      {
        key: "__getFileScanRegion",
        value: function () {
          return document.getElementById(
            this.__getDashboardSectionFileScanRegionId()
          );
        },
      },
      {
        key: "__getFileScanInput",
        value: function () {
          return document.getElementById(this.__getFileScanInputId());
        },
      },
      {
        key: "__getDashboardSectionSwapLink",
        value: function () {
          return document.getElementById(
            this.__getDashboardSectionSwapLinkId()
          );
        },
      },
    ]),
    a
  );
})();
_defineProperty(Html5QrcodeScanner, "SCAN_TYPE_CAMERA", "SCAN_TYPE_CAMERA"),
  _defineProperty(Html5QrcodeScanner, "SCAN_TYPE_FILE", "SCAN_TYPE_FILE"),
  _defineProperty(Html5QrcodeScanner, "STATUS_SUCCESS", "STATUS_SUCCESS"),
  _defineProperty(Html5QrcodeScanner, "STATUS_WARNING", "STATUS_WARNING"),
  _defineProperty(Html5QrcodeScanner, "STATUS_DEFAULT", "STATUS_DEFAULT"),
  _defineProperty(
    Html5QrcodeScanner,
    "ASSET_FILE_SCAN",
    "https://raw.githubusercontent.com/mebjas/html5-qrcode/master/assets/file-scan.gif"
  ),
  _defineProperty(
    Html5QrcodeScanner,
    "ASSET_CAMERA_SCAN",
    "https://raw.githubusercontent.com/mebjas/html5-qrcode/master/assets/camera-scan.gif"
  );
