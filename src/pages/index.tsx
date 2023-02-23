import Head from 'next/head';
import UserDetailsForm from '@/components/UserDetailsForm/UserDetailsForm';

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { getServerSession } from 'next-auth';

import { useSession } from 'next-auth/react';
import { getUserByID } from 'mongoDB/handlers';
import { authOptions } from './api/auth/[...nextauth]';
import { UserOptions } from '@/lib/types/api.types';
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const user = await getUserByID(session?.user.id || '');

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
  const session = useSession();
  return (
    <>
      <Head>
        <title>Hey {session.data?.user.name} </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-full flex-col items-center justify-center">
        <UserDetailsForm user={user} />
      </div>
    </>
  );
}
