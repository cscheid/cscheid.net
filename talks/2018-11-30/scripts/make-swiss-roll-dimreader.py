#!/usr/bin/env python

import sklearn.datasets
from sklearn.decomposition import PCA
import json
import sys

try:
    n_points = int(sys.argv[1])
except:
    n_points = 100

xs, ts = sklearn.datasets.make_swiss_roll(n_points)
pca = PCA(n_components = 2)

ys = pca.fit_transform(xs)

data = list({"domain": x.tolist(),
             "range": y.tolist(),
             "metadata": {"u": t},
             "tangent": pca.components_.tolist()} for x, y, t in zip(xs, ys, ts))

out = {"points": data}
print(json.dumps(out))
