#!/usr/bin/env python

from flask import Flask, abort
import csv
import json
import glob

app = Flask(__name__,
            static_folder="files",
            static_url_path="")

@app.route("/")
def root():
    return app.send_static_file("index.html")

@app.route("/get_file_list")
def get_file_list():
    files = glob.glob("data/*.csv")
    result = []
    for r in files:
        result.append(r.split("/")[1][:-4])
    return json.dumps(result)

@app.route("/get_data/<name>/<column>")
def get_data(name, column):
    try:
        f = csv.reader(open("data/%s.csv" % name))
        result = []
        columns = f.next()
        index = columns.index(column)
        for line in f:
            result.append(line[index])
        return json.dumps(result)
    except Exception, e:
        print e
        abort(404)

@app.route("/get_column_list/<name>")
def get_column_list(name):
    try:
        f = csv.reader(open("data/%s.csv" % name))
        columns = f.next()
        return json.dumps(columns)
    except Exception, e:
        print e
        abort(404)

if __name__ == "__main__":
    app.debug = True
    app.run()
