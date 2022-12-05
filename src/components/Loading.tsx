import { useEffect, useState } from "react";

export type LoadingProp = {
    dots?: number;
}

export default function Loading(loadingProps: LoadingProp) {
    const max_dots = loadingProps.dots || 3;

    const [dotCount, setDotCount] = useState(1)

    useEffect(() => {
        setInterval(() => {
            setDotCount((dotCount + 1) % max_dots)
        }
        , 1000)
    }, [])

    return <div className="loading">
        Loading { ".".repeat(dotCount) }
    </div>

}