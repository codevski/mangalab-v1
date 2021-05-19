import styles from "../../styles/Layout.module.css";
import useSWR from "swr";
import Layout from "../../components/layout";
import { fetcher } from "../../utils/helper";
import { useRouter } from "next/router";
import { Button, Spinner } from "react-bootstrap";

export default function Title() {
  const router = useRouter();
  const { title } = router.query;
  if (!title)
    return (
      <Layout>
        <p>Loading..</p>
      </Layout>
    );
  const { data, error } = useSWR(`/api/manga/${title}`, fetcher);

  const handleDelete = async (mangaId) => {
    console.log("REMOVE");
    console.log(mangaId);
    await fetch(`http://localhost:3000/api/manga/${mangaId}`, {
      method: "DELETE",
    })
      .then((d) => d.json().then((d) => router.push("/")))
      .catch((err) => console.log(err));
  };

  //background-color: rgba(0, 0, 0, 0.3); on heading
  if (!data) return "loading";

  console.log(data);
  return (
    <Layout>
      {/* Title header move into component */}
      <div className={styles.mainBox}>
        <div style={{ display: "flex" }}>
          <img
            src={`/assets/${data.manga.id}.jpg`}
            height={200}
            style={{ paddingRight: 20 }}
          />
          <div>
            <h3>{data.manga.title}</h3>
            <p style={{ fontSize: "0.5em" }}>{data.manga.description}</p>
            <Button onClick={() => handleDelete(data.manga.id)}>Remove</Button>
          </div>
        </div>
      </div>
      <br />
      <div className={styles.mainBox}>
        <div id="containter">
          {/* <div style={{ display: "flex", flexWrap: "wrap" }}> */}
          {/* <div style={{ flex: "100%", textAlign: "center" }}></div> */}
          {/* {!data && <p>loading...</p>} */}
          {/* {error && <p>opppss something went wrong...</p>} */}

          {/* <img src={d.image} style={{ paddingRight: "1em" }} /> */}
          {data &&
            data.chapters.map((m) => (
              <div style={{ display: "flex" }}>
                <span>Volume: {m.volume}</span>
                <p>Chapter: {m.chapter}</p>
              </div>
            ))}
          {/* </div> */}
        </div>
      </div>
    </Layout>
  );
}
