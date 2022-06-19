import React, {useEffect, useRef, useState, useCallback, useContext} from 'react';
import * as echarts from 'echarts';
import defaultMetrics from './data/default_metrics.json';
import styles from './Tree.module.scss';
import { DataContext } from "../../components/Analitics";

export const Tree: React.FC<{ width: number, height: number }> = ({ width, height}) => {
    const chartRef = useRef<any>();
    const [chart, setChart] = useState<any>(null);
    const [options, setOptions] = useState<any>(null);
    const { data, heightCoef } = useContext(DataContext);

    useEffect(() => {
        if (chartRef.current && chartRef.current.clientHeight > 0) {
            let newChart = null;

            if (!chart) {
                newChart = echarts.init(chartRef.current);
                setChart(newChart);
            } else {
                newChart = chart;
            }

            prepareDataItems(data);
            const options = chartOptions(data);

            newChart.setOption(options);
            setOptions(options);
        }
    }, [data, heightCoef]);

    useEffect(() => {
        chart && chart.resize({
            width: chartRef.current.clientWidth,
            height: chartRef.current.clientHeight,
            animation: {
                duration: 1000
                //easing?: string
            }
        });
    }, [heightCoef]);

    const prepareDataItems = (data: any) => {
        if (data.name.includes('TRUE')) {
            data.itemStyle = {
                color: "#4caf50"
            };
            data.label = {
                color: "#4caf50",
                fontWeight: "bold"
            };
        } else if (
            data.name.includes('ID:') ||
            data.name.includes('Rule:') ||
            data.name.includes('Priority:') ||
            data.name.includes('Status:') ||
            data.name.includes('SIte:') ||
            data.name.includes('Categories:') ||
            data.name.includes('By:')
        ) {
            data.itemStyle = {
                color: "#1a76d2"
            };
            data.label = {
                color: "#1a76d2",
                fontWeight: "bold"
            };
        }
        if (data.children) {
            data.children.forEach((child: any) => prepareDataItems(child));
        }

        if (data.collapsed === undefined) {
            data.collapsed = false;
        }

        return data;
    };

    const itemStyles = useCallback((name: string) => {
        if (name.includes('TRUE')) {
            return {
                color: '#4caf50',
                fontWeight: 'normal'
            }
        } else if (
            name.includes('ID:') ||
            name.includes('Rule:') ||
            name.includes('Priority:') ||
            name.includes('Status:') ||
            name.includes('SIte:') ||
            name.includes('Categories:') ||
            name.includes('By:')) {
            return {
                color: '#1a76d2',
                fontWeight: 'normal'
            }
        }

        return {
            color: '#666',
            fontWeight: 'normal'
        }
    }, []);

    const chartOptions = (data: any) => {
      return {
          toolbox: {
              show: true,
              orient: 'vertical',
              left: 'right',
              top: 'center',
              feature: {
                  mark: { show: true },
                  restore: { show: true },
                  saveAsImage: { show: true }
              }
          },
          tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove',
              className: styles?.tooltip,
              formatter: function (data: any) {
                  let tooltip = '';

                  data.treeAncestors.forEach((item: any, index: number) => {
                      if (index > 0) {
                          const iStyles = itemStyles(item.name);

                          if (index < data.treeAncestors.length - 1) {
                              tooltip += `<div class=${styles?.tooltipItem} style="color: ${iStyles.color}; font-weight: ${iStyles.fontWeight}">${item.name}</div>`;
                          } else {
                              tooltip += `<div class=${styles?.tooltipItemLast} style="color: ${iStyles.color}; font-weight: ${iStyles.fontWeight}">${item.name}</div>`;
                          }
                      }
                  });

                  return `<div>${tooltip}</div>`;
              }
          },
          series: [
              {
                  type: 'tree',
                  data: [data],
                  top: '1%',
                  left: '11%',
                  bottom: '1%',
                  right: '20%',
                  symbolSize: 7,
                  label: {
                      position: 'left',
                      verticalAlign: 'middle',
                      align: 'right',
                      fontSize: 9,
                      overflow: 'break',
                      width: 100
                  },
                  leaves: {
                      label: {
                          position: 'right',
                          verticalAlign: 'middle',
                          align: 'left',
                          overflow: 'break',
                          width: 100
                      }
                  },
                  emphasis: {
                      focus: 'descendant'
                  },
                  expandAndCollapse: true,
                  animationDuration: 550,
                  animationDurationUpdate: 750
              }
          ]
      }
    };

    return (
        <div
            className={styles?.container}
            style={{width: width * (heightCoef / 100) + 'px', height: height * (heightCoef / 100) + 'px' }}
            ref={chartRef}
        />
    )
};

export default Tree;
