import { useEffect, useState } from "react";

const useStatistics = (dataPointContent: number) => {

    const [value, setValue] = useState<Statistics[]>([])

    useEffect(() => {

        const unsub = window.electron.subscribeStatistics((stats) => {
            setValue(prev => {
                const newData = [...prev, stats];
                if (newData.length > dataPointContent) {
                    newData.shift();
                }
                return newData;
            })
        });

        return unsub;
    }, [])

    return value;
}

export default useStatistics