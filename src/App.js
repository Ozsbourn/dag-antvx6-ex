import React from "react";
import Graph, {
  Grid,
  Background,
  Clipboard,
  Selection,
  Keyboard,
  MouseWheel,
  Edge,
  ReactNode,
  Portal
} from "antv-x6-react";
import { dagdata, statusList } from "./data";
import "./x6";
import "./styles.css";
import { AlgoNode } from "./node";

const portConfig = {
  groups: {
    top: {
      position: "top",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#C2C8D5",
          strokeWidth: 1,
          fill: "#fff"
        }
      }
    },
    bottom: {
      position: "bottom",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#C2C8D5",
          strokeWidth: 1,
          fill: "#fff"
        }
      }
    }
  }
};

const PortalProvider = Portal.getProvider();

export default function App() {
  const [nodes, setNodes] = React.useState(
    dagdata.filter((i) => i.shape === "dag-node")
  );
  const [edges] = React.useState(
    dagdata.filter((i) => i.shape === "dag-edge")
  );



  return (
    <div className="App">
      <PortalProvider />
      <Graph
        panning={{
          enabled: true,
          eventTypes: ["leftMouseDown", "mouseWheel"]
        }}
        highlighting={{
          magnetAdsorbed: {
            name: "stroke",
            args: {
              attrs: {
                fill: "#fff",
                stroke: "#31d0c6",
                strokeWidth: 4
              }
            }
          }
        }}
        connecting={{
          snap: true,
          allowBlank: false,
          allowLoop: false,
          highlight: true,
          connector: "algo-connector",
          connectionPoint: "anchor",
          anchor: "center",
          validateMagnet({ magnet }) {
            return magnet.getAttribute("port-group") !== "top";
          },
          createEdge({ sourceCell }) {
            return sourceCell.model.graph.createEdge({
              shape: "dag-edge",
              attrs: {
                line: {
                  strokeDasharray: "5 5"
                }
              },
              zIndex: -1
            });
          }
        }}
      >
        <Grid />
        <Background />
        <MouseWheel
          modifiers="ctrl"
          factor={1.1}
          maxScale={1.5}
          minScale={1.5}
        />
        <Clipboard />
        <Selection
          multiple
          rubberEdge
          rubberNode
          modifiers="shift"
          rubberband
        />
        <Keyboard />
        {nodes.map((node) => {
          if (node !== null) {
            return (
              <ReactNode
                autoResize
                {...node}
                ports={{ ...portConfig, items: node.ports }}
                key={node.id}
                data={{ ...node.data }}
                component={AlgoNode}
              />
            );
          }
        })}
        {edges.map((edge) => {
          if (edge !== null) {
            return <Edge {...edge} key={edge.id} />;  
          }
        })}
      </Graph>
    </div>
  );
}
