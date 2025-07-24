import React, { useState, useEffect } from "react";
import "../assets/css/RolePage.css";
import { db } from "../firebase/services";
import {
  collection,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";

// Mapping role_id to role name
const rolesMap = {
  "1": "Admin",
  "2": "Manager",
  "3": "Leader",
  "4": "User",
};

// Display order
const rolesList = ["User", "Leader", "Manager", "Admin"];
const options = ["None", "View", "Edit"];

// Permission mapping (fix để đảm bảo mapping ngược cũng đúng)
const permissionMap = {
  "Trống": "None",
  "Xem": "View",
  "Sửa": "Edit",
  "None": "None",
  "View": "View",
  "Edit": "Edit",
};

const reversePermissionMap = {
  "None": "Trống",
  "View": "Xem",
  "Edit": "Sửa",
};

const RolePage = () => {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const copoSnap = await getDocs(collection(db, "copo"));
      const ropeSnap = await getDocs(collection(db, "rope"));

      const copoData = {};

      copoSnap.forEach((docSnap) => {
        const item = docSnap.data();
        const screenCode = item.page_id;
        const screenTitle = item.page_description;
        const componentName = item.component_description;

        if (!copoData[screenCode]) {
          copoData[screenCode] = {
            screenCode,
            screenTitle,
            components: [],
          };
        }

        copoData[screenCode].components.push({
          name: componentName,
          permissions: {},
        });
      });

      // Assign permissions from rope
ropeSnap.forEach((docSnap) => {
  const { component_description, role_id, permission, page_id } = docSnap.data();
  const roleName = rolesMap[role_id];

  const screen = copoData[page_id];
  if (!screen) return;

  const comp = screen.components.find(
    (c) =>
      (c.name || "").trim() === (component_description || "").trim()
  );

  if (comp && roleName && permissionMap[permission]) {
    comp.permissions[roleName] = permissionMap[permission];
  }
});


      setData(Object.values(copoData));
    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Database connection failed! " + err.message);
    }
  };

  const handleChange = (screenIndex, compIndex, role, value) => {
    const updated = [...data];
    updated[screenIndex].components[compIndex].permissions[role] = value;
    setData(updated);
  };

  const handleSave = async () => {
    setIsEditing(false);

    try {
      const ropeSnap = await getDocs(collection(db, "rope"));
      const batch = writeBatch(db);

      // Delete old data in rope
      ropeSnap.forEach((docSnap) => {
        batch.delete(doc(db, "rope", docSnap.id));
      });

      // Save new data
      let docId = 1;

      data.forEach((screen) => {
        screen.components.forEach((comp) => {
          rolesList.forEach((role) => {
            const roleId = Object.keys(rolesMap).find(
              (key) => rolesMap[key] === role
            );

            const ref = doc(db, "rope", docId.toString());
            batch.set(ref, {
              component_description: comp.name,
              page_id: screen.screenCode,
              role_id: roleId,
              permission: reversePermissionMap[comp.permissions[role]],
            });

            docId++;
          });
        });
      });

      await batch.commit();
      alert("Permissions saved successfully!");
      fetchData();
    } catch (err) {
      console.error("Error saving:", err);
      alert("Failed to save permissions!");
    }
  };

  return (
    <div className="permission-container">
      <h2 className="bubble-text">System Role Management</h2>
      <table className="permission-table">
        <thead>
          <tr>
            <th>Page ID</th>
            <th>Page Name</th>
            <th>Component</th>
            {rolesList.map((role) => (
              <th key={role}>{role}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((screen, i) =>
            screen.components.map((comp, j) => (
              <tr key={`${i}-${j}`}>
                {j === 0 && (
                  <>
                    <td rowSpan={screen.components.length} className="align-left-top">
                      {screen.screenCode}
                    </td>
                    <td rowSpan={screen.components.length} className="align-left-top">
                      {screen.screenTitle}
                    </td>
                  </>
                )}
                <td>{comp.name}</td>
                {rolesList.map((role) => (
                  <td key={role}>
                    <select
                      value={comp.permissions[role]}
                      onChange={(e) =>
                        handleChange(i, j, role, e.target.value)
                      }
                      className={`select-${comp.permissions[role]}`}
                      disabled={!isEditing}
                    >
                      {options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="save-button-container">
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="save-button">
            Edit
          </button>
        ) : (
          <button onClick={handleSave} className="save-button">
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default RolePage;
