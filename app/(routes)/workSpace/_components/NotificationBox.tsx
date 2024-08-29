"use client";

import { useInboxNotifications, useUpdateRoomNotificationSettings } from "@liveblocks/react/suspense";
import {
  InboxNotification,
  InboxNotificationList,
} from "@liveblocks/react-ui";


import React, { ReactNode, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface NotificationBoxProps {
  children: ReactNode;
}

function NotificationBox({ children }: NotificationBoxProps) {

  const { inboxNotifications } = useInboxNotifications();
  const updateNotificationSetting = useUpdateRoomNotificationSettings();

  useEffect(() => {
    updateNotificationSetting({ threads: 'all' })
  }, [])
  return (
    <div>
      <Popover>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent className={`w-[500px]`}>
          <InboxNotificationList>
            {inboxNotifications.map((inboxNotification) => (
              <InboxNotification
                key={inboxNotification.id}
                inboxNotification={inboxNotification}
              />
            ))}
          </InboxNotificationList>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default NotificationBox;
