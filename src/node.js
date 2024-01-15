import React from "react";



export const image = {
  logo:
    "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ",
  success:
    "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ",
  failed:
    "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ",
  running:
    "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ"
};



export const AlgoNode = (props) => {
  const { graph, node, data = {} } = props;
  const { label, status } = data;

  graph.on('cell:mouseenter', ({ cell }) => {
    cell.addTools(
      [
        {
          name: 'button-remove',
          args: { x: 10, y: 10 }
        },
      ],
    )
  })

  graph.on('cell:mouseleave', ({ cell }) => {
    if (cell.hasTool('button-remove')) {
      cell.removeTool('button-remove');
    }
  })

  graph.on('cell:dblclick', ({ cell, e }) => {
    const name = cell.isEdge() ? 'edge-editor' : 'node-editor';

    cell.removeTool(name);
    cell.addTools({
      name: name,
      args: {
        event: e,
      },
    })
  })

  return (
    <div className={`node ${status}`}>
      <img alt="" src={image.logo} />
      <span className="label">{label}</span>
      <span className="status">
        {status === "success" && <img alt="" src={image.success} />}
        {status === "failed" && <img alt="" src={image.failed} />}
        {status === "running" && <img alt="" src={image.running} />}
      </span>
    </div>
  );
};
