
// Write a function that, for every object in an array, prints the
// value of the field "foo" to the console.

var forecasts = [
    { "city": "Washington, DC", "temperature": 92 },
    { "city": "New York", "temperature": 96 },
    { "city": "Seattle", "temperature": 77 },
    { "city": "Tucson", "temperature": 102 },
    { "city": "San Francisco", "temperature": 65 }
];

var objects = [{foo: 3, bar: "abc"},
               {foo: 5, bar: "def"}];

function f1(lst)
{
    for (var i=0; i<lst.length; ++i) {
        console.log(lst[i].foo);
    }
}

function f2(lst)
{
    var result = [];
    for (var i=0; i<lst.length; ++i) {
        result.push(lst[i].foo);
    }
    return result;
}

function map(lst, f)
{
    var result = [];
    for (var i=0; i<lst.length; ++i) {
        var obj = lst[i];
        result.push(f(obj));
    }
    return result;
}

// f1 = function(lst) { map(lst, function(x) { console.log(x.foo); }); }
// f2 = function(lst) { return map(lst, function(x) { return x.foo; } ); }

function extract(lst, field)
{
    return map(lst, function(obj) { return obj[field]; });
}

function filter(lst, f)
{
    var result = [];
    for (var i=0; i<lst.length; ++i) {
        var obj = lst[i];
        if (f(obj))
            result.push(obj);
    }
    return result;
}

//////////////////////////////////////////////////////////////////////////////

function keys(obj)
{
    var result = [];
    for (var key in obj) {
        result.push(key);
    }
    return result;
}

function pairs(obj)
{
    return map(keys(obj), function(key) { return [key, obj[key]]; });
}

function build(obj)
{
    var result = {};
    map(obj, function(keyValue) {
        var key = keyValue[0],
            value = keyValue[1];
        result[key] = value;
    });
    return result;
}

function clone(obj)
{
    return build(pairs(obj));
}

//////////////////////////////////////////////////////////////////////////////

function makeObject1(initialValue)
{
    return {
        value: function() {
            return initialValue;
        },
        increment: function() {
            initialValue++;
        }
    };
}

function makeObject2(initialValue)
{
    var result = {
        printValue: function() {
            console.log(initialValue);
            return this;
        },
        increment: function() {
            initialValue++;
            return this;
        }
    };
    return result;
}

function makeObject3(lst)
{
    var result = {
        printValue: function() {
            console.log(lst);
            return this;
        },
        map: function(f) {
            lst = map(lst, f);
            return this;
        },
        filter: function(f) {
            lst = filter(lst, f);
            return this;
        }
    };
}

////////////////////////////////////////////////////////////////////////////////

function f2c(f) {
    return (f - 32) * (5 / 9);
}

function c2f(c) {
    return (c * (9 / 5)) + 32;
}

function unitConverter() {
    var m, b;
    var domain_lo = 0,
        domain_hi = 1,
        codomain_lo = 0,
        codomain_hi = 1;
    var result = {
        convert: function(v) {
            return (v - domain_lo) / (domain_hi - domain_lo) * (codomain_hi - codomain_lo) +
                codomain_lo;
        },
        from: function(lo, hi) {
            domain_lo = lo;
            domain_hi = hi;
            return this;
        },
        to: function(lo, hi) {
            codomain_lo = lo;
            codomain_hi = hi;
            return this;
        }
    };
    return result;
}

//////////////////////////////////////////////////////////////////////////////

function convertForecasts(obj)
{
    var f2c = unitConverter().from(32, 212).to(0, 100);
    return map(obj, function(forecast) {
        var copy = clone(forecast);
        copy.temperature(f2c.convert(copy.temperature));
        return copy;
    });
}
