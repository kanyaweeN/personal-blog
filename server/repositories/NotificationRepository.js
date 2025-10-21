import connectionPool from "../utils/db.mjs";

export const NotificationRepository = {
    async findByUserId(userId, limit = 50, offset = 0) {
        const query = `
             SELECT 
                noti.*,
                users.username as sender_username,
                users.name as sender_name,
                users.profile_pic as sender_avatar
            FROM 
                notifications noti
            LEFT 
                JOIN users ON users.id = (
                    CASE 
                        WHEN noti.reference_type = 'user' THEN noti.reference_id
                        WHEN noti.reference_type = 'post' THEN (SELECT author_id FROM posts WHERE id = noti.reference_id)
                        WHEN noti.reference_type = 'comment' THEN (SELECT user_id FROM comments WHERE id = noti.reference_id)
                    END
            )
            WHERE 
                noti.user_id = $1
            ORDER BY 
                noti.created_at DESC
            LIMIT $2 OFFSET $3
        `;

        const result = await connectionPool.query(query,
            [
                userId,
                limit,
                offset
            ]);

        return result.rows;
    },
    async countUnread(userId) {
        const query = `
            SELECT COUNT(*) as unread_count
            FROM notifications
            WHERE user_id = $1 AND is_read = FALSE
        `;

        const result = await connectionPool.query(query, [userId]);
        return parseInt(result.rows[0].unread_count);
    },
    async countByUserId(userId) {
        const query = `
            SELECT COUNT(*) as total
            FROM notifications
            WHERE user_id = $1
        `;

        const result = await pool.query(query, [userId]);
        return parseInt(result.rows[0].total);
    },
    async markAsRead(notificationId) {
        const query = `
            UPDATE 
                notifications
            SET 
                is_read = TRUE
            WHERE 
                id = $1
            RETURNING *
        `;

        const result = await connectionPool.query(query, [notificationId]);
        return result.rows[0] || null;
    },
    async markAllAsRead(userId) {
        const query = `
            UPDATE 
                notifications
            SET 
                is_read = TRUE
            WHERE 
                user_id = $1 AND is_read = FALSE
            RETURNING *
        `;

        const result = await connectionPool.query(query, [userId]);
        return result.rowCount;
    },
    async deleteById(notificationId) {
        const query = `
            DELETE FROM 
                notifications
            WHERE 
                id = $1 
            RETURNING *
        `;

        const result = await connectionPool.query(query,
            [notificationId]);
        return result.rowCount > 0;
    },
    async deleteByUserId(userId) {
        const query = `
            DELETE FROM 
                notifications
            WHERE 
                user_id = $1
            RETURNING *
        `;

        const result = await connectionPool.query(query, [userId]);
        return result.rowCount;
    },
    async create(data) {
        const query = `
            INSERT INTO notifications 
            (
                user_id, 
                type, 
                title, 
                message, 
                reference_id, 
                reference_type
            )
            VALUES 
                ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;

        const result = await connectionPool.query(query, [
            data.userId,
            data.type,
            data.title,
            data.message,
            data.referenceId,
            data.referenceType
        ]);

        return result.rows[0];
    },
    async createBulk(notifications) {
        const client = await connectionPool.connect();
        try {
            await client.query('BEGIN');

            const insertedNotifications = [];
            for (const notification of notifications) {
                const query = `
                    INSERT INTO notifications 
                    (
                        user_id, 
                        type, 
                        title, 
                        message, 
                        reference_id, 
                        reference_type
                    )
                    VALUES 
                        ($1, $2, $3, $4, $5, $6)
                    RETURNING *
                `;

                const result = await client.query(query, [
                    notification.userId,
                    notification.type,
                    notification.title,
                    notification.message,
                    notification.referenceId || null,
                    notification.referenceType || null
                ]);

                insertedNotifications.push(result.rows[0]);
            }

            await client.query('COMMIT');
            return insertedNotifications;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    },
    async findById(notificationId) {
        const query = `
            SELECT 
                * 
            FROM 
                notifications
            WHERE 
                id = $1
        `;

        const result = await connectionPool.query(query,
            [notificationId]);
        return result.rows[0] || null;
    }
}
