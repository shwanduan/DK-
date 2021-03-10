(function(win) {
  var tid
  function refreshRem() {
    const designSize = 1920 // 设计图尺寸
    const html = document.documentElement
    const wW = html.clientWidth// 窗口宽度
    const rem = wW * 100 / designSize
    document.documentElement.style.fontSize = rem + 'px'
  }

  win.addEventListener('resize', function() {
    refreshRem()
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 100)
  }, false)
  win.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 100)
    }
  }, false)
  refreshRem()
})(window)
