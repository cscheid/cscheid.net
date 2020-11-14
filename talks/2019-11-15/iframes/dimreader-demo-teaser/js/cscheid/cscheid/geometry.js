import * as cscheid from "../cscheid.js";

var math = cscheid.math;

//////////////////////////////////////////////////////////////////////////
// Vec2
    
export function Vec2(x, y) {
  this.x = x;
  this.y = y;
}

export function vec2(x, y) {
  return new Vec2(x, y);
};

Vec2.prototype.plus = function(p) {
  return new Vec2(this.x + p.x, this.y + p.y);
};
Vec2.prototype.add = function(p) {
  this.x += p.x;
  this.y += p.y;
  return this;
};
Vec2.prototype.minus = function(p) {
  return new Vec2(this.x - p.x, this.y - p.y);
};
Vec2.prototype.subtract = function(p) {
  this.x -= p.x;
  this.y -= p.y;
  return this;
};
Vec2.prototype.scale = function(v) {
  return new Vec2(this.x * v, this.y * v);
};
Vec2.prototype.scaleMutate = function(v) {
  this.x *= v;
  this.y *= v;
  return this;
};
Vec2.prototype.times = function(v) {
  return new Vec2(this.x * v, this.y * v);
};
Vec2.prototype.random = function() {
  return new Vec2(Math.random() * 2 - 1, Math.random() * 2 - 1);
};
Vec2.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
Vec2.prototype.dot = function(other) {
  return this.x * other.x + this.y * other.y;
};
Vec2.prototype.cross = function(other) {
  return this.x * other.y - this.y * other.x;
};
Vec2.prototype.closeTo = function(other, eps) {
  if (eps === undefined)
    eps = 1e-6;
  return this.minus(other).length() <= eps;
};
Vec2.prototype.transform = function(t) {
  return vec2(t.m[0] * this.x + t.m[1] * this.y + t.m[2],
              t.m[3] * this.x + t.m[4] * this.y + t.m[5]);
};
Vec2.prototype.transformMutate = function(t) {
  var newX = t.m[0] * this.x + t.m[1] * this.y + t.m[2],
      newY = t.m[3] * this.x + t.m[4] * this.y + t.m[5];
  this.x = newX;
  this.y = newY;
};
Vec2.prototype.distance = function(other) {
  return this.minus(other).length();
};
Vec2.prototype.unit = function() {
  return this.scale(1/(this.length() || 1));
};
Vec2.prototype.unitMutate = function() {
  var l = this.length() || 1;
  this.x /= l;
  this.y /= l;
};
Vec2.prototype.neg = function() {
  return this.scale(-1);
};
Vec2.prototype.set = function(x, y) {
  if (y === undefined) {
    return this.set(x.x, x.y);
  } else {
    this.x = x;
    this.y = y;
    return this;
  }
};
Vec2.prototype.lerp = function(u, other) {
  return vec2(u * other.x + (1-u) * this.x,
              u * other.y + (1-u) * this.y);
};
Vec2.prototype.project = function(other) {
  other = other.unit();
  return other.scale(this.dot(other));
};
Vec2.prototype.reflect = function(other) {
  var projection = this.project(other);
  var residual = this.minus(projection);
  return this.minus(residual.times(2));
};

//////////////////////////////////////////////////////////////////////////
// 

// //////////////////////////////////////////////////////////////////////////
// // HalfPlane
// function HalfPlane(p1, p2) {
//     if (p2 instanceof Vec2) {
//         this.v = vec2(-p2.y + p1.y, p2.x - p1.x);
//         var l = this.v.length();
//         this.c = -this.v.dot(p1) / l;
//         this.v = this.v.scale(1 / l);
//     } else {
//     }
// }
// geometry.HalfPlane = HalfPlane;
// function halfPlane(p1, p2) {
//     return new HalfPlane(p1, p2);
// }
// geometry.halfPlane = halfPlane;
// HalfPlane.prototype.signedDistance = function(p) {
//     return this.v.dot(p) + this.c;
// };
    
//////////////////////////////////////////////////////////////////////////
// transform

export function Transform(m11, m12, tx, m21, m22, ty) {
  if (m12 === undefined) {
    this.m = m11;
  } else {
    this.m = new Float32Array([m11, m12, tx, m21, m22, ty, 0, 0, 1]);
  }
}
    
export function transform(m11, m12, tx, m21, m22, ty) {
  return new Transform(m11, m12, tx, m21, m22, ty);
}

Transform.prototype.transform = function(other) {
  var t = new Float32Array(9);
  for (var i=0; i<3; ++i)
    for (var j=0; j<3; ++j)
      for (var k=0; k<3; ++k) {
        t[i*3+j] = this.m[i*3+k] * other.m[k*3+j];
      }
  return transform(t);
};
Transform.prototype.apply = function(other) {
  return other.transform(this);
};
Transform.prototype.applyMutate = function(other) {
  return other.transformMutate(this);
};
Transform.prototype.get = function(i, j) {
  return this.m[i * 3 + j];
};
Transform.prototype.set = function(i, j, v) {
  this.m[i * 3 + j] = v;
};
Transform.prototype.det = function() {
  return this.m[0] * this.m[4] - this.m[1] * this.m[3];
};
Transform.prototype.inverse = function() {
  var d = 1.0 / this.det();
  var t = transform( d * this.get(1, 1), -d * this.get(0, 1), 0,
                     -d * this.get(1, 0),  d * this.get(0, 0), 0);
  var v = t.apply(vec2(this.get(0, 2), this.get(1, 2)));
  t.set(0, 2, -v.x);
  t.set(1, 2, -v.y);
  return t;
};
Transform.prototype.identity = function() {
  return transform(1,0,0,0,1,0);
};
Transform.prototype.rotate = function(theta) {
  var s = Math.sin(theta);
  var c = Math.cos(theta);
  return transform(c, -s, 0, s, c, 0);
};
Transform.prototype.translate = function(tx, ty) {
  if (ty === undefined)
    return transform(1, 0, tx.x, 0, 1, tx.y);
  return transform(1, 0, tx, 0, 1, ty);
};
Transform.prototype.scale = function(sx, sy) {
  return transform(sx, 0, 0, 0, sy, 0);
};

// To perform a transformation around a point,
// first translate the point to the origin, then perform the transformation,
// then translate back that first amount
Transform.prototype.around = function(v, t) {
  return transform.translate(v.x, v.y)
    .apply(t)
    .apply(transform.translate(-v.x, -v.y));
};

Transform.svg = function() {
  return ["transform(",
          this.m[0], ", ",
          this.m[1], ", ",
          this.m[2], ", ",
          this.m[3], ", ",
          this.m[4], ", ",
          this.m[5], ") "].join("");
};

Transform.prototype.powerMethod = function() {
  var v = vec2(Math.random(), Math.random());
  v.unitMutate();
  var newV = vec2(v.x, v.y);
  do {
    v.set(newV);
    this.applyMutate(newV);
    newV.unitMutate();
  } while (v.distance(newV) > math.eps);
  return newV;
};
    
//////////////////////////////////////////////////////////////////////////
// line-line intersection

// probably numerically terribad, but
// http://mathworld.wolfram.com/Line-LineIntersection.html
export function lineLineIntersect(p1, p2, p3, p4) {
  function det2(a, b, c, d) {
    return a * d - b * c;
  }
  var x12 = p1.x - p2.x, x34 = p3.x - p4.x;
  var y12 = p1.y - p2.y, y34 = p3.y - p4.y;
  var t1 = det2(p1.x, p1.y, p2.x, p2.y),
      t2 = det2(p3.x, p3.y, p4.x, p4.y),
      t3 = det2(x12, y12, x34, y34);
  return vec2(det2(t1, x12, t2, x34) / t3,
              det2(t1, y12, t2, y34) / t3);
}

//////////////////////////////////////////////////////////////////////////
// ellipse

export function Ellipse(a, b, c, d, e, f)
{
  if (a === undefined) {
    this.a = 1;
    this.b = 1;
    this.c = 0;
    this.d = 0;
    this.e = 0;
    this.f = -1;
  } else {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
  }
  this.gradient = transform(2*a, c, d, c, 2*b, e);
  this.center = this.gradient.inverse().apply(vec2(0,0));
  // var ys = math.quadratic(b-c*c/4*a, e-c*d/2*a, f-d*d/4*a);
  // var xs = math.quadratic(a-c*c/4*b, d-c*e/2*b, f-e*e/4*b);
  // var y1 = ys.root1, y2 = ys.root2,
  //     x1 = xs.root1, x2 = xs.root2;
  // TBF: this.bound
}

export function ellipse(a,b,c,d,e,f) {
  return new Ellipse(a,b,c,d,e,f);
}

Ellipse.prototype.value = function(p) {
  return this.a*p.x*p.x + this.b*p.y*p.y + this.c*p.x*p.y
    + this.d*p.x + this.e*p.y + this.f;
};
Ellipse.prototype.contains = function(p) {
  return this.value(p) < 0;
};
Ellipse.prototype.transform = function(t) {
  var i = t.inverse();
  var [m00, m01, m02, m10, m11, m12] = i.m;
  var aa = this.a*m00*m00 + this.b*m10*m10 + this.c*m00*m10;
  var bb = this.a*m01*m01 + this.b*m11*m11 + this.c*m01*m11;
  var cc = 2*this.a*m00*m01 + 2*this.b*m10*m11 
      + this.c*(m00*m11 + m01*m10);
  var dd = 2*this.a*m00*m02 + 2*this.b*m10*m12 
      + this.c*(m00*m12 + m02*m10) + this.d*m00 + this.e*m10;
  var ee = 2*this.a*m01*m02 + 2*this.b*m11*m12 
      + this.c*(m01*m12 + m02*m11) + this.d*m01 + this.e*m11;
  var ff = this.a*m02*m02 + this.b*m12*m12 + this.c*m02*m12 
      + this.d*m02 + this.e*m12 + this.f;
  return ellipse(aa, bb, cc, dd, ee, ff);
};
    
Ellipse.prototype.lineIntersection = function(c, p) {
  var pc = p.minus(c);
  var u2 = this.a*Math.pow(pc.x, 2) + this.b*Math.pow(pc.y, 2) + this.c*pc.x*pc.y;
  var u1 = 2*this.a*c.x*pc.x + 2*this.b*c.y*pc.y 
      + this.c*c.y*pc.x +   this.c*c.x*pc.y + this.d*pc.x 
      + this.e*pc.y;
  var u0 = this.a*Math.pow(c.x, 2) + this.b*Math.pow(c.y, 2) + this.c*c.x*c.y 
      + this.d*c.x + this.e*c.y + this.f;
  var result = [];
  var sols = math.quadratic(u2, u1, u0);
  if (isNaN(sols.root1) || isNaN(sols.root2))
    return result;
  result.push(c.plus(pc.scale(sols.root1)));
  result.push(c.plus(pc.scale(sols.root2)));
  return result;
};

// returns the closest intersection to c
Ellipse.prototype.closestIntersection = function(c, p) {
  var intersections = this.lineIntersection(c, p);
  intersections.sort(function(a, b) {
    return a.distance(c) - b.distance(c);
  });
  return intersections[0]; // returns undefined on empty list, as intended
};

Ellipse.prototype.tangentPointWithNormal = function(n) {
  var tangent = vec2(n.y, -n.x);
  var p1 = this.center;
  var i=0;
  do {
    var p2 = p1.plus(n);
    var closestP = this.closestIntersection(p2, p1);
    if (closestP === undefined)
      return undefined;
    var line2 = this.lineIntersection(closestP, closestP.plus(tangent));
    if (line2 === undefined)
      return undefined;
    p1 = line2[1].plus(line2[0]).scale(0.5);
    ++i;
  } while (p1.distance(closestP) >= 1e-6);
  return p1;
};

Ellipse.prototype.distanceApprox = function(p) {
  var v = this.value(p);
  return v / this.gradient.apply(p).length();
};

Ellipse.prototype.hessian = function() {
  return transform(2 * this.a, this.c,     0,
                   this.c,     2 * this.b, 0);
};

Ellipse.prototype.majorAxis = function() {
  var h = this.hessian();
  var minorAxis = h.powerMethod();
  var majorAxis = vec2(minorAxis.y, -minorAxis.x);
  var length = Math.pow(1/(h.apply(majorAxis).length() / 2), 0.5);
  majorAxis = majorAxis.scale(length);
  return [this.center.plus(majorAxis), this.center.minus(majorAxis)];
};

// closestPoint throws exceptions
// TODO: handle interior points.
Ellipse.prototype.closestPoint = function(p) {
  var axis = this.majorAxis();
  var that = this;

  if (math.withinEps(axis[1].minus(axis[0]).unit().cross(p.minus(axis[1]).unit()))) {
    if (p.distance(axis[0]) < p.distance(axis[1]))
      return axis[0];
    else
      return axis[1];
  }

  function rayCrossWithNormalAtIntersection(u) {
    var pointOnAxis = axis[0].lerp(u, axis[1]);
    var rayDirection = pointOnAxis.minus(p).unit();
    var intersection = that.closestIntersection(p, pointOnAxis);
    if (intersection === undefined)
      throw new Error("closestPoint: rayCrossWithNormal found no intersection");
    var normal = that.gradient.apply(intersection).unit();
    return normal.cross(rayDirection);
  }
  var param = math.findRoot(rayCrossWithNormalAtIntersection, 0, 1).v;
  var pointOnAxis = axis[0].lerp(param, axis[1]);
  return this.closestIntersection(p, pointOnAxis);
};

