function createNoiseTexture(width, height) {
    var noiseCanvas = d3.select("#main")
        .append("canvas")
        .attr("width", width)
        .attr("height", height)
        .style("width", width)
        .style("height", height)
        .node();
    
    var ctx = noiseCanvas.getContext("2d");

    var arX = new Float32Array(width * height);
    var arY = new Float32Array(width * height);
    for (var i=0; i<arX.length; ++i) {
        var phase = Math.random() * Math.PI * 2;
        arX[i] = Math.cos(phase);
        arY[i] = Math.sin(phase);
    }
    function blurHorizontal(ar) {
        var a = new Float32Array(width);
        for (var i=0; i<height; ++i) {
            var offset = i * width;
            for (var j=0; j<width; ++j) {
                a[j] = 0.5 * ar[j + offset] + 0.5 * ar[offset + ((j + 1) % width)];
            }
            for (j=0; j<width; ++j) {
                ar[j + offset] = a[j];
            }
        }
    }
    function blurVertical(ar) {
        var a = new Float32Array(height);
        for (var i=0; i<width; ++i) {
            var offset = i;
            for (var j=0; j<height; ++j) {
                a[j] =
                    0.5 * ar[offset + j * width] +
                    0.5 * ar[offset + ((j + 1) % height) * width];
            }
            for (j=0; j<height; ++j) {
                ar[offset + j * width] = a[j];
            }
        }
    }
    for (i=0; i<3; ++i) {
        blurHorizontal(arX);
        blurHorizontal(arY);
        blurVertical(arX);
        blurVertical(arY);
    }
    
    var imageData = ctx.createImageData(width, height);
    for (i=0; i<imageData.data.length/4; ++i) {
        var vx = arX[i], vy = arY[i];
        var arc = Math.atan2(vy, vx) / (Math.PI * 2);
        arc = (arc + 1) % 1;
        var v = ~~(arc * 255);
        imageData.data[4*i] = v;
        imageData.data[4*i+1] = v;
        imageData.data[4*i+2] = v;
        imageData.data[4*i+3] = 255;
    }
    
    ctx.putImageData(imageData, 0, 0);
    return noiseCanvas;
}


function setupWebGL(canvas, gradients)
{
    debugger;
    var gl = Lux.init({
        canvas: canvas,
        highDPS: false,
        debugging: true,
        tracing: function(fname) {
            var args = _.toArray(arguments);
            args.unshift("Call to ");
            console.log.apply(console, args);
        },
        clearColor: [0.8, 0.8, 0.8, 1]
    });
    
    var mesh = Lux.Models.mesh(gradients[0].length-1, gradients.length-1);
    var noiseCanvas = createNoiseTexture(canvas.width, canvas.height);
    var texture = Lux.texture({
        canvas: noiseCanvas,
        mipmaps: false
    });
    
    var pulsingTexture = Shade.sin(
        Shade.texture2D(texture, mesh.texCoord).swizzle("x").mul(Math.PI * 2)
           .add(Lux.now().mul(5))
    ).add(1).div(2).mul(Shade.vec(1,1,1));

    var array = [];
    gradients.forEach(row => row.forEach(gradient => {
        array.push.apply(array, gradient[1]);
    }));

    var gradientAttribute = Lux.attributeBuffer({
        vertexArray: array,
        itemSize: 2
    });

    // Lux.Scene.add(Lux.actor({
    //     model: mesh,
    //     appearance: {
    //         mode: Lux.DrawingMode.over,
    //         position: mesh.vertex.add(Shade(gradientAttribute).swizzle("xy").mul(0.005)),
    //         color: Shade.vec(pulsingTexture, pulsingTexture, pulsingTexture, 1)
    //     }
    // }));

    // hold my beer, this is where we try ping-pong rendering.
    debugger;
    var rb1 = Lux.renderBuffer({
        width: canvas.width,
        height: canvas.height,
        clearColor: [1,0,0,1],
        clearDepth: 1.0
    });
    // var rb2 = Lux.renderBuffer({
    //     width: canvas.width,
    //     height: canvas.height,
    //     clearColor: [0,1,0,1],
    //     clearDepth: 1.0
    // });
    rbScene1 = rb1.scene;
    // rbScene2 = rb2.scene;

    // rbScene1.draw();
    // rbScene2.draw();
    
    rbScene1.add(Lux.actor({
        model: mesh,
        appearance: {
            mode: Lux.DrawingMode.overNoDepth,
            position: mesh.vertex.mul(0.75, 0.75, 1, 1),
            color: Shade.vec(0, 0, 1, 0.1),
            //Shade.texture2D(rb2, mesh.texCoord),
            // position: mesh.vertex.add(Shade(gradientAttribute)// .swizzle("xy").mul(0.005)
            //                          ),
            // color: Shade.vec(Shade.mix(pulsingTexture, Shade.texture2D(rb2, mesh.texCoord).swizzle("rgb"), 0.999), 0.01)
        }
    }));

    // rbScene2.add(Lux.actor({
    //     model: mesh,
    //     appearance: {
    //         mode: Lux.DrawingMode.over,
    //         position: mesh.vertex,
    //         color: Shade.texture2D(rb1, mesh.texCoord),
    //         // position: mesh.vertex.add(Shade(gradientAttribute)// .swizzle("xy").mul(0.005)
    //         //                          ),
    //         // color: Shade.vec(Shade.mix(pulsingTexture, Shade.texture2D(rb1, mesh.texCoord).swizzle("rgb"), 0.999), 0.01)
    //     }
    // }));

    var sq = Lux.Models.square();
    var squareActor1 = Lux.actor({
        model: sq,
        appearance: {
            position: sq.vertex.sub(1),
            color: Shade.texture2D(rb1, sq.texCoord)
        }
    });
    // var squareActor2 = Lux.actor({
    //     model: sq,
    //     appearance: {
    //         position: sq.vertex.mul(Shade.vec(1,2)).sub(Shade.vec(0,1)),
    //         color: Shade.texture2D(rb2, sq.texCoord)
    //     }
    // });
    Lux.Scene.add(squareActor1);
    // Lux.Scene.add(squareActor2);

    // rbScene1.draw();
    // rbScene2.draw();
    // Lux.Scene.invalidate();
    
    // lux.Scene.animate(function() {
    //     rbScene1.draw();
    //     rbScene2.draw();
    // });
}

function tickRb()
{
    debugger;
    rbScene1.invalidate();
}

function tick()
{
    debugger;
    Lux.Scene.invalidate();
}
