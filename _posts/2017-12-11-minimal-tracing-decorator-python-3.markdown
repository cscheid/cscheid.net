---
layout: post
title: "A minimal tracing decorator for Python 3"
---

Python3 has per-statement tracing, but that's a little too
all-or-nothing for me. Every other tracer I found on the web was
vastly overengineered, so I hacked this decorator together this
afternoon:

    import inspect
    trace_indent = 0
    def tracing(f):
        sig = inspect.signature(f)
        def do_it(*args, **kwargs):
            global trace_indent
            ws = ' ' * (trace_indent * 2)
            print("%sENTER %s: " % (ws, f.__name__))
            for ix, param in enumerate(sig.parameters.values()):
                print("%s    %s: %s" % (ws, param.name, args[ix]))
            trace_indent += 1
            result = f(*args, **kwargs)
            trace_indent -= 1
            print("%sEXIT %s (returned %s)" % (ws, f.__name__, result))
            return result
        return do_it

Then, for this program,

    @tracing
    def fib(n):
        if n < 2:
            return 1
        return fib(n-1) + fib(n-2)
    
    if __name__ == '__main__':
        print(fib(4))

You get this:

    $ python3 tracing_test.py
    ENTER fib:
      n: 4
      ENTER fib:
        n: 3
        ENTER fib:
          n: 2
          ENTER fib:
            n: 1
          EXIT fib (returned 1)
          ENTER fib:
            n: 0
          EXIT fib (returned 1)
        EXIT fib (returned 2)
        ENTER fib:
          n: 1
        EXIT fib (returned 1)
      EXIT fib (returned 3)
      ENTER fib:
        n: 2
        ENTER fib:
          n: 1
        EXIT fib (returned 1)
        ENTER fib:
          n: 0
        EXIT fib (returned 1)
      EXIT fib (returned 2)
    EXIT fib (returned 5)
    5

(MIT license, because why not.)
