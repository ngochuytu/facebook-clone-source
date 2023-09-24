import { useEffect, useRef } from "react";

const SCROLL_OFFSET = 100
const DEBOUNCE_TIME = 1000;

function useScrollToBottom(callback) {
    const isInDebounceTime = useRef(false);

    useEffect(() => {
        const detectScrollToBottom = e => {
            const isBottom = window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - SCROLL_OFFSET
            if (isBottom && !isInDebounceTime.current) { 
                callback();
                isInDebounceTime.current = true;

                setTimeout(()=>{
                    isInDebounceTime.current = false;
                }, DEBOUNCE_TIME)
            }
        };

        window.addEventListener("scroll", detectScrollToBottom);

        return () => {
            window.removeEventListener("scroll", detectScrollToBottom);
        };
    }, [callback]);
}

export default useScrollToBottom;