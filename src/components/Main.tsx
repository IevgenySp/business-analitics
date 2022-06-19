import React, {useEffect, useState, useRef, useContext} from 'react';
import { Tree } from "../charts/tree/Tree";
import styles from './Main.module.scss';

export const Main: React.FC = () => {
    const [dimentions, setDimentions] = useState({ width: 0, height: 0 });
    const mainRef = useRef<any>();

    useEffect(() => {
        if (mainRef.current) {
            setDimentions({
                width: mainRef.current.clientWidth,
                height: mainRef.current.clientHeight
            });
        }
    }, []);

    return (
        <div className={styles?.container} ref={mainRef}>
            {dimentions.width > 0 && dimentions.height > 0 && <Tree width={dimentions.width} height={dimentions.height}/>}
        </div>
    )
};

export default Main;
