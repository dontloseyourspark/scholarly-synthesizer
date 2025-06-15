
import React, { useCallback } from "react";
import { Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/hooks/useNotifications";
import { useAuth } from "@/contexts/AuthContext";

const NotificationBell = () => {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const { notifications, unreadCount, markAsRead } = useNotifications(userId);

  if (!userId) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full text-scholarly-blue"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 min-w-[18px] h-[18px] flex items-center justify-center shadow-lg">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="font-semibold px-3 py-2">Notifications</div>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="text-sm text-center py-2 text-muted-foreground">
            No notifications yet.
          </div>
        ) : (
          notifications.map((notif) => (
            <DropdownMenuItem
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`flex items-start py-2 gap-2 ${notif.is_read ? 'opacity-60' : ''}`}
            >
              <span>
                {!notif.is_read ? (
                  <span className="mr-1 text-green-500"><Check size={14}/></span>
                ) : null}
              </span>
              <div className="flex flex-col flex-1">
                <span className="text-sm">{notif.message}</span>
                <span className="text-xs text-muted-foreground">{new Date(notif.created_at).toLocaleString()}</span>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
