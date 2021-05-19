import styles from "../styles/Layout.module.css";
import useSWR from "swr";
import Layout from "../components/layout";
import { Formik, Field, Form } from "formik";
import { fetcher } from "../utils/helper";
import { useState, useCallback } from "react";
import { Button, Spinner } from "react-bootstrap";

export default function Add() {
  // const { data, error } = useSWR("/api/home", fetcher);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  const handleAdd = async (mangaid) => {
    setAddLoading(true);
    console.log("ADD");
    console.log(mangaid);
    await fetch(`http://localhost:3000/api/manga/${mangaid}`, {
      method: "POST",
    })
      .then((d) => d.json().then((d) => console.log(d)))
      .catch((err) => console.log(err));
    setAddLoading(false);
  };

  return (
    <Layout>
      <div className={styles.mainBox}>
        <div id="containter">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ flex: "100%", textAlign: "center" }}>
              <Formik
                initialValues={{
                  search: "",
                }}
                onSubmit={async (values) => {
                  setLoading(true);
                  await new Promise((r) => setTimeout(r, 500));
                  await fetch(
                    `http://localhost:3000/api/search?title=${values.search}`,
                    {
                      method: "POST",
                      body: JSON.stringify({ id: 1, ...values }),
                    }
                  )
                    .then((d) => d.json().then((d) => setResults(d.search)))
                    .catch((err) => console.log(err));

                  setLoading(false);
                }}
              >
                <Form>
                  <Field
                    id="search"
                    name="search"
                    placeholder="search a manga title"
                  />
                  <button type="submit">Submit</button>
                </Form>
              </Formik>
            </div>
            {loading && (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
            <div style={{ display: "flex" }}>
              {results &&
                results.map((manga, key) => (
                  <div key={key}>
                    <span>{manga.title}</span>
                    <Button
                      variant="primary"
                      disabled={addLoading}
                      onClick={() => handleAdd(manga.id)}
                    >
                      {addLoading && (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Loading...</span>
                        </>
                      )}
                      {!addLoading && "Add"}
                    </Button>
                    <Button onClick={() => handleAdd(manga.id)}>Add</Button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
