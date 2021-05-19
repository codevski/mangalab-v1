import styles from "../styles/Home.module.css";
import useSWR from "swr";
import Layout from "../components/layout";
import { fetcher } from "../utils/helper";

export default function Add() {
  const { data, error } = useSWR("/api/home", fetcher);

  return (
    <Layout>
      <div id="containter">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: "100%", textAlign: "center" }}>
            <h1>Latest Updates</h1>
          </div>
          {!data && <p>loading...</p>}
          {error && <p>opppss something went wrong...</p>}
          {data &&
            data.latest.map((d, key) => (
              <div
                key={key}
                style={{
                  flex: "1 0 21%",
                  flexDirection: "row",
                  display: "flex",
                  padding: "1em 0",
                }}
              >
                <img src={d.image} style={{ paddingRight: "1em" }} />
                <div>
                  <p>{d.title}</p>
                  <p>{d.chapter}</p>
                  <p>{d.time} ago</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}
