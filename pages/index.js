import Head from "next/head";
import styles from "../styles/Home.module.css";
import fetch from "isomorphic-unfetch";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Random Hack Clubber</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href={"https://scrapbook.hackclub.com/api/css?url="+ props.user.css}/>
      </Head>
      <main className={styles.main}>
        <img src={props.user.avatar} className={styles.avatar} />
        <h1 className={styles.title + ' header-title-name'}>
          Meet <span className={styles.accent}>@{props.user.username}</span>
        </h1>
        <div className={styles.grid}>
          <a
            href={"https://hackclub.slack.com/team/" + props.user.slack}
            className={styles.card + ' post'}
          >
            <h3>Message them Slack &rarr;</h3>
            <p>They're on the Hack Club Slack, just like you (I hope)!</p>
          </a>
          <a
            href={"https://scrapbook.hackclub.com/" + props.user.username}
            className={styles.card + ' post'}
          >
            <h3>Visit their Scrapbook &rarr;</h3>
            <p>Where Hack Clubbers share what they get up to!</p>
          </a>
          {props.user.github && (
            <a
              href={props.user.github}
              className={styles.card + ' post'}
            >
              <h3>Visit their GitHub &rarr;</h3>
              <p>I'm sure it's full of coding projects and a lot of green.</p>
            </a>
          )}
          {props.user.website && (
            <a
              href={props.user.website}
              className={styles.card + ' post'}
            >
              <h3>Visit their website &rarr;</h3>
              <p>Their little corner of the internet, who knows what you'll find here!</p>
            </a>
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        Meet a random Hack Clubber, built by @sampoder!
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  let users = await fetch(
    "https://scrapbook.hackclub.com/api/users/"
  ).then((r) => r.json());
  users = users.filter(u => u.updatesCount > 5)
  let user = users[Math.floor(Math.random() * users.length)];
  return {
    props: { user },
  };
}