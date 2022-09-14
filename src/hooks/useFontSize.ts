import {useEffect, useState} from 'react'

// let timer: NodeJS.Timeout;
export default function useFontSize() {

    const [winSize, setWinsize] = useState({w:0, h: 0, fontSize: 14, scale: 1});
    useEffect(() => {
        
        const autoHtmlFontSize = function () {
            let basicWidth = 1440;
            let minWidth = 0;
            // if (document.documentElement.clientWidth <= 750) {
            //     basicWidth = 750;
            // }
           
            const clientW = document.documentElement.clientWidth;
            const w = Math.max(minWidth, clientW);
          //  const fontSize = Math.min((w / basicWidth) * 100, 100);
            const scale = Math.min(w / basicWidth, 1);
            const fontSize = 100;
            document.documentElement.style.fontSize = `${fontSize}px`;
            setWinsize({ w: w, h: document.documentElement.clientHeight, fontSize, scale });

             /**
              * 这么做是因为浏览器突然减小时，头部导航条来不及反应，会顶出滚动条
              * PC端有一定适应能力，最小宽度1240px, 移动端无限制
             */
            // clearTimeout(timer);
            // timer = setTimeout(() => {
            //     const scrollW = document.documentElement.scrollWidth;
            //     const w = Math.max(minWidth, scrollW);
            //     // const fontSize = Math.min((w / basicWidth) * 100, 100);
            //     const fontSize = 100;
            //     const scale = Math.min(w / basicWidth, 1);
            //     document.documentElement.style.fontSize = `${fontSize}px`;
                
            //     setWinsize({ w: w, h: document.documentElement.clientHeight, fontSize, scale });
            // }, 100);

            
        };
        
        autoHtmlFontSize();
  
        window.addEventListener('resize', autoHtmlFontSize);
        
        return () => {
            window.removeEventListener('resize', autoHtmlFontSize);
            document.documentElement.style.fontSize = '14px';
        }
    }, []);
    
    return winSize;
}