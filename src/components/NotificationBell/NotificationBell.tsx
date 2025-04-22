import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";

type NotificationType = "insert" | "update" | "delete";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  created_at: string;
}

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel("public:articles")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "articles" },
        (payload) => {
          const newArticle = payload.new as {
            id: string;
            title: string;
            created_at: string;
          };

          setNotifications((prev) => [
            {
              id: newArticle.id,
              type: payload.eventType.toLowerCase() as "insert" | "update",
              title: newArticle.title,
              created_at: newArticle.created_at,
            },
            ...prev,
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="notification-bell">
      <button className="bell-btn" onClick={() => setOpen(!open)}>
        🔔 {notifications.length}
      </button>
      {open && (
        <div className="notifications-dropdown">
          {notifications.map((n) => (
            <div key={n.id}>
              {n.type === "insert"
                ? "🆕 Новая статья: "
                : "✏️ Изменена статья: "}
              {n.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
