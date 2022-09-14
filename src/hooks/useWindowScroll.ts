import {  useEffect, useState } from 'react';

interface scrollInfo {
  scrollHeight: number,
  scrollTop: number,
  clientHeight: number,
  bottomHeight: number | null
}

function useWindowScroll(): scrollInfo {

  const [info, setInfo] = useState<scrollInfo>({
    scrollHeight: 0,
    scrollTop: 0,
    clientHeight: 0,
    bottomHeight: null
  });

  // 监听window的scroll事件，更新位置信息
  useEffect(() => {
    function onScroll() {
      
      setInfo({
        scrollHeight: document.documentElement.scrollHeight,
        scrollTop: document.documentElement.scrollTop,
        clientHeight: document.documentElement.clientHeight,
        bottomHeight: document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight
      });
    }

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    window.addEventListener('scroll', onScroll, false);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll, false);
    }
  }, []);

  return info;
}

export default useWindowScroll;