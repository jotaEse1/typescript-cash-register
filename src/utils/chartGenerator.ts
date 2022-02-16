import * as d3 from 'd3';
import { Money } from '../interfaces/interfaces';

const d3Chart = (money: Money[], svgRef: React.MutableRefObject<SVGSVGElement | null>) => {
    const svg = d3.select(svgRef.current)

    d3.selectAll('.axis').transition().duration(500).remove()
    d3.selectAll('.grid').transition().duration(500).remove()

    const box = document.querySelector('#svg-container') as HTMLDivElement,
            width = box.offsetWidth,
            height = box.offsetHeight,
            range = (width - 40) / 12;

    //scales
    const oneHundred = range,
        fifty = oneHundred + range,
        twenty = fifty + range,
        ten = twenty + range,
        five = ten + range,
        two = five + range,
        one = two + range,
        half = one + range,
        quarter = half + range,
        dime = quarter + range,
        nickel = dime + range,
        penny = nickel + range;

    const xScale = d3.scaleThreshold()
                     .domain([0.01, 0.05, 0.10, 0.25, 0.50, 1, 2, 5, 10, 20, 50, 100])
                     .range([0, oneHundred, fifty, twenty, ten, five, two, one, half, quarter, dime, nickel, penny, width - 40])

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(money, m => m.amount)! + 20])
                     .range([height - 20, 20])
    //axes
    svg.append('g')
        .attr('transform', `translate(27,${height - 20})`)
        .attr('class', 'axis')
        .call(d3.axisBottom(xScale))
        
    svg.append('g')
        .attr('transform', `translate(27, 0)`)
        .attr('class', 'axis')
        .call(d3.axisLeft(yScale))

    //grid line
    svg.append('g')
        .attr('transform', `translate(27, 0)`)
        .attr('class', 'grid')
        .call(d3.axisLeft(yScale)
            .tickSize(-width)
            .tickFormat(() => ''))
            
    //chart
    svg.selectAll('rect')
        .data(money)
        .join(
            (enter: any) => enter.append('rect')
                        .attr('x', (d: Money) => xScale(d.unit) + 25)
                        .attr('y', height - 20)
                        .attr('width', 5)
                        .attr('height', 0)
                        .attr('class', 'rect')
                        .attr('id', (d: Money) => `${d.unit}`)
                        .transition()
                        .attr('x', (d: Money) => xScale(d.unit) + 25)
                        .attr('y', (d: Money) => yScale(d.amount))
                        .attr('width', 5)
                        .attr('height', (d: Money) => height - 20 - yScale(d.amount)),

            update => update.transition()
                        .attr('x', d => xScale(d.unit) + 25)
                        .attr('y', d => yScale(d.amount))
                        .attr('width', 5)
                        .attr('height', d => height - 20 - yScale(d.amount))
        )   

}

export {d3Chart}