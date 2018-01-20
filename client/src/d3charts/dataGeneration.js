let dataGeneration = (function() {

  let parameters = {
    xDomain: [0, 50],
    yDomain: [0, 50],
    numVal: 50
  }

  function _setGlobalPara(num_Val, x_Domain, y_Domain) {
    numVal = num_Val;
    xDomain = x_Domain;
    yDomain = y_Domain;
  }

  function _setLocalPara(numVal, xSet, ySet) {
    let dataSet = [];
    for (let i = 0; i < numVal; i++) {
      dataSet.push({
        x: xSet[i],
        y: ySet[i]
      });
    }

    return {
      localParameters: {
        numVal: numVal,
        xDomain: [d3.min(xSet), d3.max(xSet)],
        yDomain: [d3.min(ySet), d3.max(ySet)],
      },
      dataSet: dataSet
    };
  }

  function _generateRandom(numVal = parameters.numVal, Domain = parameters.xDomain) {
    let randomSet = d3.range(numVal).map(() => Math.random() * (Domain[1] - Domain[0]) + Domain[0]);
    return randomSet;
  }

  function random(numVal = parameters.numVal, xDomain = parameters.xDomain, yDomain = parameters.yDomain) {
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = _generateRandom(numVal, yDomain);
    return _setLocalPara(numVal, xSet, ySet);
  }

  function linear(k = 1, b = 0, numVal = parameters.numVal, xDomain = parameters.xDomain) {
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = xSet.map(x => k * x + b);
    return _setLocalPara(numVal, xSet, ySet);
  }

  function log(base = 2, numVal = parameters.numVal, xDomain = parameters.xDomain) {
    if (xDomain[0] <= 0) {
      throw "x must be positive!";
    }
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = xSet.map(x => Math.log(x) / Math.log(base));
    return _setLocalPara(numVal, xSet, ySet);
  }

  function exponent(exp = 2, numVal = parameters.numVal, xDomain = parameters.xDomain) {
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = xSet.map(x => exp ** x);
    return _setLocalPara(numVal, xSet, ySet);
  }

  function multinomial(para, numVal = parameters.numVal, xDomain = parameters.xDomain) {
    // para = [ {coeff: xxx, pow: xxx}, ...]
    if (!para) {
      throw "Please specify coefficients and powers as [ {coeff: xxx, pow: xxx}, ...]";
    }
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = xSet.map(x => {
      let sum = 0;
      for (entry of para) {
        sum += entry.coeff * (x ** entry.pow);
      }
      return sum;
    });
    return _setLocalPara(numVal, xSet, ySet);
  }

  function sign(numVal = parameters.numVal, xDomain = parameters.xDomain) {
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = xSet.map(x => Math.sign(x));
    return _setLocalPara(numVal, xSet, ySet);
  }

  function logistic(numVal = parameters.numVal, xDomain = parameters.xDomain) {
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = xSet.map(x => 1 / (1 + Math.exp(-x)));
    return _setLocalPara(numVal, xSet, ySet);
  }

  function sin(numVal = parameters.numVal, xDomain = parameters.xDomain) {
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = xSet.map(x => Math.sin(x));
    return _setLocalPara(numVal, xSet, ySet);
  }

  function cos(numVal = parameters.numVal, xDomain = parameters.xDomain) {
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = xSet.map(x => Math.cos(x));
    return _setLocalPara(numVal, xSet, ySet);
  }

  function tan(numVal = parameters.numVal, xDomain = parameters.xDomain) {
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = xSet.map(x => Math.tan(x));
    return _setLocalPara(numVal, xSet, ySet);
  }

  function sinh(numVal = parameters.numVal, xDomain = parameters.xDomain) {
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = xSet.map(x => Math.sinh(x));
    return _setLocalPara(numVal, xSet, ySet);
  }

  function cosh(numVal = parameters.numVal, xDomain = parameters.xDomain) {
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = xSet.map(x => Math.cosh(x));
    return _setLocalPara(numVal, xSet, ySet);
  }

  function tanh(numVal = parameters.numVal, xDomain = parameters.xDomain) {
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = xSet.map(x => Math.tanh(x));
    return _setLocalPara(numVal, xSet, ySet);
  }

  function gaussian(para = {
    mu: 0,
    sigma: 2
  }, numVal = parameters.numVal) {
    let {
      mu,
      sigma
    } = para;
    let xDomain = [mu - 3 * sigma, mu + 3 * sigma];
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = xSet.map(x =>
      1 / Math.sqrt(2 * Math.PI) / sigma * Math.exp(-((x - mu) ** 2) / (2 * sigma ** 2))
    );
    return _setLocalPara(numVal, xSet, ySet);
  }

  function uniform(numVal = parameters.numVal, xDomain = parameters.xDomain) {
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = xSet.map(x => 1 / (xDomain[1] - xDomain[0]));
    return _setLocalPara(numVal, xSet, ySet);
  }

  function exponential(lambda = 2, numVal = parameters.numVal, xDomain = parameters.xDomain) {
    if (lambda <= 0) {
      throw "lambda should be positive!"
    }
    let xSet = _generateRandom(numVal, xDomain);
    let ySet = xSet.map(x =>
      x >= 0 ? (lambda * Math.exp(-lambda * x)) : 0
    );
    return _setLocalPara(numVal, xSet, ySet);
  }

  function circle(para = {
    x0: 0,
    y0: 0,
    r: 2
  }, numVal = parameters.numVal) {
    let {
      x0,
      y0,
      r
    } = para;
    let xSet = [],
      ySet = [];
    let step = 2 * Math.PI / numVal;
    for (let i = 0; i < numVal; i++) {
      xSet.push(x0 + r * Math.cos(step * i));
      ySet.push(y0 + r * Math.sin(step * i));
    }
    return _setLocalPara(numVal, xSet, ySet);
  }

  function ellipse(para = {
    x0: 0,
    y0: 0,
    a: 4,
    b: 2
  }, numVal = parameters.numVal) {
    let {
      x0,
      y0,
      a,
      b
    } = para;
    let xSet = [],
      ySet = [];
    let step = 2 * Math.PI / numVal;
    for (let i = 0; i < numVal; i++) {
      xSet.push(x0 + a * Math.cos(step * i));
      ySet.push(y0 + b * Math.sin(step * i));
    }
    return _setLocalPara(numVal, xSet, ySet);
  }

  function parabola(para = {
    x0: 0,
    y0: 0,
    p: 2
  }, numVal = parameters.numVal) {
    let {
      x0,
      y0,
      p
    } = para;
    let xSet = [],
      ySet = [];
    let step = 2 * Math.PI / numVal;
    for (let i = 0; i < numVal; i++) {
      xSet.push(x0 + 2 * p * ((step * i) ** 2));
      ySet.push(y0 + 2 * p * (step * i));
    }
    return _setLocalPara(numVal, xSet, ySet);
  }

  function hyperbola(para = {
    x0: 0,
    y0: 0,
    a: 2,
    b: 4
  }, numVal = parameters.numVal) {
    let {
      x0,
      y0,
      a,
      b
    } = para;
    let xSet = [],
      ySet = [];
    let step = 2 * Math.PI / numVal;
    for (let i = 0; i < numVal; i++) {
      xSet.push(x0 + a / Math.cos(step * i));
      ySet.push(y0 + b * Math.tan(step * i));
    }
    return _setLocalPara(numVal, xSet, ySet);
  }

  function heartShape(para = {
    x0: 0,
    y0: 0,
    a: 5
  }, numVal = parameters.numVal) {
    let {
      x0,
      y0,
      a
    } = para;
    let xSet = [],
      ySet = [];
    let step = 2 * Math.PI / numVal;
    for (let i = 0; i < numVal; i++) {
      let theta = i * step;
      let r = a * (1 + Math.cos(theta));
      xSet.push(x0 + r * Math.cos(theta));
      ySet.push(y0 + r * Math.sin(theta));
    }
    return _setLocalPara(numVal, xSet, ySet);
  }

  function starShape(para = {
    x0: 0,
    y0: 0,
    a: 5
  }, numVal = parameters.numVal) {
    let {
      x0,
      y0,
      a
    } = para;
    let xSet = [],
      ySet = [];
    let step = 2 * Math.PI / numVal;
    for (let i = 0; i < numVal; i++) {
      let theta = i * step;
      xSet.push(x0 + a * Math.cos(theta) ** 3);
      ySet.push(y0 + a * Math.sin(theta) ** 3);
    }
    return _setLocalPara(numVal, xSet, ySet);
  }

  function ArchimedesSpiral(para = {
    x0: 0,
    y0: 0,
    a: 5,
    numCircle: 5
  }, numVal = parameters.numVal) {
    let {
      x0,
      y0,
      a,
      numCircle
    } = para;
    let xSet = [],
      ySet = [];
    let step = numCircle * 2 * Math.PI / numVal;
    for (let i = 0; i < numVal; i++) {
      let theta = i * step;
      xSet.push(x0 + a * theta * Math.cos(theta));
      ySet.push(y0 + a * theta * Math.sin(theta));
    }
    return _setLocalPara(numVal, xSet, ySet);
  }

  function lattice(para = {
    row: 5,
    col: 5
  }, xDomain, yDomain) {
    let {
      row,
      col
    } = para;
    let xSet = [],
      ySet = [];
    let xStep = (xDomain[1] - xDomain[0]) / col;
    let yStep = (yDomain[1] - yDomain[0]) / row;
    for (let j = 0; j < col; j++) {
      for (let i = 0; i < row; i++) {
        xSet.push(xDomain[0] + i * xStep);
        ySet.push(yDomain[0] + j * yStep);
      }
    }
    console.log(xSet, ySet);
    return _setLocalPara(xSet.length, xSet, ySet);
  }

  function gaussian2D(para = {
    row: 30,
    col: 30,
    mu1: 0,
    mu2: 0,
    sigma1: 1,
    sigma2: 1,
    rho: 0
  }) {
    var maxProbability;
    let {
      row,
      col,
      mu1,
      mu2,
      sigma1,
      sigma2,
      rho
    } = para;
    if (!(rho > -1 && rho < 1)) {
      throw "rho must be in range (-1, 1)!";
    }
    let xSet = [],
      ySet = [];
    let xDomain = [mu1 - 3 * sigma1, mu1 + 3 * sigma1];
    let yDomain = [mu2 - 3 * sigma2, mu2 + 3 * sigma2];
    let xStep = (xDomain[1] - xDomain[0]) / row;
    let yStep = (yDomain[1] - yDomain[0]) / col;
    for (let j = 0; j < col; j++) {
      for (let i = 0; i < row; i++) {
        let [x, y] = [xDomain[0] + i * xStep, yDomain[0] + j * yStep];
        let probability = 1 / (2 * Math.PI * sigma1 * sigma2 * Math.sqrt(1 - rho ** 2)) * Math.exp(-(((x - mu1) ** 2 / (sigma1 ** 2)) - (2 * rho * (x - mu1) * (y - mu2) / sigma1 / sigma2) + ((y - mu2) ** 2 / (sigma2 ** 2))) / (2 * (1 - rho ** 2)));
        maxProbability = 1 / (2 * Math.PI * sigma1 * sigma2 * Math.sqrt(1 - rho ** 2));
        if (_isTrue(probability, maxProbability)) {
          xSet.push(x);
          ySet.push(y);
        }
      }
    }
    return _setLocalPara(xSet.length, xSet, ySet);

    function _isTrue(probability, maxProbability) {
      if (Math.random() * maxProbability <= probability) {
        return true;
      }
      return false;
    }
  }

  return {
    random: random,
    linear: linear,
    log: log,
    exponent: exponent,
    multinomial: multinomial,
    sign: sign,
    logistic: logistic,
    sin: sin,
    cos: cos,
    tan: tan,
    sinh: sinh,
    cosh: cosh,
    tanh: tanh,
    gaussian: gaussian,
    uniform: uniform,
    exponential: exponential,
    circle: circle,
    ellipse: ellipse,
    parabola: parabola,
    hyperbola: hyperbola,
    heartShape: heartShape,
    starShape: starShape,
    ArchimedesSpiral: ArchimedesSpiral,
    lattice: lattice,
    gaussian2D: gaussian2D
  };
})();