import styles from "../styles/Layout.module.css";
import Layout from "../components/layout";
import { ButtonGroup, Button, Alert } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import { fetcher } from "../utils/helper";
import useSWR from "swr";

export default function Home() {
  const { data, error } = useSWR("/api/home", fetcher);

  console.log(data);
  return (
    <Layout>
      <div className={styles.mainBox}>
        <div id="containter">
          <ButtonGroup aria-label="Basic example">
            <Link href="/add">
              <Button variant="secondary">Add Manga</Button>
            </Link>
            <Button variant="secondary" disabled>
              Volume Pass
            </Button>
            <Button variant="secondary" disabled>
              Manga Editor
            </Button>
            <Button variant="secondary" disabled>
              Update Library
            </Button>
          </ButtonGroup>
          <div style={{ paddingTop: 20 }}>
            {data && data.length < 1 && (
              <Alert variant="warning">
                You must be new around here. You should add some Manga to your
                library.
              </Alert>
            )}

            {data &&
              data.map((manga, key) => (
                <div style={{ display: "flex", padding: "10px 0" }}>
                  <img
                    src={`/assets/${manga.id}.jpg`}
                    height={200}
                    style={{ paddingRight: 20 }}
                  />
                  <div style={{ flex: 1 }}>
                    <Link key={key} href={`/manga/${manga.id}`}>
                      <a>
                        <h3>{manga.title}</h3>
                      </a>
                    </Link>
                    <p style={{ fontSize: "0.5em" }}>{manga.description}</p>
                  </div>
                </div>
              ))}
          </div>
          {data && data.length < 1 && (
            <div style={{ textAlign: "center" }}>
              <Link href="/add">
                <Button>
                  <FaPlus style={{ marginBottom: 5 }} /> Add Manga
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
