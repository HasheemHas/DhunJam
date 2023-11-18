import React from "react";
import ReactEcharts from "echarts-for-react"

function ReactEchart(props) {
    const options = {
        title: {
            text: '₹',
            left: 10,
            top: 20,
            textStyle: {
                color: "#F0C3F1"
            }
        },
        grid: { top: 20, right: 40, bottom: 20, left: 40 },
        xAxis: {
            type: "category",
            data: ["Custom", "Category 1", "Category 2", "Category 3", "Category 4"],
            axisTick: {
                show: false
            },
            axisLabel: {
                color: "#F0C3F1"
            }
        },
        yAxis: {
            type: "value",
            axisLine: {
                show: true,
                itemStyle: {
                    color: "#F0C3F1"
                }
            },
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                data: props.data || [],
                type: "bar",
                smooth: false,
                barWidth: "20%",
                itemStyle: {
                    color: "#F0C3F1"
                }
            }
        ],
        tooltip: {
            trigger: "axis"
        }
    }
    return (
        <ReactEcharts 
        style={{
            width: "600px"
        }}
        option={options}></ReactEcharts>
    )
}
export default ReactEchart;