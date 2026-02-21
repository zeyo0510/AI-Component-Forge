
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TreeMapNode } from '../types';

interface TreeMapProps {
  data: TreeMapNode;
  width?: number;
  height?: number;
  className?: string;
}

const TreeMap: React.FC<TreeMapProps> = ({
  data,
  width = 800,
  height = 500,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const root = d3.hierarchy(data)
      .sum((d) => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    const treemap = d3.treemap<TreeMapNode>()
      .size([width, height])
      .paddingInner(1)
      .round(true);

    treemap(root as d3.HierarchyNode<TreeMapNode>);

    const nodes = svg
      .selectAll('g')
      .data(root.leaves() as d3.HierarchyRectangularNode<TreeMapNode>[])
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

    nodes
      .append('rect')
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('fill', (d) => d.data.color || d3.interpolateSpectral(Math.random()))
      .attr('class', 'transition-opacity duration-200 hover:opacity-80 cursor-pointer')
      .append('title')
      .text((d) => `${d.data.name}\nValue: ${d.value}`);

    nodes
      .append('text')
      .attr('x', 5)
      .attr('y', 15)
      .text((d) => {
        const w = d.x1 - d.x0;
        const h = d.y1 - d.y0;
        if (w > 50 && h > 20) return d.data.name;
        return '';
      })
      .attr('font-size', '10px')
      .attr('fill', 'white')
      .attr('font-weight', 'bold')
      .attr('class', 'pointer-events-none');

  }, [data, width, height]);

  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="block"
      />
    </div>
  );
};

export default TreeMap;
