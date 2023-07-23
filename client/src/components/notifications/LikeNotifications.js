import React, { useState, useEffect } from 'react';
import { TiTickOutline } from 'react-icons/ti';
import { RxCrossCircled } from 'react-icons/rx';
import './notifications.css';
import axios from 'axios';

const LikeNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get("http://localhost:8000/likenotifications", {
                withCredentials: true,
            });
            setNotifications(response.data.data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const updateReadStatus = async (notificationId) => {
        try {
          const response = await axios.put(`http://localhost:8000/updatestatus/${notificationId}`, {
            withCredentials: true,
          });
          console.log(response)
          if (response.status === 200 && response.data.success) {
            alert(response.data.message);
            fetchNotifications();
          } else {
            console.error("Failed to update read status:", response.data.message);
          }
        } catch (error) {
          console.error("Error updating read status:", error);
        }
      };

      const deleteNotification = async(notificationId) => {
        try {
          const response = await axios.delete(`http://localhost:8000/notifications/${notificationId}`, {
            withCredentials: true,
          });
          console.log(response)
          if (response.status === 200 && response.data.success) {
            alert(response.data.message);
            fetchNotifications();
          } else {
            console.error("Failed to delete notification:", response.data.message);
          }
        } catch (error) {
          console.error("Error deleting notification:", error);
        }
      }

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className='notification-body'>
          {notifications && notifications.length > 0 ? ( 
            notifications.map((notification) => (
                <div className='notification' key={notification.notification_id}>
                    <div>
                        <p>{notification.description}</p>
                        <span>- 1 hour ago</span>
                    </div>
                    <div className='notification-icons'>

                        <TiTickOutline className='not-icon' size={20} onClick={() => updateReadStatus(notification.notification_id)} />
                        <RxCrossCircled className='not-icon' size={20} onClick={() => deleteNotification(notification.notification_id)} />
                    </div>
                </div>
            ))
          ) : (
            <p>Like notifications will appear here...</p>
          )}
        </div>
    );
};

export default LikeNotifications;




  