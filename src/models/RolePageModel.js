import { db } from "../firebase/services";
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";

export const rolesMap = {
  "1": "Admin",
  "2": "Manager",
  "3": "Leader",
  "4": "User",
};

export const options = ["Trống", "Xem", "Sửa"];

export const fetchPermissions = async () => {
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

  // Mặc định "Trống"
  Object.values(copoData).forEach((screen) => {
    screen.components.forEach((comp) => {
      Object.values(rolesMap).forEach((role) => {
        comp.permissions[role] = "Trống";
      });
    });
  });

  // Gán quyền từ rope (chỉ cần component_description)
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

  return Object.values(copoData);
};

export const savePermissions = async (data) => {
  const batch = writeBatch(db);
  const ropeSnap = await getDocs(collection(db, "rope"));

  // Xóa cũ
  ropeSnap.forEach((docSnap) => {
    batch.delete(doc(db, "rope", docSnap.id));
  });

  // Lưu mới
  let docId = 1;

  data.forEach((screen) => {
    screen.components.forEach((comp) => {
      Object.entries(comp.permissions).forEach(([role, permission]) => {
        const roleId = Object.keys(rolesMap).find(
          (key) => rolesMap[key] === role
        );

        const ref = doc(db, "rope", docId.toString());
        batch.set(ref, {
          component_description: comp.name,
          page_id: screen.screenCode,
          role_id: roleId,
          permission: permission,
        });

        docId++;
      });
    });
  });

  await batch.commit();
};
