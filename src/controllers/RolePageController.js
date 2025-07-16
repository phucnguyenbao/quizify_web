import { fetchPermissions, savePermissions } from "../models/RolePageModel";

export const loadPermissions = async (setData) => {
  try {
    const data = await fetchPermissions();
    setData(data);
  } catch (err) {
    console.error("Lỗi load quyền:", err);
    alert("Lỗi load quyền!");
  }
};

export const saveAllPermissions = async (data, setIsEditing, reload) => {
  try {
    await savePermissions(data);
    alert("Lưu phân quyền thành công!");
    setIsEditing(false);
    reload();
  } catch (err) {
    console.error("Lỗi khi lưu:", err);
    alert("Lỗi khi lưu phân quyền!");
  }
};
