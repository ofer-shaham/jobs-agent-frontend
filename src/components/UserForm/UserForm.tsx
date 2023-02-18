import React from 'react';
import Profile from './Profile/Profile';
import UserQuery from './UserQuery/UserQuery';

import useUserForm from './useUserForm/useUserForm';
const formStyle = {
  form: 'w-[20rem]'
};

function UserForm() {
  const userForm = useUserForm();
  return (
    <form onSubmit={userForm.handleUserFormSubmit} className={formStyle.form}>
      <Profile {...userForm} />
      <UserQuery {...userForm} />
      <button type="submit">אשר</button>
    </form>
  );
}

export default UserForm;
