import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminUsersTable = ({ users, deleteUser }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleEdit = (Users) => {
    setEditingUser(users);
    setEditedName(users.name);
    setEditedEmail(users.email);
  };

  const handleSaveEdit = () => {
    // Handle saving edit here, e.g., update user in backend
    setEditingUser(null);
  };

  const handleDelete = (userId) => {
    // Handle deleting user here, e.g., send delete request to backend
    deleteUser(userId);
  };

  const toggleSelectUser = (userId) => {
    const isSelected = selectedUsers.includes(userId);
    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const isSelected = (userId) => selectedUsers.includes(userId);

  return (
    <div className="mt-8 text-gray-800 w-full whitespace-nowrap text-sm ">
      <h2 className="text-2xl font-bold mb-4 text-orange-brand">
        Les utilisateurs
      </h2>

      <table className="w-full border-collapse border border-gray-100">
        <thead className="text-capitalize">
          <tr className="bg-gray-50">
            <th className="border  border-gray-100 px-5 min-w-5  py-2"></th>
            <th className="border border-gray-100 px-5 min-w-5  py-2">
              Nom
            </th>
            <th className="border border-gray-100 px-5 min-w-5  py-2">
              Prénom
            </th>
            <th className="border border-gray-100 px-5 min-w-5  py-2">
              Nom d'Utlisateur
            </th>
            <th className="border  text-capitalize w-max-content border-gray-100 px-8 ">
              mot de passe
            </th>
            <th className="border border-gray-100 px-5 min-w-5  py-2">
              Email
            </th>
            <th className="border border-gray-100 px-5 min-w-5  py-2">
              Departement
            </th>
            <th className="border border-gray-100 px-5 min-w-5  py-2">
              Accée
            </th>
            <th className="border border-gray-100 px-5 min-w-5  py-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-100 px-2 py-2">
                <input
                  type="checkbox"
                  checked={isSelected(user.id)}
                  onChange={() => toggleSelectUser(user.id)}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
              </td>
              <td className="border border-gray-100 px-4 py-2">
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full border border-gray-100 px-2 py-1 rounded"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="border border-gray-100 px-4 py-2">
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full border border-gray-100 px-2 py-1 rounded"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="border border-gray-100 px-4 py-2">
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full border border-gray-100 px-2 py-1 rounded"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="border border-gray-100 px-4 py-2">
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full border border-gray-100 px-2 py-1 rounded"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="border border-gray-100 px-4 py-2">
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="w-full border border-gray-100 px-2 py-1 rounded"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border border-gray-100 px-4 py-2">
                {editingUser && editingUser.id === user.id ? (
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <FaEdit
                    className="cursor-pointer text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEdit(user)}
                  />
                )}
                <FaTrash
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersTable;
