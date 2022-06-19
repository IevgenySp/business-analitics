import React, { createContext, useState, useMemo } from 'react';
import { Header } from "./Header";
import styles from './Analitics.module.scss';
import Main from "./Main";
import defaultMetrics from '../charts/tree/data/default_metrics.json';

export const DataContext = createContext({
    data: {},
    heightCoef: 100,
    setData: (data: any) => {},
    setHeightCoef: (height: number) => {}
});

export const Analitics: React.FC = () => {
    const [data, setData] = useState<any>(defaultMetrics);
    const [heightCoef, setHeightCoef] = useState<any>(100);
    const value = useMemo(
        () => ({ data, setData, heightCoef, setHeightCoef }),
        [data, heightCoef]
    );

    return (
        // @ts-ignore
        <DataContext.Provider value={value}>
            <div className={styles?.container}>
            <Header />
            <Main/>
            </div>
        </DataContext.Provider>
    )
};

export default Analitics;
