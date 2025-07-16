import React, { useState, useEffect } from "react";
import "../assets/css/RolePage.css";
import { db } from "../firebase/services";
import {
  collection,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";

// Mapping role_id sang tên role
const rolesMap = {
  "1": "Admin",
  "2": "Manager",
  "3": "Leader",
  "4": "User",
};

// Thứ tự hiển thị từ User -> Admin
const rolesList = ["User", "Leader", "Manager", "Admin"];

const options = ["Trống", "Xem", "Sửa"];

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
            screenCode: screenCode,
            screenTitle: screenTitle,
            components: [],
          };
        }

        copoData[screenCode].components.push({
          name: componentName,
          permissions: {},
        });
      });

      // Mặc định tất cả quyền là "Trống"
      Object.values(copoData).forEach((screen) => {
        screen.components.forEach((comp) => {
          rolesList.forEach((role) => {
            comp.permissions[role] = "Trống";
          });
        });
      });

      // Gán quyền từ rope
      ropeSnap.forEach((docSnap) => {
        const { component_description, role_id, permission } = docSnap.data();
        const roleName = rolesMap[role_id];

        Object.values(copoData).forEach((screen) => {
          const comp = screen.components.find(
            (c) => c.name.trim() === component_description.trim()
          );
          if (comp) {
            comp.permissions[roleName] = permission;
          }
        });
      });

      setData(Object.values(copoData));
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err);
      alert("Kết nối Database thất bại! " + err.message);
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

      // Xóa toàn bộ dữ liệu cũ trong rope
      ropeSnap.forEach((docSnap) => {
        batch.delete(doc(db, "rope", docSnap.id));
      });

      // Lưu mới
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
              permission: comp.permissions[role],
            });

            docId++;
          });
        });
      });

      await batch.commit();
      alert("Lưu phân quyền thành công!");
      fetchData();
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
      alert("Lỗi khi lưu phân quyền!");
    }
  };

  return (
    <div className="permission-container">
      <h2>Quản lý phân quyền hệ thống</h2>
      <table className="permission-table">
        <thead>
          <tr>
            <th>Mã màn hình</th>
            <th>Tên màn hình</th>
            <th>Thành phần</th>
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
                    <td rowSpan={screen.components.length}>
                      {screen.screenCode}
                    </td>
                    <td rowSpan={screen.components.length}>
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
            Sửa
          </button>
        ) : (
          <button onClick={handleSave} className="save-button">
            Lưu
          </button>
        )}
      </div>
    </div>
  );
};

export default RolePage;
