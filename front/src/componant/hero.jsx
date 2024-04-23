// src/components/HeroSection.js

import AdminUsersTable from './AdminUsersTable';

const usersData = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
];

const HeroSection = () => {
  const deleteUser = (userId) => {
    // Implement delete functionality
    console.log('Delete user with ID:', userId);
  };

  return (
    <div className="bg-white py-12 w-full">
      <div className=" w-full  px-4 ">
        <AdminUsersTable users={usersData} deleteUser={deleteUser} />
      </div>
    </div>
  );
};

export default HeroSection;
