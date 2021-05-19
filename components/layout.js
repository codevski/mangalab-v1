import Head from "next/head";
import styles from "../styles/Layout.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "../components/link";
import { useRouter } from "next/router";

function Layout({ children }) {
  const router = useRouter();
  console.log(router);
  return (
    <>
      <Head>
        <title>MangaLab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx>{`
        li {
          float: left;
          padding: 1em;
        }
        .selected {
          color: white;
          text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
        }
      `}</style>
      <div style={{ background: "#2f3640", minHeight: "90vh" }}>
        <main className={styles.main}>
          <div style={{ display: "flex" }}>
            <Link href="/">
              <a>
                <img src="/logo.png" alt="logo" className={styles.logoHeader} />
              </a>
            </Link>
            {/* THIS WILL BE NAV */}
            <ul
              style={{
                listStyleType: "none",
                color: "#dfe6e9",
                alignSelf: "center",
              }}
            >
              <li className={styles.activeLink}>Series</li>
              <li>Calendar</li>
              <li>Activity</li>
              <li>Wanted</li>
              <li>
                <Link href="/settings">
                  <a>Settings</a>
                </Link>
              </li>
              <li>
                <Link href="/system">
                  <a>System</a>
                </Link>
              </li>
              <li>
                <a href="https://www.buymeacoffee.com/SLykUwx">Donate</a>
              </li>
            </ul>
          </div>
          <div style={{ background: "#353b48" }}>
            <span style={{ padding: "0.5em 0.5em" }}>
              <FontAwesomeIcon
                icon={faSearch}
                color="#dfe6e9"
                size="sm"
                style={{ width: "1em" }}
              />
            </span>
            <span>
              <input
                placeholder="Search for manga in your library"
                style={{
                  width: "25em",
                  background: "#353b48",
                  border: "red",
                  color: "#dfe6e9",
                  padding: "0.5em 0.2em",
                }}
              />
            </span>
          </div>
        </main>
        <div className={styles.flexCenter}>
          {/* <div style={{ width: "80%", background: "white", padding: "2em" }}> */}
          {children}
          {/* </div> */}
        </div>
      </div>

      <footer className={styles.footer} style={{ background: "#2f3640" }}>
        <p>MangaLab Ver. alpha-1023</p>
      </footer>
    </>
  );
}

export default Layout;
