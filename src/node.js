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
