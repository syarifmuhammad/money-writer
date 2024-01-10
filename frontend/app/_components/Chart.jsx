'use client'

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { IDR } from '@/app/_lib/currency'

export default function Chart({options, series}) {
    options.tooltip= {
        y: {
            formatter: function (value) {
                return IDR(value)
            }
        }
    }

    return (
        <ApexChart type="donut" options={options} series={series} height={200} width={500} />
    )
}