
import { useMemo } from 'react'
import { BaseChart } from './BaseChart'

type ChartProps = {
    data: number[];
    maxDataPoints: number;
}

const Chart = (props: ChartProps) => {

    const preparedData = useMemo(() => {
        const points = props.data.map((point) => ({ value: point * 100 }));
        if (points.length < props.maxDataPoints) {

        }
        return [
            ...points,
            ...Array.from({ length: props.maxDataPoints - points.length })
                .map(() => ({ value: undefined })),
        ];
    }, [props.data, props.maxDataPoints]);

    return (
        <BaseChart data={preparedData} />
    )
}

export default Chart