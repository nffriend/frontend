(function () {
  if (window.location.pathname === "" || window.location.pathname.indexOf("/") !== -1) {
    if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
      if (window.location.pathname === "/home") window.location.href = "/";
    } else {
      if (window.location.pathname === "/m") window.location.href = "/";
    }
  }
})();
