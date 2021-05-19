import styles from "../styles/Layout.module.css";
import { Field, Formik, Form } from "formik";
import { PrismaClient } from "@prisma/client";
import { ToastContainer, toast } from "react-toastify";
import { Tab, Tabs } from "react-bootstrap";

import Layout from "../components/layout";

export default function Settings({ user }) {
  // TODO: Switch to bootstrap toasty
  const notify = () =>
    toast.dark("success!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  return (
    <Layout>
      <div className={styles.mainBox}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Tabs defaultActiveKey="indexes" id="tabs-system">
          <Tab eventKey="media-management" title="Media Management" disabled>
            <p>sources</p>
          </Tab>
          <Tab eventKey="indexes" title="Indexes">
            <h3 style={{ paddingTop: 20 }}>Mangadex</h3>
            <Formik
              initialValues={{
                username: user ? user.username : "",
                password: user ? user.password : "",
                remember_me: user ? user.remember_me : false,
              }}
              onSubmit={(values) => {
                fetch("http://localhost:3000/api/user", {
                  method: "POST",
                  body: JSON.stringify({ id: 1, ...values }),
                })
                  .then((d) => console.log(d))
                  .catch((err) => console.log(err));
              }}
            >
              <Form style={{ display: "inline-grid" }}>
                <label>
                  username: <Field name="username" type="text"></Field>
                </label>
                <label>
                  password: <Field name="password" type="password"></Field>
                </label>
                <label>
                  remember: <Field name="remember_me" type="checkbox"></Field>
                </label>
                <button type="submit">Submit</button>
              </Form>
            </Formik>
          </Tab>
          <Tab eventKey="connect" title="Connect" disabled>
            <p>test3</p>
          </Tab>
          <Tab eventKey="meta-data" title="Meta Data" disabled>
            <p>test4</p>
          </Tab>
          <Tab eventKey="general" title="General" disabled>
            <p>test5</p>
          </Tab>
          <Tab eventKey="ui" title="UI" disabled>
            <p>test6</p>
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findOne({
    where: {
      id: 1,
    },
  });
  return { props: { user } };
};
