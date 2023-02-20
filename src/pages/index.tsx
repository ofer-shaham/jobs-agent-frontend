import Head from 'next/head';

import styles from '@/styles/Home.module.css';
import UserForm from '@/components/UserForm/UserForm';
import { useState } from 'react';
import { API_ENDPOINTS } from '@/lib/endpoints';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getUserByID } from '@/lib/mongoDB/users';
import { getServerSession } from 'next-auth';
import { UserOptions } from '@/lib/user';
import { authOptions } from './api/auth/[...nextauth]';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const user = await getUserByID(session?.user?.id);

  const defaultUser = {
    userID: session?.user?.id,
    overallEx: 0,
    requirements: {},
    excludedRequirements: {},
    userQuery: {
      distance: '',
      experience: '',
      jobType: '',
      location: '',
      position: '',
      scope: ''
    }
  };
  const result: UserOptions = user || defaultUser;
  return {
    props: result
  };
};

export default function Home(user: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loading, setLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState(true);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <UserForm user={user} />
        <button
          className="mr-2"
          onClick={async (e) => {
            e.preventDefault();
            setLoading(true);

            try {
              const res = await fetch(
                `http://localhost:5000/${API_ENDPOINTS.SCANNER_START}/${user.userID}?activeQuery=${activeQuery}`
              );
              const data = await res.json();
              console.log(data);
              setLoading(false);
            } catch (error) {
              setLoading(false);
              console.log(error);
            }
          }}
        >
          Load
        </button>
        <button
          onClick={async (e) => {
            e.preventDefault();
            setLoading(true);
            // Const res = await fetch('http://localhost:5000/api/hello');
            // // /api/jobs-agent/start/
            try {
              const res = await fetch(
                `http://localhost:5000/${API_ENDPOINTS.SCANNER_DOWNLOAD}/${user.userID}?activeQuery=false`
              );
              setLoading(false);
              res.blob().then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'jobs';
                a.click();
              });
            } catch (error) {
              setLoading(false);
              console.log(error);
            }
          }}
        >
          Download
        </button>
        <button className="bg-blue-300" onClick={() => setActiveQuery((pre) => !pre)}>
          {activeQuery ? 'בטל' : 'הפעל'} חיפוש לפי חיפוש אחרון
        </button>
        {loading && <p>loading</p>}
      </main>
    </>
  );
}
