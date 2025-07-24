const fs = require("fs");

// Đọc dữ liệu gốc từ file copo.json
const copoData = require("./copo.json");

const roleIds = ["1", "2", "3", "4"];
const ropeSeed = [];

copoData.forEach((item) => {
  roleIds.forEach((role_id) => {
    ropeSeed.push({
      component_description: item.component_description,
      page_id: item.page_id, 
      role_id: role_id,
      permission: "Trống"
    });
  });
});

// Ghi ra file mới
fs.writeFileSync("./rope.json", JSON.stringify(ropeSeed, null, 2), "utf8");

console.log("✅ Tạo rope.json thành công kèm page_id.");
