import { useRef, useEffect } from 'react';

/**
 * @description: Hooks useInterval 间限执行钩子
 * @param {callback} Function  回调函数
 * @param {delay}    number    延迟时间
 * @demo  =>  useInterval(() => {}, 1000) 
 */

export default function useInterval(callback: Function, delay: number) {
    const latestCallback = useRef<Function>(() => { });

    useEffect(() => {
        latestCallback.current = callback;
    });

    useEffect(() => {
        if (delay > 0) {
            const interval = setInterval(() => latestCallback.current(), delay || 0);
            return () => clearInterval(interval);
        }
        return undefined;
    }, [delay]);
}
