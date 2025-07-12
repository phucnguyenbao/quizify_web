import React, { useState } from "react";
import "../assets/css/RolePage.css";
import { permissionData } from "./permissions";

const roles = ["User", "Leader", "Manager", "Admin"];
const options = ["Trống", "Xem", "Sửa"];

const RolePage = () => {
  const [data, setData] = useState(permissionData);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (screenIndex, compIndex, role, value) => {
    const updated = [...data];
    updated[screenIndex].components[compIndex].permissions[role] = value;
    setData(updated);
  };

  const handleSave = () => {
    setIsEditing(false); // khóa lại dropdown sau khi lưu
    console.log("Dữ liệu phân quyền đã lưu:", data);
    alert("Lưu phân quyền thành công!");
  };

  const handleEdit = () => {
    setIsEditing(true); // bật chế độ chỉnh sửa
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
            {roles.map((role) => (
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
                    <td rowSpan={screen.components.length}>{screen.screenCode}</td>
                    <td rowSpan={screen.components.length}>{screen.screenTitle}</td>
                  </>
                )}
                <td>{comp.name}</td>
                {roles.map((role) => (
                  <td key={role}>
                    <select
                      value={comp.permissions[role]}
                      onChange={(e) => handleChange(i, j, role, e.target.value)}
                      className={`select-${comp.permissions[role]}`}
                      disabled={!isEditing} // chỉ bật khi đang sửa
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
          <button onClick={handleEdit} className="save-button">
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
