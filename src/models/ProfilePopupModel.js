import axios from 'axios';

export const getUserInfo = async (member_id) => {
  const res = await axios.get(`/api/user/${member_id}`);
  return res.data;
};

export const updateUserInfo = async (member_id, data) => {
  const res = await axios.put(`/api/user/${member_id}`, data);
  return res.data;
};

export const uploadAvatar = async (member_id, file) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const res = await axios.post(`/api/user/${member_id}/avatar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data.avatarId;
};
