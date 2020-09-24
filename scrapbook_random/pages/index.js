import Head from "next/head";
import styles from "../styles/Home.module.css";
import fetch from "isomorphic-unfetch";

export default function Home(props) {
  console.log(props);
  return (
    <div className={styles.container}>
      <Head>
        <title>Random Hack Clubber</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img src={props.user.avatar} className={styles.avatar} />
        <h1 className={styles.title}>
          Meet <span className={styles.accent}>@{props.user.username}</span>
        </h1>

        <div className={styles.grid}>
          <a
            href={"https://hackclub.slack.com/team/" + props.user.slack}
            className={styles.card}
          >
            <h3>Message them Slack &rarr;</h3>
            <p>They're on the Hack Club Slack, just like you (I hope)!</p>
          </a>

          <a
            href={"https://scrapbook.hackclub.com/" + props.user.username}
            className={styles.card}
          >
            <h3>Visit their Scrapbook &rarr;</h3>
            <p>Where Hack Clubbers share what they get up to!</p>
          </a>
          {props.user.github && (
            <a
              href={props.user.github}
              className={styles.card}
            >
              <h3>Visit their GitHub &rarr;</h3>
              <p>I'm sure it's full of coding projects and a lot of green.</p>
            </a>
          )}
          {props.user.website && (
            <a
              href={props.user.website}
              className={styles.card}
            >
              <h3>Visit their website &rarr;</h3>
              <p>Their little corner of the internet, who knows what you'll find here!</p>
            </a>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        Meet a random Hack Clubber, built by @yourname!
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  function filterSlugs(object) {
    return object.fields["Slug"] == params.camp;
  }
  const users = await fetch(
    "https://scrapbook.hackclub.com/api/users/"
  ).then((r) => r.json());
  let user = users[10];
  console.log(user);
  return {
    props: { user }, // will be passed to the page component as props
  };
}
