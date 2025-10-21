import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const notificationsService = {
    // ดึงการแจ้งเตือนทั้งหมด
    getAll: async (params = {}) => {
        try {
            const { userId, limit = 50, offset = 0 } = params;
            const result = await axios.get(`${url}/notifications/${userId}`,
                { limit, offset }
            );

            return result.data.data;
        } catch (e) {
            console.error("notificationsService.getAll : ", e);
            return [];
        }
    },

    // นับจำนวนการแจ้งเตือนที่ยังไม่ได้อ่าน
    getUnreadCount: async (id) => {
        try {
            const result = await axios.get(`${url}/notifications/${id}/unread-count`);

            return result.data.unreadCount;
        } catch (e) {
            console.error("notificationsService.getUnreadCount : ", e);
            return 0;
        }
    },

    // ทำเครื่องหมายว่าอ่านแล้ว (notification เดียว)
    markAsRead: async (id) => {
        try {
            const result = await axios.put(`${url}/notifications/${id}/read`);

            return result.data.data;
        } catch (e) {
            console.error("notificationsService.markAsRead : ", e);
            return null;
        }
    },

    // ทำเครื่องหมายว่าอ่านแล้วทั้งหมด
    markAllAsRead: async (id) => {
        try {
            const result = await axios.put(`${url}/notifications/${id}/mark-all-read`);

            return result.data;
        } catch (e) {
            console.error("notificationsService.markAllAsRead : ", e);
            return null;
        }
    },

    // ลบการแจ้งเตือน
    deleteById: async (id) => {
        try {
            const result = await axios.delete(`${url}/notifications/${id}`);

            return result.data;
        } catch (e) {
            console.error("notificationsService.deleteById : ", e);
            return null;
        }
    },

    // ลบการแจ้งเตือนทั้งหมด
    deleteAll: async (id) => {
        try {
            const result = await axios.delete(`${url}/notifications/${id}/all`);

            return result.data;
        } catch (e) {
            console.error("notificationsService.deleteAll : ", e);
            return null;
        }
    },

    // สร้างการแจ้งเตือนใหม่ (สำหรับ admin หรือ system)
    create: async (newData) => {
        try {
            const result = await axios.post(`${url}/notifications`, newData);

            return result.data.data;
        } catch (e) {
            console.error("notificationsService.create : ", e);
            return null;
        }
    },
};