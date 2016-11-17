/*global cscheid */

(function() {
    var geometry = {};
    cscheid.geometry = geometry;
    var math = cscheid.math;

    //////////////////////////////////////////////////////////////////////////
    // Vec2
    
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    geometry.Vec2 = Vec2;
    
    function vec2(x, y) {
        return new Vec2(x, y);
    };
    geometry.vec2 = vec2;

    Vec2.prototype.plus = function(p) {
        return new Vec2(this.x + p.x, this.y + p.y);
    };
    Vec2.prototype.minus = function(p) {
        return new Vec2(this.x - p.x, this.y - p.y);
    };
    Vec2.prototype.scale = function(v) {
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
    Vec2.prototype.closeTo = function(other, eps) {
        if (eps === undefined)
            eps = 1e-6;
        return this.minus(other).length() <= eps;
    };
    Vec2.prototype.transform = function(t) {
        return vec2(t.m[0] * this.x + t.m[1] * this.y + t.m[2],
                    t.m[3] * this.x + t.m[4] * this.y + t.m[5]);
    };
    Vec2.prototype.distance = function(other) {
        return this.minus(other).length();
    };
    Vec2.prototype.unit = function() {
        return this.scale(1/(this.length() || 1));
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
    
    //////////////////////////////////////////////////////////////////////////
    // HalfPlane

    function HalfPlane(p1, p2) {
        if (p2 instanceof Vec2) {
            this.v = vec2(-p2.y + p1.y, p2.x - p1.x);
            var l = this.v.length();
            this.c = -this.v.dot(p1) / l;
            this.v = this.v.scale(1 / l);
        } else {
            
        }
    }
    geometry.HalfPlane = HalfPlane;
    
    function halfPlane(p1, p2) {
        return new HalfPlane(p1, p2);
    }
    geometry.halfPlane = halfPlane;
    
    HalfPlane.prototype.signedDistance = function(p) {
        return this.v.dot(p) + this.c;
    };
    
    //////////////////////////////////////////////////////////////////////////
    // transform

    function Transform(m11, m12, tx, m21, m22, ty) {
        if (m12 === undefined) {
            this.m = m11;
        } else {
            this.m = new Float32Array([m11, m12, tx, m21, m22, ty, 0, 0, 1]);
        }
    }
    geometry.Transform = Transform;
    
    function transform(m11, m12, tx, m21, m22, ty) {
        return new Transform(m11, m12, tx, m21, m22, ty);
    }
    geometry.transform = transform;

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

        
    //////////////////////////////////////////////////////////////////////////
    // line-line intersection

    // probably numerically terribad, but
    // http://mathworld.wolfram.com/Line-LineIntersection.html
    function lineLineIntersect(p1, p2, p3, p4) {
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
    geometry.lineLineIntersect = lineLineIntersect;

    //////////////////////////////////////////////////////////////////////////
    // ellipse

    function Ellipse(a, b, c, d, e, f)
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
        var ys = math.quadratic(b-c*c/4*a, e-c*d/2*a, f-d*d/4*a);
        var xs = math.quadratic(a-c*c/4*b, d-c*e/2*b, f-e*e/4*b);
        var y1 = ys.root1, y2 = ys.root2,
            x1 = xs.root1, x2 = xs.root2;
        // TBF: this.bound
    }
    geometry.Ellipse = Ellipse;

    function ellipse(a,b,c,d,e,f) {
        return new Ellipse(a,b,c,d,e,f);
    }
    geometry.ellipse = ellipse;

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
        try {
            var sols = math.quadratic(u2, u1, u0);
        } catch (e) {
            throw new Error("Internal error, expected solutions to be real numbers");
        }
        return { point1: c.plus(pc.scale(sols.root1)),
                 point2: c.plus(pc.scale(sols.root2)) };
    };

    // returns the closest intersection to c
    Ellipse.prototype.closestIntersection = function(c, p) {
        var intersections = this.lineIntersection(c, p);
        var d1 = intersections.point1.distance(c),
            d2 = intersections.point2.distance(c);
        return d1 < d2 ? intersections.point1 : intersections.point2;
    };
    
    Ellipse.prototype.tangentPointWithNormal = function(n) {
        var tangent = vec2(n.y, -n.x);
        var p1 = this.center;
        var i=0;
        do {
            var p2 = p1.plus(n);
            var closestP = this.closestIntersection(p2, p1);
            var line2 = this.lineIntersection(closestP, closestP.plus(tangent));
            p1 = line2.point2.plus(line2.point1).scale(0.5);
            ++i;
        } while (p1.distance(closestP) >= 1e-6);
        return p1;
    };

    Ellipse.prototype.distanceApprox = function(p) {
        var v = this.value(p);
        return v / this.gradient.apply(p).length();
    };
    
    // I would love to know if this has been published.
    Ellipse.prototype.closestPointShame1 = function(p) {
        var i=0;
        var c = this.center;
        var s = this.center;
        console.clear();
        do {
            var normal1 = p.minus(c).unit();
            cscheid.debug.add("circle", {
                cx: c.x,
                cy: c.y,
                r: 5,
                stroke: "black",
                fill: "none"
            });
            
            var nextS = this.closestIntersection(p, c);
            var normal2 = this.gradient.apply(nextS).unit();
            var perp1 = vec2(normal1.y, -normal1.x);
            var nextCp = lineLineIntersect(c.plus(perp1), c.minus(perp1),
                                           nextS, nextS.plus(normal2));
            var is = this.lineIntersection(p, nextCp);
            var nextC = is.point1.plus(is.point2).scale(0.5);
            var d = s.distance(nextS);
            s = nextS;
            c = nextC;
            if (++i > 40) {
                console.log("Too many iterations");
                throw new Error("Too many iterations");
            };
        } while (d > 1e-6);
        return s;
    };
    
    Ellipse.prototype.closestPointShame2 = function(p) {
        var i=0;
        var p1 = this.center;
        do {
            var normal1 = p.minus(p1).unit();
            var s1 = this.closestIntersection(p, p1);
            var s2 = this.tangentPointWithNormal(normal1);
            var normal2 = this.gradient.apply(s1).unit();
            var normal3 = this.gradient.apply(s2).unit();
            var normal4 = normal1.plus(normal2).unit();
            var closestP = this.tangentPointWithNormal(normal4);
            cscheid.debug.add("line", {
                x1: s1.x,
                x2: s1.plus(normal2.scale(20)).x,
                y1: s1.y,
                y2: s1.plus(normal2.scale(20)).y,
                stroke: "red"
            });
            cscheid.debug.add("line", {
                x1: s2.x,
                x2: s2.plus(normal3.scale(20)).x,
                y1: s2.y,
                y2: s2.plus(normal3.scale(20)).y,
                stroke: "blue"
            });
            var d = p1.distance(closestP);
            p1 = closestP;
            if (i++ > 40) {
                console.error("too many iterations");
                throw new Error("too many iterations");
            }
            cscheid.debug.add("circle", {
                cx: p1.x,
                cy: p1.y,
                stroke: "black",
                fill: "none",
                r: i+3
            });
        } while (d >= 1e-6);
        console.log("Distance", p1.minus(p).length());
        return p1;
    };

    // Ellipse.prototype.closestPoint3 = function(p) {
    //     var p1 = this.center;
    //     do {
    //         var normal1 = p.minus(p1).unit();
    //         var s1 = this.tangentPointWithNormal(normal1);
    //         var t1 = vec2(normal1.y, -normal1.x);
    //         var cross = this.lineLineIntersect(p, p1, s1.minus(t1), s1.plus(t1));

    //         var normalAtCross = this.gradient.apply(cross).unit();

    //     }        
    // }
    
    Ellipse.prototype.closestPoint = function(p) {
        try {
            var r = this.closestPointShame1(p);
            if (isNaN(r.x) || isNaN(r.y))
                return this.closestPointShame2(p);
            return r;
        } catch (e) {
            return this.closestPointShame2(p);
        }
    };
    
})();

