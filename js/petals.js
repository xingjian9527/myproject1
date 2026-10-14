/* ==========================================================================
   个人网站 —— 樱花花瓣飘落效果
   使用 Canvas 绘制，requestAnimationFrame 驱动；
   尊重系统"减少动态效果"偏好；移动端自动降低花瓣数量保证性能。
   ========================================================================== */

(function () {
  'use strict';

  // 用户偏好"减少动态效果"时不启用
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var canvas = document.createElement('canvas');
  canvas.id = 'petal-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:50;';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var petals = [];
  var W = 0;
  var H = 0;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  // 移动端花瓣数量减半，保证流畅
  var isMobile = window.matchMedia('(max-width: 768px)').matches;
  var PETAL_COUNT = isMobile ? 18 : 36;

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function createPetal(initial) {
    return {
      x: rand(0, W),
      y: initial ? rand(-H, H) : rand(-60, -10),
      size: rand(5, 12),
      speedY: rand(0.5, 1.6),          // 下落速度
      swayAmp: rand(20, 60),           // 左右摆动幅度
      swayFreq: rand(0.004, 0.012),    // 摆动频率
      swayPhase: rand(0, Math.PI * 2),
      rot: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.02, 0.02),     // 自转速度
      opacity: rand(0.45, 0.9),
      // 花瓣颜色：粉白到浅粉的随机渐变
      color: 'rgba(255, ' + Math.round(rand(170, 205)) + ', ' + Math.round(rand(190, 220)) + ',',
    };
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function init() {
    resize();
    petals = [];
    for (var i = 0; i < PETAL_COUNT; i++) {
      petals.push(createPetal(true));
    }
    requestAnimationFrame(tick);
  }

  var frame = 0;

  function tick() {
    frame++;
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < petals.length; i++) {
      var p = petals[i];
      p.y += p.speedY;
      p.rot += p.rotSpeed;
      var swayX = Math.sin(frame * p.swayFreq + p.swayPhase) * p.swayAmp;

      // 飘出底部后重置到顶部
      if (p.y > H + 20) {
        petals[i] = createPetal(false);
        continue;
      }

      drawPetal(p.x + swayX, p.y, p);
    }
    requestAnimationFrame(tick);
  }

  // 椭圆形花瓣，带轻微旋转
  function drawPetal(x, y, p) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.opacity;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color + ' 1)';
    ctx.fill();
    // 花瓣尖端加深一点，增加立体感
    ctx.beginPath();
    ctx.ellipse(p.size * 0.3, 0, p.size * 0.5, p.size * 0.3, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 225, 235, 0.5)';
    ctx.fill();
    ctx.restore();
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  init();
})();
