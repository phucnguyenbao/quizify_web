// src/views/permissions.js
export const permissionData = [
  {
    screenCode: "H01",
    screenTitle: "Màn hình chờ vào game",
    components: [
      {
        name: "Pop up chơi game",
        permissions: {
          User: "Sửa",
          Leader: "Sửa",
          Manager: "Trống",
          Admin: "Trống"
        }
      }
    ]
  },
  {
    screenCode: "LG01",
    screenTitle: "Màn hình đăng nhập",
    components: [
      {
        name: "Màn hình quên mật khẩu",
        permissions: {
          User: "Sửa",
          Leader: "Sửa",
          Manager: "Sửa",
          Admin: "Sửa"
        }
      }
    ]
  },
  {
    screenCode: "MG01",
    screenTitle: "Màn hình quản lý thành viên",
    components: [
      {
        name: "Pop up xem thông tin thành viên",
        permissions: {
          User: "Trống",
          Leader: "Sửa",
          Manager: "Sửa",
          Admin: "Xem"
        }
      },
      {
        name: "Pop up thêm thành viên thủ công/file",
        permissions: {
          User: "Sửa",
          Leader: "Trống",
          Manager: "Sửa",
          Admin: "Trống"
        }
      },
      {
        name: "Pop up thêm phòng ban/nhóm",
        permissions: {
          User: "Trống",
          Leader: "Sửa",
          Manager: "Trống",
          Admin: "Trống"
        }
      },
      {
        name: "Pop up xem chi tiết các lần làm bài trong trường hợp quản lý vào xem các lần làm bài của chủ game",
        permissions: {
          User: "Trống",
          Leader: "Sửa",
          Manager: "Trống",
          Admin: "Trống"
        }
      }
    ]
  },
  {
    screenCode: "MG02",
    screenTitle: "Màn hình quản lý game",
    components: [
      {
        name: "Pop up xem chi tiết các lần làm bài trong trường hợp làm game cá nhân",
        permissions: {
          User: "Xem",
          Leader: "Xem",
          Manager: "Xem",
          Admin: "Trống"
        }
      },
      {
        name: "Nút chọn xóa, sửa, thêm game, tạo quiz, Nút đóng mở game",
        permissions: {
          User: "Trống",
          Leader: "Sửa",
          Manager: "Sửa",
          Admin: "Trống"
        }
      },
      {
        name: "Pop up nhập file excel và pop up nhập prompt AI",
        permissions: {
          User: "Trống",
          Leader: "Trống",
          Manager: "Trống",
          Admin: "Trống"
        }
      }
    ]
  },
  {
    screenCode: "MG03",
    screenTitle: "Màn hình quản lý quiz",
    components: [
      {
        name: "Pop up tạo quiz bằng AI",
        permissions: {
          User: "Trống",
          Leader: "Trống",
          Manager: "Xem",
          Admin: "Trống"
        }
      },
      {
        name: "Pop up xem câu hỏi quiz",
        permissions: {
          User: "Trống",
          Leader: "Sửa",
          Manager: "Trống",
          Admin: "Trống"
        }
      },
      {
        name: "Pop up nhập file excel tạo quiz",
        permissions: {
          User: "Trống",
          Leader: "Sửa",
          Manager: "Trống",
          Admin: "Trống"
        }
      }
    ]
  },
  {
    screenCode: "MG04",
    screenTitle: "Mục quản lý cài đặt",
    components: [
      {
        name: "Nút thêm nhạc",
        permissions: {
          User: "Xem",
          Leader: "Trống",
          Manager: "Trống",
          Admin: "Trống"
        }
      },
      {
        name: "Mục quản lý báo cáo",
        permissions: {
          User: "Sửa",
          Leader: "Sửa",
          Manager: "Trống",
          Admin: "Trống"
        }
      },
      {
        name: "Mục nhập báo cáo và gửi",
        permissions: {
          User: "Trống",
          Leader: "Sửa",
          Manager: "Trống",
          Admin: "Trống"
        }
      }
    ]
  },
  {
    screenCode: "AM01",
    screenTitle: "Màn hình setup quyền hệ thống",
    components: [
      {
        name: "",
        permissions: {
          User: "Sửa",
          Leader: "Trống",
          Manager: "Trống",
          Admin: "Sửa"
        }
      }
    ]
  }
];
