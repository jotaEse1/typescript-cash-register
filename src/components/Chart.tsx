import React, { useEffect, useRef } from 'react';
import {motion} from 'framer-motion'
import {appearVariant} from '../animations/variants'
import { d3Chart } from '../utils/chartGenerator';

interface Props {
    money: {
        _id: string,
        currency: string,
        unit: number,
        amount: number
    }[];
}

const Chart: React.FC<Props> = ({money}) => {
    const svgRef = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        if(!money.length) return;

        d3Chart(money, svgRef)
    }, [money])


    return (
        <motion.div 
            className='chart_container' 
            id='svg-container'
            variants={appearVariant}
            initial='hide'
            animate='visible'
        >
            <svg ref={svgRef} height='100%' width='100%'/>
        </motion.div>
    );
};

export default Chart;