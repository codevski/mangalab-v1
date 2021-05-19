import styles from "../styles/Layout.module.css";
import useSWR from "swr";
import Layout from "../components/layout";
import { Tab, Tabs, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaPowerOff } from "react-icons/fa";
import { RiRestartLine } from "react-icons/ri";
import { fetcher } from "../utils/helper";

function System() {
  const { data, error } = useSWR("/api/health", fetcher);

  return (
    <Layout>
      <div className={styles.mainBox}>
        <div style={{}}>
          <span style={{ float: "right" }}>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="button-tooltip">Shutdown</Tooltip>}
            >
              <Button variant="light">
                <FaPowerOff color="red" />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="button-tooltip">Restart</Tooltip>}
            >
              <Button variant="light">
                <RiRestartLine />
              </Button>
            </OverlayTrigger>
          </span>
          <Tabs defaultActiveKey="status" id="tabs-system">
            <Tab eventKey="status" title="Status">
              <div style={{ paddingTop: 20 }}>
                <h3>Health</h3>
                <p>Datebase Status: {data ? data.status : error}</p>
              </div>
              <div>
                <h3>Disk Space</h3>
                <p>TBA</p>
              </div>
              <div>
                <h3>About</h3>
                <p>
                  Version: <span>{data ? data.version : error}</span>
                </p>
                <p>
                  Node Version: <span>{data ? data.node : error}</span>
                </p>
                <p>
                  AppData directory: <span>/config</span>
                </p>
              </div>
              <div>
                <h3>More Info</h3>
                <p>
                  Homepage: <span>mangalab.app</span>
                </p>
                <p>
                  Docs: <span>docs.mangalab.app</span>
                </p>
                <p>
                  Discord: <span>TBA</span>
                </p>
                <p>
                  Source: <span>github.com/codevski/mangalab</span>
                </p>
              </div>
            </Tab>
            <Tab eventKey="updates" title="Updates" disabled>
              <p>test2</p>
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
              <p>test3</p>
            </Tab>
            <Tab eventKey="tasks" title="Tasks" disabled>
              <p>test4</p>
            </Tab>
            <Tab eventKey="backups" title="Backups" disabled>
              <p>test5</p>
            </Tab>
            <Tab eventKey="logs" title="Logs" disabled>
              <p>test6</p>
            </Tab>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

export default System;
